import { customElement, html, css, property, LitElement } from 'lit-element';

@customElement('kai-overlay')
class KaiOverlay extends LitElement {
  @property({ type: Boolean }) open = false;

  static get styles() {
    return css`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: var(--z-index-modal);
        /* transition */
        opacity: 0;
        transform: scale(1.5);
        transition-property: transform, opacity;
        transition-timing-function: cubic-bezier(0, 0, 0, 1);
        transition-duration: 0, 0.1s;
        transition-delay: 0.1s, 0s;
        pointer-events: none;
        background-color: var(--overlay-bg);
      }

      :host([open]) {
        transition-duration: 0.18s, 0.12s;
        transform: scale(1);
        opacity: 1;
        transition-delay: 0;
        pointer-events: all;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
