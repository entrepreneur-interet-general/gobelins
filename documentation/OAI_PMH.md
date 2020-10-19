# Notes OAI PMH

http://beta.collections-mobilier-national.com/api/oai-pmh/?verb=Identify

## Implémentation pour Culture collection

Champ <dc:type>
J'ai utilisé notre typologie interne (par exemple : "Objet décoratif > Horlogerie > Pendule"). Mais si on regarde la spécification Dublin Core (https://dublincore.org/specifications/dublin-core/dcmi-terms/#PhysicalObject), il me semble qu'on devrait, pour tous nos objets, simplement pointer vers "http://purl.org/dc/dcmitype/PhysicalObject" ?
Notre usage

Champ <dc:source>
La spec ne semble pas s'accorde avec l'usage demandé.
https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/source/
