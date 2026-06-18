import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  private closeBtn: HTMLButtonElement;
  private modalContent: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.closeBtn = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);

    //закрыть модалку по кресту
    this.closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    //закрытие модалки по клику вне
    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) {
        this.closeModal();
      }
    });
  }

  set content(item: HTMLElement) {
    this.modalContent.innerHTML = '';
    this.modalContent.append(item);
    this.openModal();
  }

  openModal(): void {
    this.container.classList.add("modal_active");
  }

  closeModal(): void {
    this.container.classList.remove("modal_active");
  }
}