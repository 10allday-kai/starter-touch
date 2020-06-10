import { LitElement, html, property, customElement, css } from 'lit-element';
import './kai-icon';

@customElement('kai-checkbox')
class KaiCheckbox extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) value: string;

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        color: var(--gs-60);
        background-color: transparent;
        position: relative;
      }

      kai-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transition-property: opacity, transform;
        cursor: default;
      }

      #select {
        font-size: 14px;
        margin-left: -7px;
        margin-top: -7px;
      }

      #tick {
        color: var(--theme-color-primary);
        font-size: 32px;
        margin-top: -16px;
        margin-left: -16px;
      }

      :host(:not([checked])) #select {
        transition-delay: 0.12s;
        transition-duration: 0.12s, 0.22s;
        transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
        opacity: 1;
        transform: scale(1);
      }

      :host(:not([checked])) #tick {
        transition-delay: 0;
        transition-duration: 0.12s, 0.12s;
        transition-timing-function: cubic-bezier(0.3, 0, 0.5, 1);
        opacity: 0;
        transform: scale(0.8);
      }

      :host([checked]) #select {
        transition-delay: 0;
        transition-duration: 0.12s, 0.12s;
        transition-timing-function: cubic-bezier(0.3, 0, 0.5, 1);
        opacity: 0;
        transform: scale(0.8);
      }

      :host([checked]) #tick {
        transition-delay: 0.12s;
        transition-duration: 0.12s;
        transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
        opacity: 1;
        animation-name: rotate;
        animation-duration: 0.22s;
        animation-delay: 0.12s;
        animation-timing-function: cubic-bezier(0.5, 0, 0, 1);
      }

      @keyframes rotate {
        from {
          transform: rotate(-25deg);
        }
        to {
          transform: rotate(0);
        }
      }
    `;
  }

  customEvent() {
    return new CustomEvent(`checkbox-change`, {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        checked: this.checked,
        disabled: this.disabled,
        value: this.value,
      }
    });
  }

  interaction = (e: TouchEvent) => {
    this.checked = !this.checked;
  }

  firstUpdated() {
    this.addEventListener('click', this.interaction);
  }

  updated() {
    this.dispatchEvent(this.customEvent());
  }

  render() {
    return html`
      <kai-icon id="select">select</kai-icon>
      <kai-icon id="tick">tick</kai-icon>
    `;
  }
}
