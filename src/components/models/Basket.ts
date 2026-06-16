import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
  private productsInBasket: IProduct[];
  private events: IEvents;

  constructor(events: IEvents) {
    this.productsInBasket = [];
    this.events = events;
  }

  getProductsInBasket(): IProduct[] {
    return this.productsInBasket;
  }

  addToBasket(product: IProduct): void {
    const isProductInBasket = this.isProductInBasket(product.id);
    if (!isProductInBasket) {
      this.productsInBasket.push(product);
      this.events.emit('basket:change');
    }
  }

  removeFromBasket(product: IProduct): void {
    const isProductInBasket = this.isProductInBasket(product.id);
    if (isProductInBasket) {
      this.productsInBasket = this.productsInBasket.filter(item => item !== product);
      this.events.emit('basket:change');
    }
  }

  clearBasket(): void {
    this.productsInBasket = [];
    this.events.emit('basket:change');
  }

  getBasketPrice(): number {
    return this.productsInBasket.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  getBasketItemsAmount(): number {
    return this.productsInBasket.length;
  }

  isProductInBasket(id: string): boolean {
    return this.productsInBasket.some(product => product.id === id);
  }
}