import { Subject } from "../lib/subject";
import { html, TemplateResult } from "lit-html";
import '../components/kai-button';

interface OptionsMenuItem {
  label: string;
  callback: () => void;
}

export interface OptionsServiceEmit {
  open: boolean;
  position?: OptionsMenuPosition;
  options?: TemplateResult;
}

class OptionsService {
  public service = new Subject();

  public open(trigger: Element, items: OptionsMenuItem[]) {
    const position = this.calculatePos(trigger);
    const options = html`
      ${items.map(this.mountItem)}
    `;
    this.service.emit({
      open: true,
      position,
      options
    })
  }

  public close = () => {
    this.service.emit({
      open: false
    })
  }

  private calculatePos(trigger: Element): OptionsMenuPosition {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    const { top, right, bottom, left } = trigger.getBoundingClientRect();
    return {
      top: top > halfH ? null : `${bottom + 23}px`,
      right: left > halfW ? `${window.innerWidth - right}px` : null,
      bottom: top > halfH ? `${window.innerHeight - top + 23}px` : null,
      left: left > halfW ? null : `${left}px`,
    };
  }

  private mountItem = (item: OptionsMenuItem) => {
    return html`
      <kai-button 
        type="flat"
        @click="${() => {
          item.callback();
          this.close();
        }}"
        secondary
      >
        ${item.label}
      </kai-button>
    `;
  }
}

export const options = new OptionsService();
