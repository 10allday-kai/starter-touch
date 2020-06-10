import { LitElement, html, customElement, property, css } from 'lit-element';

@customElement('kai-header')
export class KaiHeader extends LitElement {
  @property({ type: String }) mode = 'standard';
  @property({ type: Number, attribute: false }) currentScrollTop = 0;

  public static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;
          height: calc(var(--baseline) * 8);
          background-color: var(--gs-00);
        }

        :host([mode='shrinkable']),
        :host([mode='fixed']),
        :host([mode="slidable"]) {
          position: sticky;
          top: 0;
          z-index: var(--z-index-header);
        }

        :host([mode="slidable"]) {
          transition-property: transform;
          transition-duration: 0.3s;
          transition-timing-function: cubic-bezier(0, 0, 0.25, 1);
          transform: translateY(0);
        }

        :host([mode="slidable"].-slide-out) {
          transition-duration: 0.24s;
          transition-timing-function: cubic-bezier(0.5, 0, 1, 1);
          transform: translateY(-80px);
        }

        :host([mode='shrinkable']) {
          transition-property: height, margin-bottom;
          transition-duration: 0.45s;
          transition-timing-function: cubic-bezier(0.3, 0, 0.25, 1);
        }

        :host([mode='shrinkable'].-shrink) {
          height: calc(var(--baseline) * 4);
          margin-bottom: 40px;
        }

        .left {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          overflow: hidden;
          margin-inline-start: 15px;
          margin-inline-end: 10px;
        }

        .content {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-width: 43%;
          max-width: 77%;
          color: var(--gs-100);
          overflow: hidden;
        }

        .left:empty + .content {
          margin-inline-start: 20px;
        }

        .right,
        .right-icons {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          max-width: calc(var(--baseline) * 21);
          margin-inline-start: 15px;
        }

        .right {
          margin-inline-end: 8px;
        }

        .right ::slotted(kai-button:first-of-type:not(:only-of-type)) {
          margin-inline-end: 10px;
        }

        .right-icons {
          margin-inline-end: 15px;
        }

        .right-icons ::slotted(kai-button:first-of-type:not(:only-of-type)) {
          margin-inline-end: 15px;
        }

        .right:empty,
        .right-icons:empty,
        .left:empty {
          display: none;
        }

        :host([mode='shrinkable']) .left,
        :host([mode='shrinkable']) .right,
        :host([mode='shrinkable']) .right-icons {
          transition-property: transform, margin, opacity;
          transition-delay: 0, 0, 0.2s;
          transition-duration: 0.45s, 0.45s, 0.28s;
          transition-timing-function: cubic-bezier(0.3, 0, 0.25, 1);
        }

        :host([mode='shrinkable'].-shrink) .left,
        :host([mode='shrinkable'].-shrink) .right,
        :host([mode='shrinkable'].-shrink) .right-icons {
          transition-duration: 0.45s;
          transition-delay: 0;
          opacity: 0;
          pointer-events: none;
        }

        :host([mode='shrinkable'].-shrink) .left {
          transform: scale(0);
          margin-inline-end: 0;
        }

        :host([mode='shrinkable']) .content {
          transition-property: transform;
          transition-duration: 0.45s;
          transition-timing-function: cubic-bezier(0.3, 0, 0.25, 1);
          transform-origin: left center;
        }

        :host([mode='shrinkable'].-shrink) .content {
          transform: scale(0.5);
          pointer-events: none;
        }
      `,
    ];
  }

  scrollListener = (e) => {
    const page = <Element> e.target;
    if (this.mode === 'slidable') this.slide(page.scrollTop);
    if (this.mode === 'shrinkable') this.shrink(page.scrollTop);
  };

  slide(scrollTop: number) {
    if (scrollTop > this.currentScrollTop) {
      !this.classList.contains('-slide-out') && this.classList.add('-slide-out');
    } else {
      this.classList.contains('-slide-out') && this.classList.remove('-slide-out');
    }
    this.currentScrollTop = scrollTop;
  }

  shrink(scrollTop: number) {
    if (scrollTop > this.currentScrollTop) {
      !this.classList.contains('-shrink') && this.classList.add('-shrink');
    } else {
      this.classList.contains('-shrink') && this.classList.remove('-shrink');
    }
    this.currentScrollTop = scrollTop;
  }

  firstUpdated() {
    if (this.mode === 'slidable' || this.mode === 'shrinkable') {
      const parent = this.parentNode as ShadowRoot;
      parent.host.addEventListener('scroll', this.scrollListener);
    }

    if (this.mode === 'shrinkable') {
      this.addEventListener('click', () => {
        this.classList.contains('-shrink') && this.classList.remove('-shrink');
      });
    }
  }

  render() {
    return html`
      <div class="left"><slot name="left"></slot></div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="right"><slot name="right"></slot></div>
      <div class="right-icons"><slot name="right-icons"></slot></div>
    `;
  }
}
