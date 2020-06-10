import { customElement, html, css } from "lit-element";
import { KaiPage } from "../components/kai-page";
import { options, overlay, toast, router } from "../services";

import '../components/kai-header';
import '../components/kai-button';
import '../components/kai-item';

@customElement('page-home')
class PageHome extends KaiPage {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: flex;
          flex: content;
          flex-direction: column;
          overflow-y: hidden;
        }
      `
    ];
  }
  
  openDialog() {
    overlay.dialog({
      title: 'Dialog Title',
      content: 'This is a dialog.',
      cancelLabel: 'Whatever',
      doneLabel: 'Got It',
      onCancel: () => console.log('Cancel pressed'),
      onDone: () => console.log('Done pressed')
    });
  }
  
  openOptions(e: TouchEvent) {
    const trigger = <KaiButtonComponent> e.target;
    options.open(trigger, [
      {
        label: 'Open a Dialog',
        callback: () => this.openDialog()
      },
      {
        label: 'Show a Toast',
        callback: () => this.showToast()
      },
      {
        label: 'Change Theme',
        callback: () => this.toggleTheme()
      }
    ]);
  }

  showToast() {
    toast.show({
      message: 'This is a Toast'
    });
  }

  get theme() {
    return document.documentElement.dataset.theme;
  }

  set theme(value: string) {
    document.documentElement.dataset.theme = value;
  }

  toggleTheme() {
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }
  
  render() {
    return html`
      <kai-header id="page-header">
        <kai-text slot="content" as="h1">
          Start Here
        </kai-text>
        <kai-button slot="right-icons" type="flat-icon" @click="${this.openOptions}">
          menu
        </kai-button>
      </kai-header>
      <section>
        <kai-item mode="list" @click="${() => router.to('other')}" button>
          <kai-text slot="item-content" as="sub-1">Go to another page</kai-text>
        </kai-item>
      </section>
    `;
  }
}
