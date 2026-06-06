import { IBuyer } from "../../types";

type ErrorsInBuyerData = {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export class Buyer {

  payment: 'card' | 'cash' | '';
  email: string;
  phone: string;
  address: string;

  constructor() {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  setPayment(payment: 'card' | 'cash' | ''): void {
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
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validateBuyerData(): ErrorsInBuyerData | null {
    const errors: ErrorsInBuyerData = {};

    if (this.payment === '') {
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
    
    return Object.keys(errors).length > 0 ? errors : null;
  }
}