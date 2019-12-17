import React, { Component } from "react";
import { hotkeys } from "react-keyboard-shortcuts";

import Button from "../ui/Button";

class DownloadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hot_keys = {
      esc: {
        priority: 2,
        handler: this.props.onClose
      }
    };
  }

  render() {
    return (
      <section className="DetailDownloadModal" onClick={this.props.onClose}>
        <div
          className="DetailDownloadModal__window"
          onClick={e => e.stopPropagation()}
        >
          {this.props.license === "LO 2.0" ? (
            <div className="DetailDownloadModal__scroller">
              <header>
                <DownloadButton {...this.props} />
                <b className="DetailDownloadModal__headline"></b>
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
                  <span className="DetailDownloadModal__conditions-label">
                    Sous réserve de :
                  </span>
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
                <div className="DetailDownloadModal__button-holder">
                  <button onClick={this.props.onClose}>OK</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="DetailDownloadModal__scroller">
              <header>
                <DownloadButton {...this.props} />
              </header>
              <div className="DetailDownloadModal__2cols">
                <p>
                  <b className="DetailDownloadModal__headline"></b>
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
                <div className="DetailDownloadModal__button-holder">
                  <button onClick={this.props.onClose}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

function DownloadButton(props) {
  let downloadFilename = "";
  let downloadFilenameRes = props.image
    ? props.image.path.match(/.*\/(.+)(\.jpg)$/i)
    : null;
  if (downloadFilenameRes) {
    downloadFilename =
      downloadFilenameRes[1] + " © Mobilier national" + downloadFilenameRes[2];
  }
  return (
    <a
      className="Button DetailDownloadModal__download-button"
      href={`/media/orig/${encodeURIComponent(
        props.image.path.replace(".JPG", ".jpg")
      )}`}
      download={downloadFilename}
    >
      <span className="Button__inner">
        <span className="Button__label">Télécharger</span>
      </span>
    </a>
  );
}

export default hotkeys(DownloadModal);
