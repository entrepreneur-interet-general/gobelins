<?php

namespace App\Http\OaiPmh;

use DateTime;
// use OpenSkos2\OaiPmh\Concept as OaiConcept;
use Picturae\OaiPmh\Exception\IdDoesNotExistException;
use Picturae\OaiPmh\Implementation\MetadataFormatType as ImplementationMetadataFormatType;
use Picturae\OaiPmh\Implementation\Record as OaiRecord;
use Picturae\OaiPmh\Implementation\RecordList as OaiRecordList;
use Picturae\OaiPmh\Implementation\Record\Header as OaiRecordHeader;
use Picturae\OaiPmh\Implementation\Repository\Identity as ImplementationIdentity;
use Picturae\OaiPmh\Implementation\Set;
use Picturae\OaiPmh\Implementation\SetList;
use Picturae\OaiPmh\Interfaces\MetadataFormatType;
use Picturae\OaiPmh\Interfaces\Record;
use Picturae\OaiPmh\Interfaces\RecordList;
use Picturae\OaiPmh\Interfaces\Repository as OaiRepository;
use Picturae\OaiPmh\Interfaces\Repository\Identity;
use Picturae\OaiPmh\Interfaces\SetList as InterfaceSetList;
use \App\Models\Product as ProductModel;

class Repository implements OaiRepository
{

    /**
     * Pagination: number of records per page.
     *
     * @var integer
     */
    private $limit = 25;

    /**
     * @return string the base URL of the repository
     */
    public function getBaseUrl()
    {
        // return 'http://my-data-provider/oai-pmh';
        return route('api.oai-pmh');
    }

    /**
     * @return string The humain readable name of the repository
     */
    public function getRepositoryName()
    {
        return 'Mobilier National MN/Lab';
    }

    /**
     * @return string
     * the finest harvesting granularity supported by the repository. The legitimate values are
     * YYYY-MM-DD and YYYY-MM-DDThh:mm:ssZ with meanings as defined in ISO8601.
     */
    public function getGranularity()
    {
        return 'YYYY-MM-DD';
    }

    /**
     * @return Identity
     */
    public function identify()
    {
        return new ImplementationIdentity(
            $this->getRepositoryName(),
            $this->getEarliestDateStamp(),
            $this->getDeletedRecord(),
            $this->getAdminEmails(),
            $this->getGranularity()
        );
    }

    public function getDeletedRecord()
    {
        return 'no';
    }

    public function getAdminEmails()
    {
        return config('app.oai_admin_emails_array');
    }

    /**
     * @return InterfaceSetList
     */
    public function listSets()
    {
        $items = [];
        // $items[] = new Set('my:spec', 'Title of spec');
        return new SetList($items);
    }

    /**
     * @param string $token
     * @return InterfaceSetList
     */
    public function listSetsByToken($token)
    {
        $params = $this->decodeResumptionToken($token);
        return $this->listSets();
    }

    /**
     * @param string $metadataFormat
     * @param string $identifier
     * @return Record
     */
    public function getRecord($metadataFormat, $identifier)
    {
        $product = ProductModel::published()->byInventory($identifier)->first();

        // Throw exception if it does not exists
        if (!$product) {
            throw new IdDoesNotExistException('No matching identifier ' . $identifier);
        }

        return $this->buildRecord($metadataFormat, $product);
    }

    /**
     * @param string $metadataFormat
     * @param \App\Models\Product $product
     * @return OaiRecord|OaiRecordHeader
     */
    private function buildRecord($metadataFormat, $product)
    {
        $header = new OaiRecordHeader(
            $product->inventory_id,
            new \DateTime($product->legacy_updated_on)
        );

        if ($metadataFormat) {
            switch ($metadataFormat) {
                case 'edm':
                    # TODO :)
                    break;

                case 'oai_dc':
                default:
                    $formatter = new FormatterOaiDc($product);
                    $metadata = $formatter->getXmlDocument();
                    break;
            }
            return new OaiRecord($header, $metadata);
        } else {
            return $header;
        }
    }

    /**
     * @param string $metadataFormat metadata format of the records to be fetched or null if only headers are fetched
     * (listIdentifiers)
     * @param DateTime $from
     * @param DateTime $until
     * @param string $set name of the set containing this record
     * @return RecordList
     */
    public function listRecords($metadataFormat = null, DateTime $from = null, DateTime $until = null, $set = null)
    {
        return $this->buildRecordsList(
            $metadataFormat,
            $from,
            $until
        );
    }

