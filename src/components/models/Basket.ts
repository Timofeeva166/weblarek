import { IProduct } from "../../types";

export class Basket {
  private productsInBasket: IProduct[];

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
      this.productsInBasket = this.productsInBasket.filter(item => item !== product);
    }
  }

  clearBasket(): void {
    this.productsInBasket = [];
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