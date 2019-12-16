# Recherche avancée

Le champ de recherche en plein texte comporte une syntaxe de recherche avancée, qui permet d'affiner les critères.

## Phrases exactes entre guillemets

La recherche de phrases exactes se fait entre guillemets. Exemples : `"maison royale"` ou `"trois grâces"`

On peut mélanger des termes individuels et des phrases : `tapisserie "maison royale"`.

## Correspondance partielle : \* ?

L’utilisation des caractères `?` et `*` permettent de substituer respectivement un ou plusieurs caractères.

Exemples :

- Rechercher `louis?` permet d’obtenir les `Louise` et les `Louisa`, en excluant les `Louison`.
- Rechercher `Roz*` permet d’obtenir tous les termes commençant par `roz`, tels que `Rozenberg`, `Rozenkrantz`, `Rozalewicz`, etc.

## Opérateurs booléens : et / ou / sans

Par défaut, les résultats doivent contenir tous les termes de la recherche. Une recherche pour `tapisserie maison royale` trouvera les objets contenant le terme `tapisserie` ET le terme `maison` ET le terme `royale`. Cela revient à dire que l'opérateur booléen par défaut est le _et_ (en anglais : `AND`).

On peut changer ce comportement par défaut. Par exemple, `bleu OR vert` va retourner des objets contenant le terme `bleu` ou le terme `vert`, ou les deux à la fois.

Cela devient intéressant avec l’usage des groupes, qui sont notés avec des parenthèses.
Par exemple : `(musique OR piano) AND pupitre` revient à rechercher les pupitres à musique, ou les pupitres de piano.

On peut également utiliser la négative `NOT` pour exclure des termes : `pupitre NOT lampadaire` permet de rechercher les pupitres, en excluant ceux qui ont été transformés en lampadaire.

Un raccourci rapide pour `AND` et `NOT` : `+` et `-`. Par exemple, la recherche précédente est équivalente à celle-ci : `pupitre -lampadaire`.

Notez que pour être pris en compte, les signes `+` et `-` doivent être adjacents au terme, et ne doivent pas être suivi d'un espace : `+présent -absent`.

## Cibler des champs spécifiques

Il est possible de restreindre la recherche à un champ spécifique. Par exemple `authors.first_name:Louis` renvoie tous les objets dont le prénom de l’auteur est `Louis`. On peut aussi utiliser les groupes `title_or_designation:(génie OR grâces)`, et les phrases exactes `title_or_designation:"trois grâces"`.

On peut aussi rechercher tous les objets dont un champ est renseigné : `_exists_:materials.name` va renvoyer tous les objets ayant au moins une matière de renseignée.

Les champs disponibles sont les suivants :

| Libellé                 | En français                   | Valeur attendue |
| ----------------------- | ----------------------------- | --------------- |
| title_or_designation    | Titre                         | texte           |
| denomination            | Dénomination                  | texte           |
| description             | Description                   | texte           |
| bibliography            | Bibliographie                 | texte           |
| acquisition_origin      | Origine d’acquisition         | texte           |
| acquisition_date        | Date d’acquisition            | nombre          |
| acquisition_mode.name   | Mode d’acquisition            | texte           |
| inventory_id            | Numéro d’inventaire           | texte           |
| legacy_inventory_number | Ancien numéro d’inventaire    | texte           |
| product_types.name      | Type d’objet                  | texte           |
| authors.first_name      | Prénom de l’auteur            | texte           |
| authors.last_name       | Nom de l’auteur               | texte           |
| period_name             | Époque                        | texte           |
| period_start_year       | Année de début d’un intervale | nombre          |
| period_end_year         | Année de fin d’un intervale   | nombre          |
| conception_year         | Année de conception           | nombre          |
| style.name              | Style                         | texte           |
| materials.name          | Matière                       | texte           |
| production_origin.name  | Manufacture ou atelier        | texte           |
| length_or_diameter      | Longueur ou diamètre          | nombre          |
| depth_or_width          | Profondeur ou largeur         | nombre          |
| height_or_thickness     | Hauteur ou épaisseur          | nombre          |

## Et plus encore…

D’autres types de recherches avancées sont possibles : expression régulières, approximation, proximité, intervales, coefficient d’importance…
Pour plus d’informations, veuillez vous référer à la [documentation d’Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html).
