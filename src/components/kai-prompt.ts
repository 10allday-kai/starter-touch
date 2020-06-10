import { customElement, html, property } from "lit-element";
import { KaiModal } from "./kai-modal";
import './kai-button';
import './kai-input';

@customElement('kai-prompt')
class KaiPrompt extends KaiModal implements KaiPromptComponent {
  @property({ type: String, attribute: 'modal-title' }) modalTitle: string;
  @property({ type: String, attribute: 'cancel-label' }) cancelLabel: string;
  @property({ type: String, attribute: 'done-label' }) doneLabel: string;
  @property({ type: String, attribute: 'default-value' }) defaultValue = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) maxLength = 400;
  @property({ type: Boolean, reflect: false }) isEmpty = !this.defaultValue.length;

  onCancel() {
    const cancelEvent = new CustomEvent('prompt-cancel', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(cancelEvent);
  }

  onDone() {
    const field = <KaiInputComponent> this.shadowRoot.getElementById('prompt-text-field');
    const value = field.value;
    const doneEvent = new CustomEvent('prompt-done', {
      detail: { value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(doneEvent);
  }

  onInput(e: KaiInputEvent) {
    const value = e.target.value;
    this.isEmpty = !value.trim().length;
    const inputEvent = new CustomEvent('prompt-input', {
      detail: { value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(inputEvent);
  }
  
  render() {
    return html`
      <header class="modal-title">
        <kai-text as="h3">${this.modalTitle}</kai-text>
      </header>
      <form 
        class="modal-content"
        @submit="${e => {
          e.preventDefault();
          !this.isEmpty && this.onDone();
        }}"
      >
        <kai-input
          id="prompt-text-field"
          .value="${this.defaultValue}"
          maxlength="${this.maxLength}"
          placeholder="${this.placeholder}"
          @input-change="${this.onInput}"
          autofocus
        ></kai-input>
      </form>
      <footer class="modal-actions">
        <kai-button @click="${this.onCancel}" secondary>
          ${this.cancelLabel}
        </kai-button>
        <kai-button
          @click="${this.onDone}"
          ?disabled="${this.isEmpty}"
        >
          ${this.doneLabel}
        </kai-button>
      </footer>
    `;
  }
}