import { css, LitElement } from 'lit-element';

export class KaiModal extends LitElement {
  static get styles() {
    return [css`
      :host {
        display: flex;
        flex-direction: column;
        width: calc(var(--baseline) * 30);
        max-height: 100%;
        outline: none;
      }

      .modal-title {
        width: 100%;
        height: 32px;
        padding: 0 20px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 12px;
      }

      .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 30px;
        border-radius: 30px;
        border: solid 2px var(--gs-80);
        padding: 25px 20px;
        overflow-y: auto;
        background-color: var(--gs-00);
        color: var(--gs-100);
      }

      .modal-actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .modal-actions ::slotted(kai-button:first-of-type:not(:only-of-type)) {
        margin-right: 20px;
      }
    `];
  }
}
