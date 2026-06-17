import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../../types";

interface ICardInBasket {
  itemIndex : number;
}

export class CardInBasket extends Card<ICardInBasket>{
  private itemIndexElement: HTMLElement;
  private btnDelete: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.itemIndexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.btnDelete = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);

    //удалять товар по клику на корзину
    if (actions?.onClick) {
      this.btnDelete.addEventListener('click', actions?.onClick);
    }
  }

  set itemIndex(value: number) {
    this.itemIndexElement.textContent = String(value);
  }
}