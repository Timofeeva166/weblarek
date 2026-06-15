import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

interface ISuccess {
  debited: number;
}

export class SuccessModal extends Component<ISuccess> {
  private debitedElement: HTMLElement;
  private successCloseBtn: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);
    
    this.debitedElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.successCloseBtn = ensureElement<HTMLButtonElement>(".order-success__close",this.container);
  }

  set total(value: number) {
    this.debitedElement.textContent = `Списано ${value} синапсов`;
  }
}