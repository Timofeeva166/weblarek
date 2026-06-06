import { IProduct } from "../../types";

export class Basket {
  productsInBasket: IProduct[];

  constructor() {
    this.productsInBasket = [];
  }

  getProductsInBasket(): IProduct[] {
    return this.productsInBasket;
  }

  addToBasket(product: IProduct): void {
    const isProductInBasket = this.isProductInBasket(product.id);
    if (!isProductInBasket) {
      this.productsInBasket.push(product);
    }
  }

  removeFromBasket(product: IProduct): void {
    const isProductInBasket = this.isProductInBasket(product.id);
    if (isProductInBasket) {
      this.productsInBasket.filter(item=> item.id !== product.id);
    }
  }

  clearBasket(): void {
    this.productsInBasket = [];
  }

  getBasketPrice(): number {
    let amount = 0;
    this.productsInBasket.forEach(product => {
      if (product.price !== null) {
        amount += product.price;
      }
    })
    return amount;
  }

  getBasketItemsAmount(): number {
    return this.productsInBasket.length;
  }

  isProductInBasket(id: string): boolean {
    return this.productsInBasket.some(product => product.id === id);
  }
}