import React, { Component } from "react";

class DownloadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="DetailDownloadModal">
        <div className="DetailDownloadModal__window">
          {this.props.license === "LO 2.0" ? (
            <div>
              <header>
                <b>Votre téléchargement est en cours</b>
                <span>
                  Cette image est sous{" "}
                  <a
                    href="https://www.data.gouv.fr/fr/licences"
                    target="_blank"
                  >
                    Licence Ouverte 2.0
                  </a>
                  .
                </span>
              </header>
              <div className="DetailDownloadModal__2cols">
                <p>
                  Vous êtes autorisés à la reproduire, la copier, l’adapter, la
                  modifier, l’extraire et la transformer, pour créer des «
                  informations dérivées », des produits ou des services, de la
                  communiquer, la diffuser, la redistribuer, la publier et la
                  transmettre, de l’exploiter à titre commercial, par exemple en
                  la combinant avec d’autres informations, ou en l’incluant dans
                  son propre produit ou application.
                </p>
                <p>
                  <span>Sous réserve de :</span>
                  mentionner la paternité, ici{" "}
                  <b>
                    «{" "}
                    {[this.props.photographer, "Mobilier national"]
                      .filter(i => !!i)
                      .join(", ")}{" "}
                    »{" "}
                  </b>
                  et la date de dernière mise à jour ici,{" "}
                  <b>« janvier 2019 »</b>.
                </p>
                <button onClick={this.props.onClose}>OK</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="DetailDownloadModal__2cols">
                <p>
                  <b>Votre téléchargement est en cours</b>
                  <span>Cette image est réservée à un usage personnel.</span>
                </p>
                <p>
                  Pour tout autre usage, renseignez-vous auprès du service de la
                  documentation :{" "}
                  <a href="mailto:documentation.mobilier@culture.gouv.fr">
                    documentation.mobilier@culture.gouv.fr
                  </a>
                  <br />
                  <br />
                  Veillez aussi à <b>contacter l’auteur</b> de l’objet ou ses{" "}
                  <b>ayants droit</b> afin de respecter les droits d’auteur.
                </p>
                <button onClick={this.props.onClose}>OK</button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default DownloadModal;
