import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";

interface ICardPreview {
  category: string;
  image: string;
  description: string;
  textOnBtn: string;
}

export class CardPreview extends Card<ICardPreview> {
  private categoryElement: HTMLElement;
  private imageElement: HTMLImageElement;
  private descriptionElement: HTMLElement;
  private actionsWithBasketBtn: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
    this.actionsWithBasketBtn = ensureElement<HTMLButtonElement>(".card__button", this.container);

    //Добавляем/удаляем из корзины по клику
    if(actions?.onClick) {
      this.actionsWithBasketBtn.addEventListener('click', actions.onClick)
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    //добавляем цвет в зависимости от катгории
    this.categoryElement.className = 'card__category';
    const categoryType = categoryMap[value as keyof typeof categoryMap];
    
    if (categoryType) {
      this.categoryElement.classList.add(categoryType);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set textOnBtn(value: string) {
    this.actionsWithBasketBtn.textContent = value;
  }

  set btnAvailable(value: boolean) {
    this.actionsWithBasketBtn.disabled = !value;
  }
}