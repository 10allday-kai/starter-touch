import { LitElement, customElement, property, css, html } from 'lit-element';

@customElement('kai-sidemenu')
class KaiSidemenu extends LitElement {
  @property({ type: Boolean }) open = false;

  constructor() {
    super();
    this.addEventListener('click', this.toggle);
  }
  
  static get styles() {
    return css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: var(--z-index-sidemenu);
      }

      nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 252px;
        height: 100%;
        background-color: var(--gs-20);
        box-shadow: 0.5rem 0 1.5rem 0 rgba(0, 0, 0, 0.3);
        transition-property: transform;
        transition-duration: 0.5s;
        transition-timing-function: cubic-bezier(0.75,0,1,1);
        transform: translateX(-255px);
      }

      :host([open]) {
        pointer-events: all;
      }

      :host([open]) nav {
        transition-duration: 0.45s;
        transition-timing-function: cubic-bezier(0,0,0,1);
        transform: translateX(0);
      }

      nav ::slotted(kai-button) {
        max-width: 100%;
        margin: 0;
      }
    `;
  }

  toggle() {
    this.removeAttribute('open');
  }
  
  render() {
    return html`<nav><slot></slot></nav>`;
  }
}
