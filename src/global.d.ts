// Type definitions for Starter Touch 1.0.0
// Project: starter-touch
// Definitions by: itriad <http://git.kaiostech.com/itriad>
type FontScale = 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'sub-1'|'sub-2'|'body-1'|'body-2';
type TextTransform = 'capitalize'|'lowercase'|'uppercase'|'none';

interface KaiTextComponent extends HTMLElement {
  as: FontScale;
  transform?: TextTransform;
}

type ToggleStatus = 'on' | 'off';

interface KaiButtonComponent extends HTMLElement {
  type?: 'rounded' | 'flat' | 'flat-icon';
  secondary?: boolean;
  disabled?: boolean;
  toggle?: ToggleStatus;
}

interface KaiInputComponent extends HTMLElement {
  value?: string;
  maxLength?: number;
  type?: 'text' | 'password' | 'number';
  placeholder?: string;
  label?: string;
  autofocus?: boolean;
  error?: string;
}

interface KaiInputEventDetail {
  value: string;
}

interface KaiInputEvent extends CustomEvent<KaiInputEventDetail> {
  type: 'input-change' | 'input-focus' | 'input-blur';
  target: KaiInputComponent;
}

interface Route {
  id: string;
  tag: string;
  home?: boolean;
}

interface HistoryEntry extends Route {
  props?: object;
  replace?: boolean;
}

interface ChangePageEvent extends CustomEvent<HistoryEntry> {
  type: 'changepage';
}

interface ReplacePageEvent extends CustomEvent<HistoryEntry> {
  type: 'replacepage';
}

interface BackPageEventDetail {
  props?: object;
}

interface BackPageEvent extends CustomEvent<BackPageEventDetail> {
  type: 'backpage';
}

interface KaiModalInterface extends HTMLElement {
  modalTitle: string;
  cancelLabel: string;
  doneLabel: string;
}

interface KaiDialogComponent extends KaiModalInterface { }

interface KaiPromptComponent extends KaiModalInterface {
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
}

interface KaiSelectorComponent extends KaiModalInterface {
  type: 'single' | 'multiple';
}

interface KaiPromptEventDetail {
  value: string;
}

interface KaiPromptEvent extends CustomEvent<KaiPromptEventDetail> {
  type: 'prompt-done' | 'prompt-input';
  target: KaiPromptComponent;
}

interface KaiSelectorValue {
  selected: string | string[];
}

interface KaiSelectorDoneEventDetail {
  value: KaiSelectorValue;
}

interface KaiSelectorDoneEvent extends CustomEvent<KaiSelectorDoneEventDetail> {
  type: 'selector-done';
}

interface KaiHeaderComponent extends HTMLElement {
  mode?: 'standard' | 'shrinkable' | 'fixed' | 'slidable';
}

interface ContainerScrollEventDetail {
  direction: 'up' | 'down';
}

interface KaiPanelComponent extends HTMLElement {
  tagName: 'KAI-PANEL';
}

interface KaiPanelScrollEvent extends CustomEvent<ContainerScrollEventDetail> {
  type: 'panel-scroll';
  target: KaiPanelComponent;
}

interface OptionsMenuPosition {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface KaiOptionsComponent extends HTMLElement {
  open?: boolean;
  position: OptionsMenuPosition;
}

interface KaiProgressComponent extends HTMLElement {
  type?: 'default' | 'top' | 'buffered' | 'indeterminate';
  percentage?: number;
  bufferPercentage?: number;
}

interface KaiCheckboxComponent extends HTMLElement {
  checked?: boolean;
  disabled?: boolean;
  value: string;
}

interface KaiRadioComponent extends HTMLElement {
  checked?: boolean;
  disabled?: boolean;
  value: string;
}

interface KaiToggleComponent extends HTMLElement {
  checked?: boolean;
  disabled?: boolean;
}

interface KaiControlChangeEventDetail {
  checked: boolean;
  disabled: boolean;
  value?: string;
}

interface KaiControlChangeEvent extends CustomEvent<KaiControlChangeEventDetail> {
  target: KaiCheckboxComponent | KaiRadioComponent | KaiToggleComponent;
  type: 'checkbox-change' | 'radio-change' | 'toggle-change';
}

interface KaiToastComponent extends HTMLElement {
  show?: boolean;
  duration?: number;
}

interface KaiTabsComponent extends HTMLElement {
  active?: number;
  started?: number[];
}

interface KaiTabsEventDetail {
  active: number;
  started: number[];
}

interface KaiTabsEvent extends CustomEvent<KaiTabsEventDetail> {
  type: 'tab-change';
  target: KaiTabsComponent;
}
