import { customElement, LitElement, property, css, html } from "lit-element";

@customElement('kai-progress')
class KaiProgress extends LitElement {
  @property({ type: String }) type = 'default';
  @property({ type: Number }) percentage?: number;
  @property({ type: Number, attribute: 'buffer-percentage' }) bufferPercentage?: number;

  static get styles() {
    return css`
      :host {
        position: relative;
        width: 100%;
        height: 4px;
      }

      .track {
        position: relative;
        width: 100%;
        height: 2px;
        top: 1px;
        border-radius: 2px;
        background-color: var(--gs-20);
        z-index: 0;
      }

      :host([type="top"]) > .track {
        background-color: transparent;
      }

      :host([type="indeterminate"]) .first,
      :host([type="indeterminate"]) .second,
      .progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        border-radius: 2px;
        background-color: var(--theme-color-primary);
        z-index: 2;
      }

      :host([type="top"]) .progress {
        border-radius: 0 2px 2px 0;
      }

      :host([type="buffered"]) .buffer {
        background-color: var(--gs-80);
        z-index: 1;
      }

      :host([type="indeterminate"]) .first {
        animation: first 2s cubic-bezier(0.7, 0, 0.55, 1) infinite;
      }

      :host([type="indeterminate"]) .second {
        animation: second 2s cubic-bezier(0, 0, 0.3, 1) infinite;
      }

      @keyframes first {
        0% {
          width: 0;
        }
        45% {
          width: 100%;
          left: 0;
        }
        90% {
          width: 0;
          left: 100%;
        }
        100% {
          width: 0;
          left: 100%;
        }
      }

      @keyframes second {
        70% {
          width: 0;
          left: 0;
        }
        84% {
          width: 56%;
          left: 0;
        }
        85% {
          width: 60%;
          left: 10%;
        }
        100% {
          width: 0;
          left: 100%;
        }
      }
    `;
  }

  get progress() {
    return this.shadowRoot.querySelector('.progress:not(.buffer)') as HTMLElement;
  }

  get buffer() {
    return this.shadowRoot.querySelector('.buffer') as HTMLElement;
  }

  updateProgress() {
    this.progress.style.width = `${this.percentage}%`;
  }

  updateBuffer() {
    this.buffer.style.width = `${this.bufferPercentage}%`;
  }

  updated(changes: Map<string, any>) {
    if (changes.has('percentage')) this.updateProgress();
    if (changes.has('bufferPercentage')) this.updateBuffer();
  }

  render() {
    return html`
      <div class="track"></div>
      ${this.type === 'buffered'
          ? html`<div class="progress buffer"></div>`
          : null
      }
      <div class="progress"></div>
      ${this.type === 'indeterminate'
          ? html`
              <div class="first"></div>
              <div class="second"></div>
            `
          : null
      }
    `;
  }
}