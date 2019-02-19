# Recherche avancée

Le champ de recherche en plein texte comporte une syntaxe de recherche avancée, qui permet d'affiner les critères.

## Champs spécifiques

Il est possible de restreindre la recherche à un champ spécifique : `auteur:paulin`. On peut aussi utiliser les groupes `titre:(génie OR grâces)`, et les phrases exactes `titre:"trois grâces"`.

On peut aussi rechercher tous les objets dont un champ est rempli (ayant une valeur non-nulle) : `_exists_:materials.name` va renvoyer tous les objets ayant au moins une matière de renseignée.

Les champs disponibles sont les suivants :

- titre
- bibliographie
- biblio
- description
- acquisition
- date_acquisition
- inventaire
- ancien_inventaire
- auteur
- période
- année
- matériaux
- type

## Phrases exactes

La recherche de phrases exactes se fait entre guillemets. Exemples : `"maison royale"`. `"trois grâces"`

On peut mélanger des termes individuels et des phrases : `tapisserie "maison royale"`.

## Correspondence partielle

L’utilisation des caractères `?` et `*` permettent de substituer respectivement un ou plusieurs caractères. Exemple : `auteur:louis?` permet de renvoyer les `Louise` et les `Louisa`.

## Expression régulières

TODO

## Approximation

TODO

## Proximité

TODO

## Intervales

TODO

## Opérateurs booléens

Par défaut, tous les termes de recherche sont optionnels, pourvu qu'un des termes soit présent. Une recherche pour `tapisserie maison royale` trouvera les objets contenant un ou plus des termes `tapisserie`, `maison`, et `royale`. Cela revient à dire que l'opérateur booléen par défaut est le _ou_ (en anglais : `OR`).

Les opérateurs de présence ou d’absence sont `+` et `-`. Par exemple, la recherche `musique -pupitre` va renvoyer les objets contentant le terme `musique` mais ne contenant pas le terme `pupitre`. La recherche `musique +piano -pupitre` va renvoyer les objets contenant le terme `piano`, peut-être le terme `musique`, mais ne contenant pas le terme `pupitre`.

Notez que pour être pris en compte, les signes `+` et `-` doivent être adjacents au terme, et ne doivent pas être suivi d'un espace.

## Groupes

Les opérateurs et les termes peuvent être associés en groupes à l’aide de parenthèses. Par exemple : `(musique OR piano) AND pupitre`, qui va renvoyer des objets contenant à la fois le terme `pupitre` mais ayant aussi un terme pouvant être soit `musique` soit `piano`.

## Coéficient d’importance

On peut attribuer plus d’importance à un terme, à une phrase, ou à un groupe de recherche. Par exemple : `tapisserie royale^2`, le terme `royale` comporte un coéficient 2, et donc compte double dans l’ordonnencement des résultats de recherche.

De la même façon, `tapisserie "maison royale"^3` applique un coéficient 3 à la phrase exacte `maison royale`.

Les groupes sont traités de la même façon : `tapisserie (oiseau bleu)^2` applique un coéficient de 2 au groupe de termes `oiseau`et `bleu`.
