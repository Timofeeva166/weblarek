import { IBuyer , TErrorsInBuyerData, TPayment } from "../../types";

export class Buyer {
  private payment: TPayment | null;
  private email: string;
  private phone: string;
  private address: string;

  constructor() {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
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