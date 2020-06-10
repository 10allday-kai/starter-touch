import { customElement, LitElement, css, html, property } from "lit-element";
import './kai-loader';

@customElement('kai-panel')
class KaiPanel extends LitElement {
  @property({ type: Boolean, reflect: true }) wait = true;
  @property({ type: Number, attribute: false }) currentScrollTop = 0;

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }

      :host(:not([wait])) {
        animation: fadeIn 0.3s forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
  }

  customEvent(direction: 'up'|'down') {
    return new CustomEvent('panel-scroll', {
      bubbles: true,
      composed: true,
      detail: {
        direction,
      }
    });
  }

  handleScroll = () => {
    if (this.scrollTop > this.currentScrollTop) {
      this.dispatchEvent(this.customEvent('down'));
    } else if (this.scrollTop < this.currentScrollTop) {
      this.dispatchEvent(this.customEvent('up'));
    }
    this.currentScrollTop = this.scrollTop;
  }

  firstUpdated() {
    this.addEventListener('scroll', this.handleScroll);
  }
  
  render() {
    if (this.wait) {
      return html`<kai-loader></kai-loader>`;
    }
    return html`<slot></slot>`;
  }
}
