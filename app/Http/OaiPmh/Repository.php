<?php

namespace App\Http\OaiPmh;

use DateTime;
use OpenSkos2\OaiPmh\Concept as OaiConcept;
use Picturae\OaiPmh\Exception\IdDoesNotExistException;
use Picturae\OaiPmh\Implementation\MetadataFormatType as ImplementationMetadataFormatType;
use Picturae\OaiPmh\Implementation\Record as OaiRecord;
use Picturae\OaiPmh\Implementation\Record\Header as OaiRecordHeader;
use Picturae\OaiPmh\Implementation\RecordList as OaiRecordList;
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
        
        $header = new OaiRecordHeader($identifier, new \DateTime($product->legacy_updated_on));

        // Fetch record metadata
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
    }


    /**
     * @param string $metadataFormat metadata format of the records to be fetch or null if only headers are fetched
     * (listIdentifiers)
     * @param DateTime $from
     * @param DateTime $until
     * @param string $set name of the set containing this record
     * @return RecordList
     */
    public function listRecords($metadataFormat = null, DateTime $from = null, DateTime $until = null, $set = null)
    {
        $items = [];
        $items[] = new OaiConcept($concept);

        // Show token only if more records exists then are shown
        $token = $this->encodeResumptionToken($this->limit, $from, $until, $metadataFormat, $set);

        return new OaiRecordList($items, $token);
    }


    /**
     * @param string $token
     * @return RecordList
     */
    public function listRecordsByToken($token)
    {
        $params = $this->decodeResumptionToken($token);

        $records = $this->GetRecords($params);

        // Only show if there are more records available else $token = null;
        $token = $this->encodeResumptionToken(
            $params['offset'] + 100,
            $params['from'],
            $params['until'],
            $params['metadataPrefix'],
            $params['set']
        );

        return new OaiRecordList($items, $token);
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
     * @param int $offset
     * @param DateTime $from
     * @param DateTime $util
     * @param string $metadataPrefix
     * @param string $set
     * @return string
     */
    private function encodeResumptionToken(
        $offset = 0,
        DateTime $from = null,
        DateTime $util = null,
        $metadataPrefix = null,
        $set = null
    ) {
        $params = [];
        $params['offset'] = $offset;
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
