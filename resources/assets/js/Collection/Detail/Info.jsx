import React, { Component } from "react";
import nl2br from "react-nl2br";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ShareFacebook from "./ShareFacebook";
import SharePinterest from "./SharePinterest";
import ShareTwitter from "./ShareTwitter";
import ShareUrl from "./ShareUrl";

function InfoUnitTemplate(props) {
  return (
    <div className="DetailInfo__unit">
      <span className="DetailInfo__label">{props.label}</span>
      <span className="DetailInfo__datum">{props.value}</span>
    </div>
  );
}

function Description(props) {
  return props.description ? (
    <InfoUnitTemplate label="Description" value={nl2br(props.description)} />
  ) : null;
}

function Bibliography(props) {
  return props.bibliography ? (
    <InfoUnitTemplate label="Bibliographie" value={nl2br(props.bibliography)} />
  ) : null;
}

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    this.handleCopiedLink = this.handleCopiedLink.bind(this);
  }

  handleCopiedLink() {
    this.setState({ copied: true });
    this.copyTimeout = window.setTimeout(() => {
      this.setState({ copied: false });
    }, 1500);
  }

  componentWillUnmount() {
    if (this.copyTimeout) {
      window.clearTimeout(this.copyTimeout);
    }
  }

  render() {
    const enc_title = encodeURIComponent(
      [
        this.props.product.denomination,
        this.props.product.title_or_designation
      ].join(" ")
    );
    const enc_url = encodeURIComponent(window.location);
    const enc_media_url = encodeURIComponent(
      "/image/" + encodeURIComponent(this.props.product.images[0].path)
    );

    return (
      <section className="DetailInfo">
        <Description description={this.props.product.description} />
        <Bibliography bibliography={this.props.product.bibliography} />
        <div className="DetailInfo__unit DetailInfo__sharing">
          <a
            href={
              "https://twitter.com/intent/tweet/?text=" +
              enc_title +
              "&url=" +
              enc_url
            }
            target="_blank"
            rel="noreferrer noopener"
            title="Partager sur Twitter"
          >
            <ShareTwitter />
          </a>
          <a
            href={"https://facebook.com/sharer/sharer.php?u=" + enc_url}
            target="_blank"
            rel="noreferrer noopener"
            title="Partager sur Facebook"
          >
            <ShareFacebook />
          </a>
          <a
            href={
              "https://pinterest.com/pin/create/button/?description=" +
              enc_title +
              "&media=" +
              enc_media_url +
              "&url=" +
              enc_url
            }
            target="_blank"
            rel="noreferrer noopener"
            title="Partager sur Pinterest"
          >
            <SharePinterest />
          </a>
          <CopyToClipboard
            text={window.location}
            onCopy={this.handleCopiedLink}
          >
            <button type="button">
              <ShareUrl />
            </button>
          </CopyToClipboard>
          <div
            className={
              "DetailInfo__sharing-copied" +
              (this.state.copied ? " is-visible" : "")
            }
          >
            Lien copié !
          </div>
        </div>
      </section>
    );
  }
}

export default Info;
