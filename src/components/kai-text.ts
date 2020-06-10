import { LitElement, customElement, html, css, unsafeCSS, property } from 'lit-element';

@customElement('kai-text')
class KaiText extends LitElement {
  @property({ type: String }) as: FontScale;
  @property({ type: String }) transform: TextTransform;

  static get styles() {
    return css`
      :host([as="h1"]),
      :host([as="h2"]),
      :host([as="h3"]),
      :host([as="h4"]),
      :host([as="h5"]),
      :host([as="h6"]) {
        font-weight: bold;
      }

      :host([as="sub-1"]) {
        font-weight: 600;
      }

      :host([as="sub-2"]),
      :host([as="body-1"]),
      :host([as="body-2"]) {
        font-weight: normal;
      }

      :host([as="h1"]),
      :host([as="h4"]),
      :host([as="h5"]) {
        text-transform: uppercase;
      }

      :host([as="h1"]) {
        font-size: calc(var(--baseline) * 4);
      }

      :host([as="h2"]) {
        font-size: calc(var(--baseline) * 2.8);
      }

      :host([as="h3"]) {
        font-size: calc(var(--baseline) * 2.2);
      }

      :host([as="sub-1"]),
      :host([as="body-1"]) {
        font-size: calc(var(--baseline) * 1.8);
      }

      :host([as="body-2"]),
      :host([as="h4"]) {
        font-size: calc(var(--baseline) * 1.6);
      }

      :host([as="sub-2"]),
      :host([as="h5"]) {
        font-size: calc(var(--baseline) * 1.4);
      }

      :host([as="h6"]) {
        font-size: calc(var(--baseline) * 1.2);
      }

      :host([transform="capitalize"]) {
        text-transform: capitalize;
      }

      :host([transform="lowercase"]) {
        text-transform: lowercase;
      }

      :host([transform="uppercase"]) {
        text-transform: uppercase;
      }

      :host([transform="none"]) {
        text-transform: none;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
