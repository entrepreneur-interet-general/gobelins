@extends('layouts.default')

@section('content')
    
<nav class="InfoNav">
    <ul>
        <li>
            <a href="{{ route('search') }}" class="InfoNav__back">
                <svg width="19" height="19">
                    <path d="M9 18L1 9.52236" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 1L1 9.47764" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="18.5" y1="9.5" x2="1.5" y2="9.5" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                <span>Collections du Mobilier national</span>
            </a>
        </li>
        <li><a href="#project">Projet</a></li>
        <li><a href="#credits">Crédits et mentions légales</a></li>
        <li><a href="#cgu">Conditions générale d’utilisation</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
<main class="Info">
    
    <section id="project">
    
        <h1><span>Projet</span></h1>

        <p>Ce projet a pour objectif de rendre accessible les collections du Mobilier national, ses objets, tapisseries, meubles, peintures… et permettre à chacun de consulter les informations relatives à ceux-ci.</p>

        <p>Ce travail est en cours de réalisation, il s’est construit avec le programme Entrepreneur·e d’intérêt général d’Étalab, permettant l’accueil au Mobilier national de Ned Baldessin développeur et Laurie Chapotte designer d’interface et de service. Ils sont accompagnés par le secrétaire général Jérôme Poulain et Hélène Cavalié cheffe de la documentation ainsi que de nombreux agents publics dans l’institution.</p>

        <p>Cette version beta est en cours de développement et sera soumise à des évolutions. Elle sera complétée prochainement par de nouvelles fonctionnalités et des contenus éditoriaux explicitant les ateliers, techniques, outils, matières utilisées au Mobilier national.<br>
        En attendant n’hésitez pas à nous contacter pour nous signaler une erreur, nous faire part d’une remarque, ou vous renseignez sur le projet via le paragraphe « <a href="#contact">contact</a> ».</p>

    </section>


    <section id="credits">

        <h1><span>Crédits et mentions légales</span></h1>

        <h2>Directeur de la publication</h2>
        <p>Hervé Lemoine, directeur du Mobilier national</p>

        <h2>Éditeur</h2>
        <p>
            Mobilier national et manufactures nationales des Gobelins, de Beauvais et de la Savonnerie<br>
            1 rue Berbier-du-mets<br>
            75013 Paris
        </p>

        <p>
            Téléphone : <a href="tel:+33(0)144085200">01 44 08 52 00</a><br>
            Télécopieur : 01 44 08 53 00
        </p>

        <h2>Hébergeur</h2>
        <p>
            Sous-direction des systèmes d’information<br>
            Rue du fort de Saint-Cyr<br>
            Montigny-le-Bretonneux<br>
            78 182 Saint-Quentin-en-Yvelines Cedex<br>
            Téléphone : 01 30 85 67 58<br>
            Télécopieur : 01 30 85 67 67
        </p>


        <h2>Coordination du projet</h2>
        <p>
            Jérôme Poulain, secrétaire général du Mobilier national <br>
            Hélène Cavalié, cheffe de la documentation du Mobilier national
        </p>

        <h2>Développement technique</h2>
        <p>Ned Baldessin</p>

        <h2>Design d’interface (UX/UI)</h2>
        <p>Laurie Chapotte</p>

        <h2>Contenus éditoriaux</h2>
        <p>Agents publics du Mobilier national</p>

        <h2>Financement</h2>
        <p>Programme investissement d'avenir, caisse des dépôts</p>

        <h2>Avec la participation de</h2>
        <p>
            Programme entrepreneur d’intérêt général, Étalab<br>
            Sous direction des système d’information, Ministère de la culture<br>
            Jean-Luc Horsin, installation informatique bureautique, Mobilier National
        </p>

        <h2>Crédits photographiques </h2>
        <p>
            Agents publics du ministère de la culture.
            Noms et prénoms des photographes précisés sur chaque fiche objet.
        </p>


        <h2>Langages et logiciels utilisés</h2>
        <p>
            Langages : PHP et Javascript<br>
            Backend : Laravel<br>
            Bases de données : PostgresQL, ElasticSearch<br>
            Frontend : React, Sass, Babel, Webpack
        </p>

        <h2>Code source</h2>
        <p>
            <a href="https://github.com/entrepreneur-interet-general/gobelins">github.com/entrepreneur-interet-general/gobelins</a>
        </p>

    </section>

    <section id="cgu">

        <h1><span>Conditions générale d’utilisation</span></h1>

        <h2>Responsabilités</h2>

        <p>
            Les informations affichées sur ce site sont données à titre purement indicatif. Elles sont modifiables à tout moment et sans préavis. En dépit du soin apporté au recueil des informations ainsi qu'à la réalisation du site, des erreurs, omissions, inexactitudes, coupures ou additions indépendantes de notre volonté peuvent demeurer ou s'insérer sur ce site. De même que pour toute publication, des informations ou éléments contenus dans ce site, peuvent devenir obsolètes. 
        </p>

        <p>
            Le Mobilier national ne saurait en conséquence voir sa responsabilité engagée à raison de tout préjudice, direct ou indirect, de quelque nature que ce soit, résultant pour tout ou partie de l'utilisation des informations du site. Vous pouvez cependant nous faire part d’erreurs ou remarques grâce à l’adresse renseignée dans la rubrique « contact ».
        </p>

        <p>
            Compte tenu de ce qui précède, l'utilisateur du site et des informations qu'il contient reconnaît qu'il en fait usage sous sa seule responsabilité. 
        </p>

        <p>
            L’usager s'engage à ne pas effectuer d'opérations pouvant nuire au bon fonctionnement du site, à l'intégralité des informations diffusées et à l'image du Mobilier national. Il s'engage également à exercer une vigilance toute particulière dans l'utilisation des éléments qui sont mis à sa disposition et à observer toutes les précautions d'usage.
        </p>


        <h2>Liens</h2>
        
        <p>
            Le présent site peut fournir des liens et des références à d'autres sites mais le Mobilier national n'est pas responsable de la teneur des dits autres sites, et ne sera tenu responsable d'aucun dommage ou préjudice en découlant.
        </p>


        <h2>Données à caractère personnel</h2>
    
        <p>Aucune donnée à caractère personnel n’est collectée sur cette version beta.</p>

        <h2>Droits de propriété intellectuels</h2>

        <p>
            Différents droits s’appliquent sur nos images. Au clic sur l’icône téléchargement vous serez informés sur ceux-ci.
        </p>

        <p>
            Une partie des contenus (textes et images) sont utilisables en Licence Ouverte 2.0. Vous êtes autorisés à les reproduire, les copier, les adapter, les modifier, les extraire et les transformer, pour créer des « informations dérivées », des produits ou des services, de les communiquer, les diffuser, les redistribuer, les publier, les transmettre, les exploiter à titre commercial, par exemple en les combinant avec d’autres informations, ou en les incluant dans son propre produit.
        </p>

        <p>
            Cela sous réserve de mentionner la paternité du photographe et de l’auteur, à défaut mentionner le Mobilier national.
        </p>

        <p>
            D’autres contenus présents sur le site sont réservés à un usage personnel. Ils sont couverts par un droit de la propriété intellectuelle et notamment par les articles L.112-2 et L.341-1 du code de la propriété intellectuelle. Tous les droits d'exploitation sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.Toute reproduction, représentation, utilisation, mise à disposition ou modification, par quelque procédé que ce soit, de tout ou une partie du site contenant des droits de propriété littéraire et artistique, sans avoir obtenu l'autorisation préalable du Mobilier national et des éventuels auteurs ou leurs ayants-droit, est strictement interdite et constitue un délit de contrefaçon (article L.335-2 et suivants du code de la propriété intellectuelle). Seule une utilisation à des fins strictement personnelles est autorisée.
        </p>

        <p>
            Les contenus peuvent être utilisés conformément aux présentes conditions d’utilisation, sous la seule responsabilité de l’utilisateur. À l’exception des contenus grevés de droit de propriété intellectuelle de tiers ou incluant des données personnelles, les contenus présents sur ce site sont des informations publiques librement réutilisables au sens de la loi n° 78-753 du 17 juillet 1978.
        </p>


        <h2>Disponibilité des objets pour l’ameublement</h2>

        <p>
            Si vous êtes dépositaire du Mobilier national, nous vous informons que les objets présentés sur ce site sont actuellement utilisés dans de nombreux lieux. Ainsi leur disponibilité ne peut vous être assurée.
        </p>

        <p>
            Pour toute demande de dépôt il sera nécessaire de vous mettre en relation avec notre service ameublement qui vous conseillera en fonction des disponibilités.
        </p>


    <section id="contact">
    
       <h1><span>Contact</span></h1>


        <p>
            Pour une demande concernant l’achat ou la réglementation des droits photographiques, veuillez écrire à : <a href="mailto:documentation.mobilier@culture.gouv.fr">documentation.mobilier@culture.gouv.fr</a> ou <a href="mailto:helene.cavalie@culture.gouv.fr">helene.cavalie@culture.gouv.fr</a>.
        </p>

        <p>
            Pour toute erreur remarquée, suggestion ou renseignement sur ce site veuillez écrire à <a href="mailto:laurie.chapotte.ext@culture.gouv.fr">laurie.chapotte.ext@culture.gouv.fr</a>
        </p>

        <p>
            Pour des renseignements sur le code source : <a href="mailto:ned@baldessin.fr">ned@baldessin.fr</a>
        </p>
  </section>
        <p>
            <strong>Mobilier national et manufactures nationales des Gobelins, de Beauvais et de la Savonnerie</strong><br>
            1 rue Berbier-du-Mets<br>
            75013 PARIS<br>
            Téléphone : 01 44 08 52 00<br>
            Télécopieur : 01 44 08 53 00<br>
            <a href="http://www.mobiliernational.culture.gouv.fr/
