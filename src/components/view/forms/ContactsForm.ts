import { Form } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

interface IContactsForm {
  email: string;
  phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>(".form__input[name=email]", this.container);
    this.phoneInput = ensureElement<HTMLInputElement>(".form__input[name=phone]", this.container);

    this.emailInput.addEventListener('input', () => {
      this.events.emit('contactsForm:setEmail', {value: this.emailInput.value});
    });

    this.phoneInput.addEventListener('input', () => {
      this.events.emit('contactsForm:setPhone', {value: this.phoneInput.value});
    });

    this.submitBtn.addEventListener('click', () => {
      this.events.emit('contactsForm:submit');
    });
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}