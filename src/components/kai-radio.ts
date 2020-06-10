import { customElement, LitElement, property, css, html } from "lit-element";

@customElement('kai-radio')
class KaiRadio extends LitElement {
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
        background-color: transparent;
        position: relative;
      }

      .circle {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
      }

      #outer {
        width: 16px;
        height: 16px;
        margin-top: -8px;
        margin-left: -8px;
        z-index: 1;
      }

      #inner {
        width: 10px;
        height: 10px;
        margin-top: -5px;
        margin-left: -5px;
        background-color: var(--gs-00);
        z-index: 2;
      }

      :host(:not([checked])) #outer {
        transition-property: transform, background-color;
        transition-duration: 0.24s;
        transition-timing-function: cubic-bezier(0.3, 0, 0.25, 1);
        transform: scale(0.3);
        background-color: var(--gs-60);
      }

      :host(:not([checked])) #inner {
        transition: transform 0.24s cubic-bezier(0.3, 0, 0.25, 1);
        transform: scale(0);
      }

      :host([checked]) #outer {
        transition-property: transform, background-color;
        transition-duration: 0.4s;
        transition-timing-function: cubic-bezier(0, 0, 0.25, 1);
        transform: scale(1);
        background-color: var(--theme-color-primary);
      }

      :host([checked]) #inner {
        transition: transform 0.3s 0.06s cubic-bezier(0, 0, 0.25, 1);
        transform: scale(1);
      }
    `;
  }

  customEvent() {
    return new CustomEvent(`radio-change`, {
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
      <div class="circle" id="inner"></div>
      <div class="circle" id="outer"></div>
    `;
  }
}