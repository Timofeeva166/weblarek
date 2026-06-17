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
  private previewBtn: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
    this.previewBtn = ensureElement<HTMLButtonElement>(".card__button", this.container);

    //Добавляем/удаляем из корзины по клику
    if(actions?.onClick) {
      this.previewBtn.addEventListener('click', actions.onClick)
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

  set textOnBtn(value: string){
    this.previewBtn.textContent = value;
  }

  //изменение текста и дизейбл если недоступно для добавления
  isAddToBasketEnabled(value: boolean) {
    this.previewBtn.disabled = !value;
    if (value === false) {
      this.previewBtn.textContent = 'Недоступно';
    }
  }

  //изменение текста в зависимости от того, есть ли товар в корзине
  isInBasket(value: boolean) {
    if (value === true) {
      this.textOnBtn = 'Удалить из корзины';
    } else {
      this.textOnBtn = 'Купить';
    }
  }
}