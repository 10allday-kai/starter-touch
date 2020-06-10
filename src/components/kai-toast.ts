import { customElement, LitElement, property, css, html } from "lit-element";
import './kai-text';

@customElement('kai-toast')
class KaiToast extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: true }) show = false;
  @property({ type: Number, reflect: true, attribute: true }) duration = 3000;

  static get styles() {
    return css`
      :host {
        position: fixed;
        top: 20px;
        left: 20px;
        width: calc(100% - 40px);
        min-height: 60px;
        background-color: var(--gs-40);
        color: white;
        transition-property: opacity, transform;
        transition-timing-function: cubic-bezier(0, 0, 0.25, 1);
        z-index: var(--z-index-toast);
        pointer-events: none;
        text-align: center;
        padding: 20px;
        border-radius: 30px;
        box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.3);
      }

      :host(:not([show])) {
        transition-delay: 0, 0.12s;
        transition-duration: 0.12s, 0.01;
        opacity: 0;
        transform: translateY(10px);
      }

      :host([show]) {
        transition-duration: 0.15s, 0.3s;
        opacity: 1;
        transform: translateY(0);
      }
    `;
  }

  updated() {
    if (this.show) {
      setTimeout(() => {
        this.show = false;
        this.duration = null;
      }, this.duration);
    }
  }

  render() {
    return html`<kai-text as="sub-1"><slot></slot></kai-text>`;
  }
}