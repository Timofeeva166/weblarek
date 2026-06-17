# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные
В приложении используются две сущности, которые описывают данные, — товар и покупатель. Их можно описать такими интерфейсами:

#### Интерфейс товара

```
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

#### Интерфейс покупателя

```
interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}
```

## Модель данных
Для учёта данных в приложении созданы три класса, которые разделены между собой по смыслу и зонам ответственности:

#### Класс Catalog
Осуществляет хранение товаров, которые можно купить в приложении.

Конструктор:  
```
constructor() {
  this.products = [];
  this.selectedProduct = null;
}
```

Поля класса:  
`private products: IProduct[]`- хранит массив всех товаров;  
`private selectedProduct: IProduct | null`- хранит товар, выбранный для подробного отображения;

Методы класса:  
`setProductsList(products: IProduct[]): void` - сохранение массива товаров, полученного в параметрах метода;  
`getProductsList(): IProduct[]` - получение массива товаров из модели;  
`getProductById(id: string): IProduct | undefined` - получение одного товара по его id;  
`setSelectedProduct(selectedProduct: IProduct): void` - сохранение выбранного товара для подробного отображения;  
`getSelectedProduct(): IProduct | null` - получение выбранного товара для подробного отображения.  

#### Класс Basket
Осуществляет хранение товаров, которые пользователь выбрал для покупки.

Конструктор:  
```
constructor() {
  this.productsInBasket = [];
}
```

Поля класса:  
`private productsInBasket: IProduct[]`- хранит массив товаров, выбранных покупателем для покупки;

Методы класса:  
`getProductsInBasket(): IProduct[]` - получение массива товаров, которые находятся в корзине;  
`addToBasket(product: IProduct): void` - добавление товара, который был получен в параметре, в массив корзины;  
`removeFromBasket(product: IProduct): void` - удаление товара, полученного в параметре из массива корзины;  
`clearBasket(): void` - очистка корзины;  
`getBasketPrice(): number` - получение стоимости всех товаров в корзине;  
`getBasketItemsAmount(): number` - получение количества товаров в корзине;  
`isProductInBasket(id: string): boolean` - проверка наличия товара в корзине по его id, полученного в параметр метода.  

#### Класс Buyer
Осуществляет хранение данных покупателя, которые тот указал при оформлении заказа.

Конструктор:  
```
constructor() {
  this.payment = '';
  this.email = '';
  this.phone = '';
  this.address = '';
}
```

Поля класса:  
`private payment: TPayment`- хранит вид оплаты;  
`private email: string`- хранит email;   
`private phone: string`- хранит номер телефона;  
`private address: string`- хранит адреc;   

Методы класса:  
`setPayment(payment: TPayment): void` - сохранение вида оплаты;  
`setEmail(email: string): void` - сохранение email;  
`setPhone(phone: string): void` - сохранение номера телефона;  
`setAddress(address: string): void` - сохранение адреса;  
`getBuyerData(): IBuyer` - получение всех данных покупателя;  
`clearBuyerData(): void` - очистка данных покупателя;  
Для валидации необходим тип:
```
type TErrorsInBuyerData= Partial<Record<keyof IBuyer, string>>
```     
`validateBuyerData(): TErrorsInBuyerData | null` - валидация данных покупателя.  

## Слой коммуникации

#### Класс Communication
Использует композицию, чтобы выполнить запрос на сервер с помощью метода get класса Api и получает с сервера объект с массивом товаров.

Конструктор:  
```
constructor(api: Api) {
  this.api = api;
}
```

Поля класса:  
`private api: IApi` - хранит экземпляр класса Api

Методы класса:  
`getProducts(): Promise<TProductsResponse>` - получение объекта с количеством товаров и массивом товаров с сервера;  
`postOrder(orderData: TOrderRequest): Promise<TOrderResponse>` - отправка данных о выбранных товарах и покупателе на сервер.

## Слой представления

#### Класс Header
Отображает количество товаров в корзине и шапку сайта.

Интерфейс:  
```
interface IHeader {
  basketCounter: number;
}
```  

Конструктор:  
```
constructor(protected events: IEvents, container: HTMLElement) {
  super(container);
    
  this.basketBtn = ensureElement<HTMLButtonElement>(".header__basket", this.container);
  this.counterElement = ensureElement<HTMLElement>(".header__basket-counter",this.container);

  this.basketBtn.addEventListener('click', () => {
    this.events.emit('basket:open');
  });
}
```

Поля класса:  
`private basketBtn: HTMLButtonElement` - кнопка открытия корзины;  
`private counterElement: HTMLElement` - счетчик товаров, находящихся в корзине;  

Методы класса:  
`set basketCounter(value: number)` - устанавливает количество товаров в корзине;     

#### Класс CardCatalog
Отображает список товаров.

Интерфейс:  
```
interface ICardCatalog {
  catalog: HTMLElement[];
}
```  

Конструктор:  
```
constructor(container: HTMLElement, protected events: IEvents) {
  super(container);
    
  this.catalogElement = ensureElement<HTMLElement>(".gallery", this.container);
}
```

Поля класса:  
`private catalogElement: HTMLElement` - контейнер для карточек товаров;  

Методы класса:  
`set catalog(items: HTMLElement[])` - отображает карточки в каталоге;  

#### Абстрактный класс Card
Базовый класс для карточек.

Интерфейс:  
```
interface ICard {
  title: string;
  price: number | null;
}
```  

Конструктор:  
```
constructor(containter: HTMLElement) {
  super(containter);

  this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
  this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
}
```

Поля класса:  
`protected titleElement: HTMLElement` - элемент заголовка карточки;  
`protected priceElement: HTMLElement` - элемент стоимости товара;  

Методы класса:  
`set title(value: string)` - установить заголовок карточки;   
`set price(value: number | null)` - установить стоимость товара;   

#### Класс CardInBasket
Класс карточки в корзине.

Интерфейс:  
```
interface ICardInBasket {
  itemIndex : number;
}
```  

Конструктор:  
```
constructor(container: HTMLElement, actions?: ICardActions) {
  super(container);

  this.itemIndexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
  this.btnDelete = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);

  if (actions?.onClick) {
    this.btnDelete.addEventListener('click', actions?.onClick);
  }
}
```

Поля класса:  
`private itemIndexElement: HTMLElement` - элемент порядкового номера товара в корзине;  
`private btnDelete: HTMLButtonElement` - элемент кнопки удаления товара из корзины;  

Методы класса:  
`set itemIndex(value: number)` - установить порядковый номер товара;   

#### Класс CardInCatalog
Класс карточки в каталоге.

Интерфейс:  
```
interface ICardInCatalog {
  category: string;
  image: string;
}
```  

Конструктор:  
```
constructor(container: HTMLElement, actions?: ICardActions) {
  super(container);

  this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
  this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);

  if(actions?.onClick) {
    this.container.addEventListener('click', actions.onClick)
  }
}
```

Поля класса:  
`private categoryElement: HTMLElement` - элемент лейбла категории товара;  
`private imageElement: HTMLImageElement` - элемент изображения товара;  

Методы класса:  
`set category(value: string)` - установить категорию товара;   
`set image(value: string)` - установить изображение товара;   

#### Класс CardPreview
Класс превью карточки.

Интерфейс:  
```
interface ICardPreview {
  category: string;
  image: string;
  description: string;
  textOnBtn: string;
}
```  

Конструктор:  
```
constructor(container: HTMLElement, actions?: ICardActions) {
  super(container);

  this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
  this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
  this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
  this.actionsWithBasketBtn = ensureElement<HTMLButtonElement>(".card__button", this.container);

  if(actions?.onClick) {
    this.actionsWithBasketBtn.addEventListener('click', actions.onClick)
  }
}
```

Поля класса:  
`private categoryElement: HTMLElement` - элемент лейбла категории товара;  
`private imageElement: HTMLImageElement` - элемент изображения товара;  
`private descriptionElement: HTMLElement` - элемент описания товара;  
`private actionsWithBasketBtn: HTMLButtonElement` - элемент кнопки действий с корзиной;  

Методы класса:  
`set category(value: string)` - установить категорию товара;   
`set image(value: string)` - установить изображение товара;  
`set description(value: string)` - установить описание товара;   
`set textOnBtn(value: string)` - установить текст на кнопке;   
`isAddToBasketEnabled(value: boolean): void` - определяет кликабельность кнопки для добавления в корзину;   
`isInBasket(value: boolean): void` - устанавливает тект на кнопке в зависимости от того, есть ли товар в корзине;  

#### Абстрактный класс Form
Базовый класс для форм.

Интерфейс:  
```
interface IForm {
  formErrors: string;
}
```  

Конструктор:  
```
constructor(container: HTMLElement) {
  super(container);

  this.formErrorsElement = ensureElement<HTMLButtonElement>(".form__errors", this.container);
  this.submitBtn = ensureElement<HTMLButtonElement>(".button[type=submit]", this.container);

  this.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
  })
}
```

Поля класса:  
`protected formErrorsElement: HTMLElement` - элемент текста ошибок;  
`protected submitBtn: HTMLButtonElement` - элемент кнопки подтверждения;  

Методы класса:  
`set formErrors(value: string)` - показать ошибки формы;   
`isNextAllowed(value: boolean): void` - определяет, доступен ли следующий шаг;   

#### Класс OrderForm
Класс для формы типа платежа и адреса.

Интерфейс:  
```
interface IOrderForm {
  payment: TPayment | null;
  address: string;
}
```  

Конструктор:  
```
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
```

Поля класса:  
`private paymentCardBtn: HTMLButtonElement` - элемент кнопки оплаты картой;  
`private paymentCashBtn: HTMLButtonElement` - элемент кнопки оплаты наличными;  
`private addressInput: HTMLInputElement` - элемент инпута адреса;  

Методы класса:  
`set payment(value: TPayment | null)` - выделить кнопку выбранного спобова оплаты;   
`set address(value: string)` - установить адрес доставки;  

#### Класс ContactsForm
Класс для формы почты и номера телефона.

Интерфейс:  
```
interface IContactsForm {
  email: string;
  phone: string;
}
```  

Конструктор:  
```
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
```

Поля класса:  
`private emailInput: HTMLInputElement` - элемент инпута email;  
`private phoneInput: HTMLInputElement` - элемент инпута номера телефона;  

Методы класса:  
`set email(value: string)` - устанавливает почту покупателя;   
`set phone(value: string)` - устанавливает номер телефона покупателя;  

#### Класс Modal
Класс для основы модальных окон.

Интерфейс:  
```
interface IModal {
  content: HTMLElement;
}
```  

Конструктор:  
```
constructor(protected events: IEvents, container: HTMLElement) {
  super(container);

  this.closeBtn = ensureElement<HTMLButtonElement>(".modal__close", this.container);
  this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);

  this.closeBtn.addEventListener('click', () => {
    this.events.emit('modal:close');
  });

  this.container.addEventListener("click", (e) => {
    if (e.target === this.container) {
      this.events.emit("modal:close");
    }
  });
}
```

Поля класса:  
`private closeBtn: HTMLButtonElement` - элемент кнопки закрытия модального окна;  
`private modalContent: HTMLElement` - элемент контейнера для контента модального окна;  

Методы класса:  
`set content(item: HTMLElement)` - устанавливает контент модального окна;   
`openModal(): void` - открытие модального окна;  
`closeModal(): void` - закрытие модального окна;  

#### Класс BasketModal
Класс модального окна корзины.

Интерфейс:  
```
interface IBasketModal {
  items: HTMLElement[];
  totalPrice: number;
}
```  

Конструктор:  
```
constructor(protected events: IEvents, container: HTMLElement) {
  super(container);

  this.listElement = ensureElement<HTMLElement>(".basket__list", this.container);
  this.placeOrderBtn = ensureElement<HTMLButtonElement>(".basket__button", this.container);
  this.totalPriceElement = ensureElement<HTMLElement>(".basket__price",this.container);

  this.placeOrderBtn.addEventListener('click', () => {
    this.events.emit('orderForm:open');
  });
}
```

Поля класса:  
`private listElement: HTMLElement` - элемент списка карточек товаров в корзине;  
`private placeOrderBtn: HTMLButtonElement` - элемент кнопки оформления заказа;  
`private totalPriceElement: HTMLElement` - элемент текста суммы корзины;  

Методы класса:  
`set items(items: HTMLElement[])` - показать товары в корзине;   
`set totalPrice(value: number)` - показать полную стоимость корзины;  
`isOrderEnabled(value: boolean): void ` - определяет, возможен ли заказ;  

#### Класс SuccessModal
Класс модального окна успешной оплаты.

Интерфейс:  
```
interface ISuccess {
  total: number;
}
```  

Конструктор:  
```
constructor(protected events: IEvents, container: HTMLElement) {
  super(container);
    
  this.totalElement = ensureElement<HTMLElement>(".order-success__description", this.container);
  this.successCloseBtn = ensureElement<HTMLButtonElement>(".order-success__close",this.container);

  this.successCloseBtn.addEventListener('click', () => {
    this.events.emit('modal:close');
  })
}
```

Поля класса:  
`private totalElement: HTMLElement` - элемент текста с количеством списанных синапсов;  
`private successCloseBtn: HTMLButtonElement` - элемент кнопки закрытия модального окна успешной оплаты;  

Методы класса:  
`set total(value: number)` - показать полную сумму оплаты.  

## Презентер
Так как у приложения только одна страница, достаточно одного презентера, который будет отвечать за логику работы этой страницы. Презентер находится в файле main.ts

#### Логика работы презентера:
1. Пользователь совершает действие со страницей
2. Презентер "слушает" событие и вызывает метод модели
3. Метод модели обрабатывает данные и вызывает событие
4. презентер "слушает" событие и вызывает метод представления
5. Представление отображает изменения в интерфейсе

#### События модели данных:
`catalog:setProductsList` - обновить список товаров
`preview:showPreview` - показать пользователю превью
`basket:change` - изменение корзины
`orderForm:change` - изменить форму способа оплаты и адреса
`contactsForm:change` - изменить форму контактов
`buyer:clear` - очистить данные пользователя

#### События представления:
`catalog:selectProduct` - пользователь кликнул по карточке товара
`modal:close` - пользователь скрыл модальное окно
`preview:actionWithBasket` - пользователь добавил/убрал товар из корзины
`basket:open` - пользователь открыл корзину
`basket:removeProduct` - пользователь убрал продукт из корзины
`orderForm:open` - пользователь открыл форму способа оплаты и адреса
`orderForm:payByCard` - пользователь выбрал способ оплаты (карта)
`orderForm:payByCash` - пользователь выбрал способ оплаты (наличные)
`orderForm:setAddress` - пользователь изменил адрес
`contactsForm:open` - пользователь открыл форму контактов
`contactsForm:setEmail` - пользователь изменил email
`contactsForm:setPhone` - пользователь изменил телефон
`contactsForm:submit` - пользователь отправил данные на сервер