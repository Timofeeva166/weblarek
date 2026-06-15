import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../../types";

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

    if(actions?.onClick) {
      this.container.addEventListener('click', actions.onClick)
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }
}