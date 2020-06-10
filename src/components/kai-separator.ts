import { customElement, LitElement, css, html } from "lit-element";
import './kai-text';

@customElement('kai-separator')
class KaiSeparator extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        width: calc(100% - 40px);
        margin: 2px 20px;
        justify-content: flex-start;
        color: var(--theme-color-dark);
      }
    `;
  }
  
  render() {
    return html`<kai-text as="h5"><slot></slot></kai-text>`;
  }
}