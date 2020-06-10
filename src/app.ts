import { LitElement, html, css, property, customElement } from 'lit-element';
import { 
  overlay,
  OverlayServiceEmit,
  options,
  OptionsServiceEmit,
  toast,
  ToastServiceEmit,
  router
} from './services';
import './components/router';
import './components/kai-overlay';
import './components/kai-options';
import './components/kai-toast';
import './pages';

@customElement('app-root')
class AppRoot extends LitElement {
  // OverlayService
  @property({ type: Object, reflect: false }) overlay = null;
  // OptionsService
  @property({ type: Object, reflect: false }) options = null;

  constructor() {
    super();
    // RouterService
    router.register([
      {
        id: 'home',
        tag: 'page-home',
        home: true
      },
      {
        id: 'other',
        tag: 'page-other'
      }
    ]);
    // OverlayService
    overlay.service.subscribe(({ element, open }: OverlayServiceEmit) => {
      const overlay = this.shadowRoot.getElementById('modal-layer');
      this.overlay = element;
      if (open) overlay.setAttribute('open', '');
      else overlay.removeAttribute('open');
    });
    // OptionsService
    options.service.subscribe(({ open, position, options }: OptionsServiceEmit) => {
      const element = this.shadowRoot.getElementById('app-options');
      options && (this.options = options);
      position && element.setAttribute('position', JSON.stringify(position));
      if (open) element.setAttribute('open', '');
      else element.removeAttribute('open');
    });
    // ToastService
    toast.service.subscribe((data: ToastServiceEmit) => {
      const toast = this.shadowRoot.getElementById('app-toast');
      toast.setAttribute('duration', data.duration.toString());
      toast.textContent = data.message;
      toast.setAttribute('show', '');
    });
  }
  
  static get styles() {
    return css`
      :host {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: var(--gs-00);
        color: var(--gs-100);
      }
    `;
  }

  render() {
    return html`
      <app-router .home="${router.home}"></app-router>
      <kai-overlay id="modal-layer">
        ${this.overlay}
      </kai-overlay>
      <kai-options id="app-options" @options-touchout="${options.close}">
        ${this.options}
      </kai-options>
      <kai-toast id="app-toast"></kai-toast>
    `;
  }
}
