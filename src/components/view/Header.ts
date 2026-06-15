import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IHeader {
  basketCounter: number;
}

export class Header extends Component<IHeader> {
  private basketBtn: HTMLButtonElement;
  private counterElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    
    this.basketBtn = ensureElement<HTMLButtonElement>(".header__basket", this.container);
    this.counterElement = ensureElement<HTMLElement>(".header__basket-counter",this.container);
  }

  set basketCounter(value: number) {
    this.counterElement.textContent = String(value);
  }
}