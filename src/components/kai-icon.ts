import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('kai-icon')
class KaiIcon extends LitElement {
  @property({ type: Number }) size = 24;

  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-family: "gaia-icons";
        font-weight: 400;
        font-style: normal;
        font-size: 24px;
        text-decoration: inherit;
        text-transform: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        text-align: center;
        line-height: 1em;
        width: 1em;
        height: 1em;

        /* Enable Ligatures ================ */
        letter-spacing: 0;
        -webkit-font-feature-settings: "liga";
        -moz-font-feature-settings: "liga=1";
        -moz-font-feature-settings: "liga";
        font-feature-settings: "liga";
        -webkit-font-variant-ligatures: discretionary-ligatures;
        font-variant-ligatures: discretionary-ligatures;
      }

      :host([size='32']) {
        font-size: 32px;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
