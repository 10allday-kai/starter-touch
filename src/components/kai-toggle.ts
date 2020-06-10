import { customElement, LitElement, property, css, html } from "lit-element";

@customElement('kai-toggle')
class KaiToggle extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

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

      .track {
        position: absolute;
        top: 4px;
        left: 15px;
        width: 2px;
        height: 24px;
        border-radius: 2px;
        z-index: 1;
      }

      .outer-circle {
        position: absolute;
        left: 8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        z-index: 2;
        transition-property: bottom;
        transition-timing-function: cubic-bezier(0.3, 0, 0, 1);
      }

      .inner-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        margin-top: -5px;
        margin-left: -5px;
        background-color: var(--gs-00);
        border-radius: 50%;
        transition-property: transform;
      }

      :host(:not([checked])) .track,
      :host(:not([checked])) .outer-circle {
        background-color: var(--gs-60);
      }

      :host(:not([checked])) .outer-circle {
        transition-duration: 0.3s;
        bottom: 4px;
      }

      :host(:not([checked])) .inner-circle {
        transition-duration: 0.3s;
        transform: scale(1);
      }

      :host([checked]) .track,
      :host([checked]) .outer-circle {
        background-color: var(--theme-color-primary);
      }

      :host([checked]) .outer-circle {
        transition-duration: 0.36s;
        bottom: 12px;
      }

      :host([checked]) .inner-circle {
        transition-duration: 0.36s;
        transform: scale(0);
      }
    `;
  }

  customEvent() {
    return new CustomEvent(`toggle-change`, {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        checked: this.checked,
        disabled: this.disabled
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
      <div class="track"></div>
      <div class="outer-circle">
        <div class="inner-circle"></div>
      </div>
    `;
  }
}