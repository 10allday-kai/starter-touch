import { customElement, LitElement, css, property, html } from "lit-element";

@customElement('kai-item')
class KaiItem extends LitElement {
  @property({ type: String, reflect: true }) mode = 'list';
  @property({ type: Boolean, reflect: true }) button = false;
  
  static get styles() {
    return css`
      :host {
        display: flex;
      }

      :host([mode="list"]) {
        width: 100%;
        min-height: calc(var(--baseline) * 6);
        flex-direction: row;
        align-items: center;
        background-color: var(--gs-00);
        overflow-x: hidden;
      }

      :host([mode="list"]) .right,
      :host([mode="list"]) .left {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        overflow: hidden;
        margin-inline-start: calc(var(--baseline) * 2);
        transition-property: opacity, width;
        transition-duration: 0.12s, 0.24s;
        transition-timing-function: cubic-bezier(0, 0, 0, 1);
      }

      :host([mode="list"]) .left:empty {
        width: 0;
        opacity: 0;
        margin-inline-end: 0;
      }

      :host([mode="list"]) .left:not(:empty) {
        width: 32px;
        opacity: 1;
        margin-inline-end: calc(var(--baseline) * 1.5);
      }

      :host([mode="list"]) .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-content: center;
        align-items: flex-start;
        max-width: calc(100% - 40px);
        color: var(--gs-100);
        overflow-x: hidden;
        word-wrap: break-word;
        hyphens: auto;
        white-space: normal;
      }

      :host([mode="list"]) .right {
        margin-inline-start: calc(var(--baseline) * 1.5);
      }

      :host([mode="list"]) .right:empty {
        width: 0;
        opacity: 0;
        margin-inline-end: 0;
      }

      :host([mode="list"]) .right:not(:empty) {
        width: 32px;
        opacity: 1;
        margin-inline-end: calc(var(--baseline) * 1.5);
      }

      :host([button]) > * {
        pointer-events: none;
      }

      :host([button]) {
        transition: background 0.01s;
      }

      :host([button]:active) {
        background-color: var(--gs-10);
      }
    `;
  }

  render() {
    return html`
      <div class="left"><slot name="item-left"></slot></div>
      <div class="content"><slot name="item-content"></slot></div>
      <div class="right"><slot name="item-right"></slot></div>
    `;
  }
}
