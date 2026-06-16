import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface ICardCatalog {
  catalog: HTMLElement[];
}

export class CardCatalog extends Component<ICardCatalog> {
  private catalogElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    
    this.catalogElement = ensureElement<HTMLElement>(".gallery", this.container);
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.innerHTML = '';
    this.catalogElement.append(...items);
  }
}