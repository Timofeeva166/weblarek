import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

interface IForm {
  formErrors: string;
}

export abstract class Form<T> extends Component<IForm & T> {
  protected formErrorsElement: HTMLElement;
  protected submitBtn: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.formErrorsElement = ensureElement<HTMLButtonElement>(".form__errors", this.container);
    this.submitBtn = ensureElement<HTMLButtonElement>(".button[type=submit]", this.container);

    //отключаем перезагрузку страницы
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
    })
  }

  set formErrors(value: string) {
    this.formErrorsElement.textContent = value;
  }

  //дизейбл кнопки если есть ошибки
  isNextAllowed(value: boolean): void {
    this.submitBtn.disabled = !value;
  }
}