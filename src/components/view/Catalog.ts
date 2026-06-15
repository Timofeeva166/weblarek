import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface ICatalog {
  catalog: HTMLElement[];
}

export class Catalog extends Component<ICatalog> {
  private catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    
    this.catalogElement = ensureElement<HTMLElement>(".gallery", this.container);
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.innerHTML = '';
    this.catalogElement.append(...items);
  }
}