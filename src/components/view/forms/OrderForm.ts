import { Form } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { TPayment } from "../../../types";

interface IOrderForm {
  payment: TPayment;
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  private paymentCardBtn: HTMLButtonElement;
  private paymentCashBtn: HTMLButtonElement;
  private addressInput: HTMLInputElement;

  constructor(container: HTMLElement) {
    super(container);

    this.paymentCardBtn = ensureElement<HTMLButtonElement>(".button[name=card]", this.container);
    this.paymentCashBtn = ensureElement<HTMLButtonElement>(".button[name=cash]", this.container);
    this.addressInput = ensureElement<HTMLInputElement>(".form__input[name=address]", this.container);
  }

  set payment(value: TPayment) {
    if (value === 'card') {
      this.paymentCardBtn.classList.toggle("button_alt-active");
    } else {
      this.paymentCashBtn.classList.toggle("button_alt-active");
    }
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}