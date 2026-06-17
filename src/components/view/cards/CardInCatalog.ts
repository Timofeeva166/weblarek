import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";

interface ICardInCatalog {
  category: string;
  image: string;
}

export class CardInCatalog extends Card<ICardInCatalog> {
  private categoryElement: HTMLElement;
  private imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);

    //устанавливаем выбранный продукт по клику
    if(actions?.onClick) {
      this.container.addEventListener('click', actions.onClick)
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    //добавляем цвет в зависимости от категории
    this.categoryElement.className = 'card__category';
    const categoryType = categoryMap[value as keyof typeof categoryMap];

    if (categoryType) {
      this.categoryElement.classList.add(categoryType);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }
}