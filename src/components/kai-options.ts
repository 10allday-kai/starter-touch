import { customElement, LitElement, css, html, property } from "lit-element";

@customElement('kai-options')
class KaiOptions extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: Object }) position: OptionsMenuPosition;

  static get styles() {
    return css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: var(--z-index-options);
      }

      :host([open]) {
        pointer-events: all;
      }

      .out {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 0
      }

      .menu {
        position: fixed;
        min-width: 216px;
        max-width: 60%;
        background-color: var(--gs-100);
        padding: 20px 15px;
        transform: scale(0.8) translate(0, -30px);
        opacity: 0;
        transition-property: opacity, transform;
        transition-delay: 0, 0.15s;
        transition-duration: 0.12s;
        transition-timing-function: cubic-bezier(0, 0, 0, 1);
        z-index: 1;
      }
      
      :host([open]) .menu {
        opacity: 1;
        transform: scale(1) translate(0, 0);
        transition-duration: 0.15s, 0.24s;
      }

      .menu ::slotted(kai-button) {
        justify-content: flex-start;
        margin: 0;
        margin-inline-start: 10px;
        max-width: unset;
        width: calc(100% - 10px);
        height: 60px;
        color: var(--gs-00);
        transform: translate(0, -20px);
        opacity: 0;
        transition-property: opacity, transform;
        transition-duration: 0.12s, 0;
        transition-delay: 0, 0.12s;
        transition-timing-function: cubic-bezier(0, 0, 0, 1);
      }

      :host([open]) .menu ::slotted(kai-button) {
        transform: translate(0, 0);
        opacity: 1;
        transition-property: opacity, transform;
        transition-delay: 0.12s;
        transition-duration: 0.12s, 0.3s;
      }
    `;
  }

  changePosition() {
    const menu = this.shadowRoot.getElementById('options-menu');
    const { top, right, bottom, left } = this.position;
    menu.style.top = top;
    menu.style.right = right;
    menu.style.bottom = bottom;
    menu.style.left = left;
    if (top && right) {
      menu.style.transformOrigin = 'right top';
      menu.style.borderRadius = '30px 2px 30px 30px';
    }
    if (bottom && right) {
      menu.style.transformOrigin = 'right bottom';
      menu.style.borderRadius = '30px 30px 2px 30px';
    }
    if (top && left) {
      menu.style.transformOrigin = 'left top';
      menu.style.borderRadius = '2px 30px 30px 30px';
    }
    if (bottom && left) {
      menu.style.transformOrigin = 'left bottom';
      menu.style.borderRadius = '30px 30px 30px 2px';
    }
  }

  updated(changes: Map<string, any>) {
    changes.has('position') && this.changePosition();
  }

  touchOut() {
    const touchOutEvent = new CustomEvent('options-touchout', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(touchOutEvent);
  }

  render() {
    return html`
      <div class="out" @click="${this.touchOut}"></div>
      <div id="options-menu" class="menu">
        <slot></slot>
      </div>
    `;
  }
}