">http://www.mobiliernational.culture.gouv.fr/</a>
        </p>

        <div class="Info__logos">

            <p>
                <span>Ce site a été réalisé par :</span>
                <a href="http://www.mobiliernational.culture.gouv.fr/">
                    <img src="/images/logos/gobelins_logo@3x.png" width="72" height="72" alt="Logo Mobilier national">
                </a>
                <a href="http://www.culture.gouv.fr/">
                    <img src="/images/logos/MarianneMC@3x.png" width="45" height="57" alt="Logo Ministère de la Culture et de la Communication">
                </a>
                <a href="https://entrepreneur-interet-general.etalab.gouv.fr/">
                    <img src="/images/logos/eig@3x.png" width="166" height="36" alt="Logo Entrepreneur d’Intérêt Général (EIG)">
                </a>
            </p>

            <p>
                <span>Avec le soutient de :</span>
                <a href="https://www.gouvernement.fr/une-mission-investir-l-avenir">
                    <img src="/images/logos/label-IA-2018@3x.png" width="52" height="52" alt="Logo Investir l'Avenir">
                </a>
                <a href="https://www.etalab.gouv.fr/">
                    <img src="/images/logos/Logo-etalab@3x.png" width="93" height="58" alt="Logo Etalab">
                </a>
            </p>
        </div>

</section>
</main>

@stop
