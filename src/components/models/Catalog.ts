import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  private products: IProduct[];
  private selectedProduct: IProduct | null;

  constructor(protected events: IEvents) {
    this.products = [];
    this.selectedProduct = null;
    this.events = events;
  }

  setProductsList(products: IProduct[]): void {
    this.products = products;
    this.events.emit("catalog:setProductsList");
  }

  getProductsList(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  setSelectedProduct(selectedProduct: IProduct): void {
    this.selectedProduct = selectedProduct;
    this.events.emit('preview:showPreview');
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}