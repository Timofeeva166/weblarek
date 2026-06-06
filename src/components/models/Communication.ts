import { IApi, ProductsResponse, OrderRequest, OrderResponse} from "../../types";

export class Communication {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<ProductsResponse> {
    return this.api.get<ProductsResponse>("/product");
  }

  postOrder(orderData: OrderRequest): Promise<OrderResponse> {
    return this.api.post<OrderResponse>("/order", orderData);
  }
}