import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IHeader {
  basketCounter: number;
}

export class Header extends Component<IHeader> {
  private basketBtn: HTMLButtonElement;
  private counterElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    
    this.basketBtn = ensureElement<HTMLButtonElement>(".header__basket", this.container);
    this.counterElement = ensureElement<HTMLElement>(".header__basket-counter",this.container);

    //открывает корзину
    this.basketBtn.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set basketCounter(value: number) {
    this.counterElement.textContent = String(value);
  }
}