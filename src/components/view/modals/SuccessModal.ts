import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

interface ISuccess {
  total: number;
}

export class SuccessModal extends Component<ISuccess> {
  private totalElement: HTMLElement;
  private successCloseBtn: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    
    this.totalElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.successCloseBtn = ensureElement<HTMLButtonElement>(".order-success__close",this.container);

    this.successCloseBtn.addEventListener('click', () => {
      this.events.emit('modal:close');
    })
  }

  set total(value: number) {
    this.totalElement.textContent = `Списано ${value} синапсов`;
  }
}