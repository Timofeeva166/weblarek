import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../../types";

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

    if(actions?.onClick) {
      this.previewBtn.addEventListener('click', actions.onClick)
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set textOnBtn(value: string){
    this.previewBtn.textContent = value;
  }
}