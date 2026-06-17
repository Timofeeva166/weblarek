import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

interface IBasketModal {
  items: HTMLElement[];
  totalPrice: number;
}

export class BasketModal extends Component<IBasketModal> {
  private listElement: HTMLElement;
  private placeOrderBtn: HTMLButtonElement;
  private totalPriceElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(".basket__list", this.container);
    this.placeOrderBtn = ensureElement<HTMLButtonElement>(".basket__button", this.container);
    this.totalPriceElement = ensureElement<HTMLElement>(".basket__price",this.container);

    //отобразить модалку с выбором способа оплаты и адресом
    this.placeOrderBtn.addEventListener('click', () => {
      this.events.emit('orderForm:open');
    });
  }

  set items(items: HTMLElement[]) {
    this.listElement.innerHTML = '';
    this.listElement.append(...items);
  }

  set totalPrice(value: number) {
    this.totalPriceElement.textContent = `${value} синапсов`;
  }

  //задизейблить кнопку, если в корзине пусто
  isOrderEnabled(value: boolean): void {
    this.placeOrderBtn.disabled = !value;
  }
}