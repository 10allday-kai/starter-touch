import { customElement, LitElement, css, html, property } from "lit-element";
import './kai-text';

@customElement('kai-tabs')
class KaiTabs extends LitElement {
  @property({ type: Array, reflect: true }) titles: string[];
  @property({ type: Number, reflect: true }) active = 0;
  @property({ type: Array, reflect: true }) started: number[] = [0];
  
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    
      .tabs {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: calc(var(--baseline) * 4);
        overflow: hidden;
        white-space: nowrap;
        background-color: var(--gs-00);
      }

      .title {
        padding: 2px 0;
        padding-inline-start: 10px;
        padding-inline-end: 10px;
        white-space: nowrap;
        position: relative;
        transition-property: color;
        transition-duration: 0.12s;
        color: var(--gs-100);
      }

      .title:first-of-type {
        padding-inline-start: 20px;
      }

      .title:last-of-type {
        padding-inline-end: 20px;
      }

      .title.-active {
        transition-duration: 0.2s;
        color: var(--theme-color-primary);
      }

      .title::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 10px;
        width: calc(100% - 20px);
        height: 3px;
        border-radius: 2px;
        background-color: var(--theme-color-primary);
        transition-property: transform, opacity;
        transition-duration: 0.3s, 0.15s;
        transition-timing-function: cubic-bezier(0.2, 0, 0.25, 1);
        transform: scaleX(0);
        opacity: 0;
      }

      .title:first-of-type::after,
      .title:last-of-type::after {
        width: calc(100% - 30px);
      }

      .title:first-of-type::after {
        left: 20px;
      }

      .title:only-child::after {
        width: calc(100% - 40px);
      }

      .title.-active::after {
        transform: scaleX(1);
        opacity: 1;
      }

      .panels {
        width: 100%;
        height: calc(100% - 40px);
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        scroll-snap-points-x: repeat(100%);
        scroll-snap-type: mandatory;
        scroll-behavior: smooth;
        font-size: 0;
        transition: height 0.24s cubic-bezier(0.5, 0, 1, 1);
      }
    `;
  }

  get currentTab() {
    return this.shadowRoot.querySelector('.tabs .title.-active');
  }

  get panelsContainer() {
    return this.shadowRoot.querySelector('.panels') as HTMLElement;
  }

  panelScrollHandler = (e) => {
    const container = e.target as Element;
    const panelWidth = window.innerWidth;
    const startPoint = panelWidth * this.active;
    const x = container.scrollLeft;
    const percentage = (x - startPoint) / panelWidth;

    if (percentage >= 0.5) {
      this.active += 1;
    } else if (percentage <= -0.5 && this.active > 0) {
      this.active -= 1;
    }
  };

  scrollPanel = (e) => {
    const target = e.target as HTMLElement;
    const index = parseInt(target.dataset.index);
    const panelWidth = window.innerWidth;
    const left = panelWidth * index;
    /**
     * TODO: Investigate the root cause of this problem
     * and remove this workaround.
     */
    this.panelsContainer.style.overflowX = 'hidden';
    // this is OK
    this.panelsContainer.scrollTo({
      left,
      behavior: 'smooth',
    });
    // remove this setTimeout
    setTimeout(() => {
      this.panelsContainer.removeAttribute('style');
    }, 300);
  };

  customEvent() {
    return new CustomEvent('tab-change', {
      bubbles: true,
      composed: true,
      detail: {
        active: this.active,
        started: this.started
      }
    });
  }

  animateTabs() {
    const current = this.shadowRoot.querySelector('.title.-active');
    const parent = current.parentElement;
    if (!current) return;
    const { left, width } = current.getBoundingClientRect();
    const margin = (parent.clientWidth - width) / 2;
    const leftTo = parent.scrollLeft + (left - margin);
    parent.scrollTo({
      left: leftTo,
      behavior: "smooth"
    });
  }

  async updated(changes: Map<string, any>) {
    if (changes.has('active')) {
      this.animateTabs();
      !this.started.includes(this.active) && this.started.push(this.active);
      await super.updateComplete;
      await this.updateComplete;
      const timeToWait = this.started.length > 1 ? 300 : 0;
      setTimeout(() => {
        this.dispatchEvent(this.customEvent());
        const curPanel = this.children.item(this.active);
        curPanel.hasAttribute('wait') && curPanel.removeAttribute('wait');
      }, timeToWait);
    }
  }

  renderTitles() {
    return html`
      <header class="tabs">
        ${this.titles.map((title, index) => html`
          <kai-text 
            as="h4"
            class="${index === this.active ? 'title -active' : 'title'}"
            data-index="${index}"
            @click="${this.scrollPanel}"
          >
            ${title}
          </kai-text>
        `)}
      </header>
    `;
  }
  
  render() {
    return html`
      ${this.renderTitles()}
      <section class="panels" @scroll="${this.panelScrollHandler}">
        <slot></slot>
      </section>
    `;
  }
}
