import { LitElement, html, property, css, customElement } from 'lit-element';

const slideInKeyframes = [
  {
    'transform': `translate(${window.innerWidth}px, 0)`,
    'z-index': 0,
    'opacity': 1,
  },
  {
    'transform': 'translate(0,0)',
    'z-index': 1,
    'opacity': 1,
  },
];

const slideOutKeyframes = [
  {
    'transform': 'translate(0,0)',
    'z-index': 1,
    'opacity': 1,
  },
  {
    'transform': `translate(${window.innerWidth}px, 0)`,
    'z-index': 0,
    'opacity': 1,
  },
];

const fadeOutKeyframes = [
  {
    'transform': 'scale(1)',
    'opacity': 1,
    'z-index': 1,
  },
  {
    'transform': 'scale(0.85)',
    'opacity': 0,
    'z-index': 0,
  },
];

const fadeInKeyframes = [
  {
    'transform': 'scale(0.85)',
    'opacity': 0,
    'z-index': 0,
  },
  {
    'transform': 'scale(1)',
    'opacity': 1,
    'z-index': 1,
  },
];

@customElement('app-router')
class AppRouter extends LitElement {
  @property({ type: Object }) home: HistoryEntry;
  @property({ type: Boolean }) reverse = false;
  @property({ type: String }) exiting: string;
  @property({ type: String }) entering: string;
  @property({ type: Array }) history: HistoryEntry[] = [];

  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `;
  }

  constructor() {
    super();
    window.addEventListener('backpage', this.handleBackPage);
    window.addEventListener('changepage', this.handleChangePage);
    window.addEventListener('replacepage', this.handleChangePage);
  }

  handleBackPage = (e: BackPageEvent) => {
    if (this.history.length === 1) return;
    const exiting = this.history.pop();
    const back = this.history[this.history.length - 1];
    if (e.detail.props) {
      back.props = Object.assign({}, back.props, e.detail.props);
    }
    const backPage = this.mountPage(back);
    this.shadowRoot.appendChild(backPage);
    this.exiting = exiting.id;
    this.entering = back.id;
    this.reverse = true;
  };

  handleChangePage = (e: ChangePageEvent | ReplacePageEvent) => {
    const route = Object.assign({}, e.detail);
    const exiting = route.replace 
    ? this.history.pop() 
    : this.history[this.history.length - 1];
    const page = this.mountPage(route);
    this.shadowRoot.appendChild(page);
    delete route.replace;
    this.history.push(route);
    this.exiting = exiting.id;
    this.entering = route.id;
    this.reverse = false;
  };

  mountPage(route: HistoryEntry) {
    const page = document.createElement(route.tag);
    page.id = route.id;
    if (route.props) {
      this.applyProps(page, route.props);
    }
    return page;
  }

  applyProps(page: Element, props: object) {
    const keys = Object.keys(props);
    keys.forEach(key => {
      page.setAttribute(key, props[key]);
    });
  }

  findPage(id: string) {
    return this.shadowRoot.getElementById(id);
  }

  closePage(page: Element) {
    const animation = this.reverse ? this.slideOut(page) : this.fadeOut(page);
    animation.onfinish = () => {
      this.shadowRoot.removeChild(page);
    };
  }

  openPage(page: Element) {
    !this.reverse && page.setAttribute(
      'style',
      `transform: translate(${window.innerWidth}px, 0);`
    );
    const animation = this.reverse ? this.fadeIn(page) : this.slideIn(page);
    animation.onfinish = () => {
      page.removeAttribute('style');
    }
  }

  slideIn(page: Element): Animation {
    return page.animate(slideInKeyframes, {
      delay: 120,
      duration: 300,
      easing: 'cubic-bezier(0,0,0.25,1)',
      fill: 'forwards',
    });
  }

  fadeIn(page: Element): Animation {
    return page.animate(fadeInKeyframes, {
      delay: 120,
      duration: 300,
      easing: 'cubic-bezier(0,0,0.25,1)',
      fill: 'forwards',
    });
  }

  fadeOut(page: Element): Animation {
    return page.animate(fadeOutKeyframes, {
      duration: 300,
      easing: 'cubic-bezier(0.5,0,1,1)',
      fill: 'forwards',
    });
  }

  slideOut(page: Element): Animation {
    return page.animate(slideOutKeyframes, {
      delay: 120,
      duration: 240,
      easing: 'cubic-bezier(0.5,0,1,1)',
      fill: 'forwards',
    });
  }

  firstUpdated() {
    const homePage = this.mountPage(this.home);
    homePage.slot = 'current';
    this.shadowRoot.appendChild(homePage);
    this.history.push(this.home);
  }

  updated(changes: Map<string, any>) {
    if (changes.has('entering')) {
      const oldPage = this.findPage(this.exiting);
      const newPage = this.findPage(this.entering);
      oldPage && this.closePage(oldPage);
      newPage && this.openPage(newPage);
    }
  }

  render() {
    return html``;
  }
}
