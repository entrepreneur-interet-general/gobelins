<?php

namespace App\Http\OaiPmh;

use \App\Models\Product;

class FormatterOaiDc
{

    /**
     * @var Product
     */
    private $product;

    /**
     * @var \DomDocument
     */
    private $document;

    /**
     * @var \DomElement
     */
    private $root;

    private $fields = [
        'Root',
        'Language',
        'Title',
        'Identifier',
        'Description',
        'Type',
        'Publisher',
        'Format',
        'Creator',
        'Date',
        'Url',
        'Related',
        'Rights',
    ];

    /**
     * @param Product $product
     */
    public function __construct($product)
    {
        $this->product = $product;
        $this->document = new \DomDocument();
    }

    private function createRootElement()
    {
        $this->root = $this->document->createElementNS(
            'http://www.openarchives.org/OAI/2.0/oai_dc/',
            'oai_dc:dc'
        );
        $this->document->appendChild($this->root);

        $this->root->setAttributeNS(
            'http://www.w3.org/2000/xmlns/',
            'xmlns:dc',
            'http://purl.org/dc/elements/1.1/'
        );

        $this->root->setAttributeNS(
            'http://www.w3.org/2000/xmlns/',
            'xmlns:xsi',
            'http://www.w3.org/2001/XMLSchema-instance'
        );

        // $this->root->setAttributeNS(
        //     'http://www.w3.org/2000/xmlns/',
        //     'xmlns:rdf',
        //     'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
        // );

        $this->root->setAttributeNS(
            'http://www.w3.org/2001/XMLSchema-instance',
            'schemaLocation',
            'http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd'
        );
    }

    private function createLanguageElement()
    {
        $language = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:language',
            'fr'
        );
        $this->root->appendChild($language);
    }

    private function createTitleElement()
    {
        $title = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:title'
        );
        $title->appendChild($this->document->createTextNode($this->product->seoTitle));
        $this->root->appendChild($title);
    }

    private function createIdentifierElement()
    {
        $identifier = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:identifier'
        );
        $identifier->appendChild($this->document->createTextNode($this->product->inventory_id));
        $this->root->appendChild($identifier);
    }

    private function createDescriptionElement()
    {
        $description = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:description'
        );
        $textNode = $this->document->createTextNode($this->product->description);
        $description->appendChild($textNode);
        $this->root->appendChild($description);
    }

    private function createTypeElement()
    {
        if ($this->product->productType) {
            $type = $this->document->createElementNS(
                'http://purl.org/dc/elements/1.1/',
                'dc:type'
            );
            $type->appendChild($this->document->createTextNode($this->product->productType->mapping_key));
            $this->root->appendChild($type);
        }
    }

    private function createPublisherElement()
    {
        $publisher = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:publisher'
        );
        $publisher->appendChild($this->document->createTextNode('Mobilier National'));
        $this->root->appendChild($publisher);
    }

    private function createFormatElement()
    {
        $long = $this->product->length_or_diameter ? 'Longueur : ' . number_format($this->product->length_or_diameter, 2) . " m\n" : '';

        $lar = $this->product->height_or_thickness ? 'Largeur : ' . number_format($this->product->height_or_thickness, 2) . " m\n" : '';

        $haut = $this->product->depth_or_width ? 'Hauteur : ' . number_format($this->product->depth_or_width, 2) . " m\n" : '';

        $format = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:format',
            $long . $lar . $haut
        );
        $this->root->appendChild($format);
    }

    private function createCreatorElement()
    {
        $this->product->authors->map(function ($author) {
            $name = $author->first_name . ' ' . $author->last_name;
            $creator = $this->document->createElementNS(
                'http://purl.org/dc/elements/1.1/',
                'dc:creator'
            );
            $creator->appendChild($this->document->createTextNode($name));
            // if ($author->isni_uri) {
            //     $creator->setAttributeNS(
            //         'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            //         'rdf:resource',
            //         $author->isni_uri
            //     );
            // }
            $this->root->appendChild($creator);
        });
    }

    private function createDateElement()
    {
        $date = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:date'
        );
        $date->appendChild($this->document->createTextNode($this->product->conception_year ?: $this->product->category));
        $this->root->appendChild($date);
    }

    private function createUrlElement()
    {
        $url = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:url'
        );
        $route = route('product', ['inventory_id' => $this->product->inventory_id]);
        $url->appendChild($this->document->createTextNode($route));
        $this->root->appendChild($url);
    }

    private function createRelatedElement()
    {
        if ($poster = $this->product->posterImage) {
            $related = $this->document->createElementNS(
                'http://purl.org/dc/elements/1.1/',
                'dc:related'
            );
            $poster_url = asset('/media/xl/' . $poster->path);
            $related->appendChild($this->document->createTextNode($poster_url));
            $this->root->appendChild($related);
        }
    }

    private function createRightsElement()
    {
        $poster = $this->product->posterImage;
        if ($poster && $poster->licence === 'LO 2.0') {
            $licence_txt = 'Distribué en Licence Ouverte v2.0';
        } else {
            $licence_txt = '© Mobilier National - Cette image est réservée à un usage personnel';
        }
        $rights = $this->document->createElementNS(
            'http://purl.org/dc/elements/1.1/',
            'dc:rights'
        );
        $rights->appendChild($this->document->createTextNode($licence_txt));
        $this->root->appendChild($rights);
    }

    /**
     * Get an XML representation of a Product model,
     * to use as a metadata element payload.
     *
     * @return \DomDocument
     */
    public function getXmlDocument()
    {
        collect($this->fields)->map(function ($field) {
            $this->{'create' . $field . 'Element'}();
        });

        return $this->document;
    }
}
