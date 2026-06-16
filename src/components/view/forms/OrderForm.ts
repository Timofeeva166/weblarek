import { Form } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { TPayment } from "../../../types";
import { IEvents } from "../../base/Events";

interface IOrderForm {
  payment: TPayment | null;
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  private paymentCardBtn: HTMLButtonElement;
  private paymentCashBtn: HTMLButtonElement;
  private addressInput: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.paymentCardBtn = ensureElement<HTMLButtonElement>(".button[name=card]", this.container);
    this.paymentCashBtn = ensureElement<HTMLButtonElement>(".button[name=cash]", this.container);
    this.addressInput = ensureElement<HTMLInputElement>(".form__input[name=address]", this.container);

    this.paymentCardBtn.addEventListener('click', () => {
      this.events.emit('orderForm:payByCard');
    });

    this.paymentCashBtn.addEventListener('click', () => {
      this.events.emit('orderForm:payByCash');
    });

    this.addressInput.addEventListener('input', () => {
      this.events.emit('orderForm:setAddress', {value: this.addressInput.value});
    });

    this.submitBtn.addEventListener('click', () => {
      this.events.emit('contactsForm:open');
    });

  }

  set payment(value: TPayment | null) {
    this.paymentCardBtn.classList.remove("button_alt-active");
    this.paymentCashBtn.classList.remove("button_alt-active");

    if (value === 'card') {
      this.paymentCardBtn.classList.add("button_alt-active");
    } else if (value === 'cash') {
      this.paymentCashBtn.classList.add("button_alt-active");
    }
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}