    /**
     * @param string $metadataFormat metadata format of the records to be fetched or null if only headers are fetched
     * (listIdentifiers)
     * @param DateTime $from
     * @param DateTime $until
     * @param string $set name of the set containing this record
     * @return RecordList
     */
    private function buildRecordsList($metadataFormat = null, DateTime $from = null, DateTime $until = null, $page = 0, $set = null)
    {
        $paginatedProducts = $this->fetchProducts(
            $metadataFormat,
            $from,
            $until,
            $page
        );

        $token = null;
        if ($paginatedProducts->hasMorePages()) {
            $nextPage = $paginatedProducts->currentPage() + 1;
            $token = $this->encodeResumptionToken(
                $nextPage,
                $from,
                $until,
                $metadataFormat,
                $set
            );
        }

        $records = $paginatedProducts->map(function ($product) use ($metadataFormat) {
            return $this->buildRecord($metadataFormat, $product);
        });

        return new OaiRecordList($records, $token, $paginatedProducts->total());
    }

    /**
     * @param string $metadataFormat
     * @param DateTime $from
     * @param DateTime $until
     * @param integer $page
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function fetchProducts($metadataFormat, DateTime $from = null, DateTime $until = null, $page = 0)
    {
        $query = ProductModel::where('is_published', true)
            ->orderBy('legacy_updated_on', 'ASC')
            ->orderBy('inventory_id', 'ASC');
        if ($from) {
            $query->where('legacy_updated_on', '>=', $from);
        }
        if ($until) {
            $query->where('legacy_updated_on', '<=', $until);
        }
        if (!$metadataFormat) {
            $query->select('id', 'inventory_id', 'legacy_updated_on');
        }
        return $query->paginate($this->limit, ['*'], 'page', $page);
    }

    /**
     * @param string $token
     * @return RecordList
     */
    public function listRecordsByToken($token)
    {
        $params = $this->decodeResumptionToken($token);

        return $this->buildRecordsList(
            $params['metadataPrefix'],
            $params['from'],
            $params['until'],
            $params['page']
        );
    }

    /**
     * @param string $identifier
     * @return MetadataFormatType[]
     */
    public function listMetadataFormats($identifier = null)
    {
        $formats = [];
        $formats[] = new ImplementationMetadataFormatType(
            'oai_dc',
            'http://www.openarchives.org/OAI/2.0/oai_dc.xsd',
            'http://www.openarchives.org/OAI/2.0/oai_dc/'
        );

        // $formats[] = new ImplementationMetadataFormatType(
        //     'oai_rdf',
        //     'http://www.openarchives.org/OAI/2.0/rdf.xsd',
        //     'http://www.w3.org/2004/02/skos/core#'
        // );

        return $formats;
    }

    /**
     * Decode resumption token
     * possible properties are:
     *
     * ->offset
     * ->metadataPrefix
     * ->set
     * ->from (timestamp)
     * ->until (timestamp)
     *
     * @param string $token
     * @return array
     */
    private function decodeResumptionToken($token)
    {
        $params = (array) json_decode(base64_decode($token));

        if (!empty($params['from'])) {
            $params['from'] = new \DateTime('@' . $params['from']);
        }

        if (!empty($params['until'])) {
            $params['until'] = new \DateTime('@' . $params['until']);
        }

        return $params;
    }

    /**
     * Get resumption token
     *
     * @param int $page
     * @param DateTime $from
     * @param DateTime $util
     * @param string $metadataPrefix
     * @param string $set
     * @return string
     */
    private function encodeResumptionToken(
        int $page = 0,
        DateTime $from = null,
        DateTime $util = null,
        $metadataPrefix = null,
        $set = null
    ) {
        $params = [];
        $params['page'] = $page;
        $params['metadataPrefix'] = $metadataPrefix;
        $params['set'] = $set;
        $params['from'] = null;
        $params['until'] = null;

        if ($from) {
            $params['from'] = $from->getTimestamp();
        }

        if ($util) {
            $params['until'] = $util->getTimestamp();
        }

        return base64_encode(json_encode($params));
    }

    /**
     * Get earliest modified timestamp
     *
     * @return DateTime
     */
    private function getEarliestDateStamp()
    {
        // Fetch earliest timestamp
        // return new DateTime();
        return new DateTime('2019-01-01');
    }
}
