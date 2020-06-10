import { TemplateResult, html } from "lit-html";
import { Subject } from '../lib/subject';
import '../components/kai-text';
import '../components/kai-dialog';
import '../components/kai-prompt';
import '../components/kai-selector';
import '../components/kai-item';
import '../components/kai-radio';
import '../components/kai-checkbox';

interface DialogProps {
  title: string;
  content: string;
  cancelLabel: string;
  onCancel?: () => void;
  doneLabel: string;
  onDone?: () => void;
}

interface PromptProps {
  title: string;
  inputType?: 'text' | 'number' | 'password';
  maxLength?: number;
  defaultValue?: string;
  placeholder?: string;
  onInput?: (value: string) => void;
  cancelLabel: string;
  onCancel?: () => void;
  doneLabel: string;
  onDone: (value: string) => void;
}

interface SelectorOption {
  label: string;
  value: string;
  checked?: boolean;
}

interface SelectorProps {
  title: string;
  options: SelectorOption[];
  type: 'single' | 'multiple';
  cancelLabel: string;
  onCancel?: () => void;
  doneLabel: string;
  onDone: (value: KaiSelectorValue) => void;
}

export interface OverlayServiceEmit {
  element: TemplateResult | null;
  open: boolean;
}

class OverlayService {
  public service = new Subject();

  public close = () => {
    this.service.emit({
      open: false,
      element: null
    })
  }

  public dialog(props: DialogProps) {
    const element = html`
      <kai-dialog
        modal-title="${props.title}"
        cancel-label="${props.cancelLabel}"
        done-label="${props.doneLabel}"
        @dialog-cancel="${() => {
          props.onCancel && props.onCancel();
          this.close();
        }}"
        @dialog-done="${() => {
          props.onDone && props.onDone();
          this.close();
        }}"
      >
        <kai-text as="sub-1">
          ${props.content}
        </kai-text>
      </kai-dialog>
    `;
    this.service.emit({
      element,
      open: true,
    });
  }

  public prompt(props: PromptProps) {
    const element = html`
      <kai-prompt
        modal-title="${props.title}"
        cancel-label="${props.cancelLabel}"
        done-label="${props.doneLabel}"
        maxlength="${props.maxLength}"
        default-value="${props.defaultValue || ''}"
        placeholder="${props.placeholder || ''}"
        @prompt-cancel="${() => {
          props.onCancel && props.onCancel();
          this.close();
        }}"
        @prompt-done="${(e: KaiPromptEvent) => {
          props.onDone(e.detail.value);
          this.close();
        }}"
        @prompt-input="${(e: KaiPromptEvent) => {
          props.onInput && props.onInput(e.detail.value);
        }}"
      ></kai-prompt>
    `;
    this.service.emit({
      element,
      open: true,
    });
  }

  private _selectorItemRadio = (item: SelectorOption) => {
    return html`
      <kai-item
        mode="list"
        data-checked="${item.checked}"
        data-value="${item.value}"
        @click="${e => {
          const target = e.target as HTMLElement;
          const control = target.children.item(1);
          if (control.hasAttribute('checked')) {
            control.removeAttribute('checked');
            target.dataset.checked = 'false';
          } else {
            control.setAttribute('checked', '');
            target.dataset.checked = 'true';
          }
        }}"
        button
      >
        <kai-text as="sub-1" slot="item-content">${item.label}</kai-text>
        <kai-radio 
          slot="item-right"
          value="${item.value}"
          ?checked="${item.checked}"
        ></kai-radio>
      </kai-item>
    `;
  };

  private _selectorItemCheckbox = (item: SelectorOption) => {
    return html`
      <kai-item
        mode="list"
        data-checked="${item.checked}"
        data-value="${item.value}"
        @click="${e => {
          const target = e.target as HTMLElement;
          const control = target.children.item(1);
          if (control.hasAttribute('checked')) {
            control.removeAttribute('checked');
            target.dataset.checked = 'false';
          } else {
            control.setAttribute('checked', '');
            target.dataset.checked = 'true';
          }
        }}"
        button
      >
        <kai-text as="sub-1" slot="item-content">${item.label}</kai-text>
        <kai-checkbox
          slot="item-right"
          value="${item.value}"
          ?checked="${item.checked}"
        ></kai-checkbox>
      </kai-item>
    `;
  };

  public selector(props: SelectorProps) {
    const element = html`
      <kai-selector
        modal-title="${props.title}"
        type="${props.type}"
        cancel-label="${props.cancelLabel}"
        done-label="${props.doneLabel}"
        @selector-cancel="${() => {
          props.onCancel && props.onCancel();
          this.close();
        }}"
        @selector-done="${(e: KaiSelectorDoneEvent) => {
          props.onDone(e.detail.value);
          this.close();
        }}"
      >
        ${props.type === 'single'
            ? props.options.map(this._selectorItemRadio)
            : props.options.map(this._selectorItemCheckbox)
        }
      </kai-selector>
    `;
    this.service.emit({
      element,
      open: true,
    })
  }
}

export const overlay = new OverlayService();
