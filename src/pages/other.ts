import { customElement, html } from "lit-element";
import { KaiPage } from "../components/kai-page";
import { router } from "../services";

import '../components/kai-header';
import '../components/kai-button';
import '../components/kai-item';

@customElement('page-other')
class PageOther extends KaiPage {
  render() {
    return html`
      <kai-header id="page-header">
        <kai-text slot="content" as="h1">
          Other Page
        </kai-text>
      </kai-header>
      <section>
        <kai-item mode="list" @click="${router.back}" button>
          <kai-text slot="item-content" as="sub-1">Back to Home</kai-text>
        </kai-item>
      </section>
    `
  }
}