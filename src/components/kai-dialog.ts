import { KaiModal } from './kai-modal';
import { customElement, html, property } from 'lit-element';
import './kai-button';

@customElement('kai-dialog')
class KaiDialog extends KaiModal implements KaiModalInterface {
  @property({ type: String, attribute: 'modal-title' }) modalTitle: string;
  @property({ type: String, attribute: 'cancel-label' }) cancelLabel: string;
  @property({ type: String, attribute: 'done-label' }) doneLabel: string;
  
  onCancel() {
    const cancelEvent = new CustomEvent('dialog-cancel', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(cancelEvent);
  }

  onDone() {
    const doneEvent = new CustomEvent('dialog-done', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(doneEvent);
  }
  
  render() {
    return html`
      <header class="modal-title">
        <kai-text as="h3">${this.modalTitle}</kai-text>
      </header>
      <div class="modal-content">
        <slot></slot>
      </div>
      <footer class="modal-actions">
        <kai-button @click="${this.onCancel}" secondary>
          ${this.cancelLabel}
        </kai-button>
        <kai-button @click="${this.onDone}">
          ${this.doneLabel}
        </kai-button>
      </footer>
    `;
  }
}
