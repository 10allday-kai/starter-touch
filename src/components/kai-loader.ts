import { customElement, LitElement, css, html } from "lit-element";
import './kai-text';

@customElement('kai-loader')
class KaiLoader extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    `;
  }

  render() {
    return html`
      <img alt="loading" src="assets/images/loader.png" />
      <kai-text as="sub-1">
        <slot></slot>
      </kai-text>
    `;
  }
}