import { IBuyer , TErrorsInBuyerData, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  private payment: TPayment | null;
  private email: string;
  private phone: string;
  private address: string;
  private events: IEvents;

  constructor(events: IEvents) {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
    this.events = events;
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit('orderForm:change');
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit('contactsForm:change');
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit('contactsForm:change');
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit('orderForm:change');
  }

  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  clearBuyerData(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
    this.events.emit('buyer:clear');
  }

  validateBuyerData(): TErrorsInBuyerData {
    const errors: TErrorsInBuyerData = {};

    if (this.payment === null) {
      errors.payment = 'Необходимо указать вид оплаты';
    }

    if (this.phone.trim() === '') {
      errors.phone = 'Необходимо указать номер телефона';
    }
    
    if (this.email.trim() === '') {
      errors.email = 'Необходимо указать email';
    }
    
    if (this.address.trim() === '') {
      errors.address = 'Необходимо указать адрес';
    }
    
    return errors;
  }
}