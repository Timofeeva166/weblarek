import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  private closeBtn: HTMLButtonElement;
  private modalContent: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.closeBtn = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);
  }

  set content(item: HTMLElement) {
    this.modalContent.innerHTML = '';
    this.modalContent.append(item);
  }

  open(): void {
  }

  close(): void {
  }
}