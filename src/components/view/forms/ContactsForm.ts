import { Form } from "./Form";
import { ensureElement } from "../../../utils/utils";

interface IContactsForm {
  phone: string;
  email: string;
}

export class ContactsForm extends Form<IContactsForm> {
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;

  constructor(container: HTMLElement) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>(".form__input[name=email]", this.container);
    this.phoneInput = ensureElement<HTMLInputElement>(".form__input[name=phone]", this.container);
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }

  set email(value: string) {
    this.emailInput.value = value;
  }
}