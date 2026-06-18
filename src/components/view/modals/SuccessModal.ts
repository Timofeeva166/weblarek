import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { ICardActions } from "../../../types";

interface ISuccess {
  total: number;
}

export class SuccessModal extends Component<ISuccess> {
  private totalElement: HTMLElement;
  private successCloseBtn: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    
    this.totalElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.successCloseBtn = ensureElement<HTMLButtonElement>(".order-success__close",this.container);

    //закрываем по клику на кнопку
    if(actions?.onClick) {
      this.successCloseBtn.addEventListener('click', actions.onClick);
    }
  }

  set total(value: number) {
    this.totalElement.textContent = `Списано ${value} синапсов`;
  }
}