import { IProduct } from "../../types";

export class Catalog {
  products: IProduct[];
  selectedProduct: IProduct | null;

  constructor() {
    this.products = [];
    this.selectedProduct = null;
  }

  setProductsList(products: IProduct[]): void {
    this.products = products;
  }

  getProductsList(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  setSelectedProduct(selectedProduct: IProduct): void {
    this.selectedProduct = selectedProduct;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}