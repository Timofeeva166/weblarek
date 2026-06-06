import { IApi, TProductsResponse, TOrderRequest, TOrderResponse} from "../../types";

export class Communication {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<TProductsResponse> {
    return this.api.get<TProductsResponse>("/product");
  }

  postOrder(orderData: TOrderRequest): Promise<TOrderResponse> {
    return this.api.post<TOrderResponse>("/order", orderData);
  }
}