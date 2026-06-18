import './scss/styles.scss';
import { Catalog } from './components/models/Catalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Communication } from './components/services/Communication';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { Header } from './components/view/Header';
import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/view/modals/Modal';
import { CardCatalog } from './components/view/CardCatalog';
import { CardInBasket } from './components/view/cards/CardInBasket';
import { CardInCatalog } from './components/view/cards/CardInCatalog';
import { CardPreview } from './components/view/cards/CardPreview';
import { ContactsForm } from './components/view/forms/ContactsForm';
import { OrderForm } from './components/view/forms/OrderForm';
import { BasketModal } from './components/view/modals/BasketModal';
import { SuccessModal } from './components/view/modals/SuccessModal';
import { IProduct, TOrderRequest, TOrderResponse } from './types';

//СОБЫТИЯ
const events = new EventEmitter();

//MODELS
const productsModel = new Catalog(events);
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);
const communicationModel = new Communication(new Api(API_URL));

//VIEW ОСНОВНЫЕ
const header = new Header(events, ensureElement<HTMLElement>(".header"));
const catalog = new CardCatalog(ensureElement<HTMLElement>(".page__wrapper"), events)

//VIEW КАРТОЧКИ
const cardPreview = new CardPreview(cloneTemplate<HTMLElement>('#card-preview'),
{onClick: () => events.emit('preview:actionWithBasket')});

//VIEW ФОРМЫ
const contactsForm = new ContactsForm(events, cloneTemplate<HTMLElement>('#contacts'));
const orderForm = new OrderForm(events, cloneTemplate<HTMLElement>('#order'))

//VIEW МОДАЛКИ
const modal = new Modal(events, ensureElement<HTMLElement>(".modal"));
const basketModal = new BasketModal(events, cloneTemplate<HTMLElement>('#basket'));
const successModal = new SuccessModal(cloneTemplate<HTMLElement>('#success'),
{onClick: () => modal.closeModal()});

//Получаем продукты с сервера
const getCatalog = async() => {
  try {
    const response = await communicationModel.getProducts(); //получаем данные с сервера
    productsModel.setProductsList(response.items); //берем массив товаров и устанавливаем
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
  }
}

getCatalog();

//--КАТАЛОГ--
//создаем список продуктов
events.on("catalog:setProductsList", () => {
  const cardsList = productsModel.getProductsList().map((item) => {
    const cardInCatalog = new CardInCatalog( //создаем новый экземпляр карточки
      cloneTemplate<HTMLElement>('#card-catalog'), //как контейнер выступает шаблон card-catalog
      {onClick: () => events.emit('catalog:selectProduct', item)} //при клике устанавливаем выбранный продукт
    );
    return cardInCatalog.render(item); //рендерим по данным из пункта и ставим в массив
  })
  catalog.catalog = cardsList;
});

//клик по карточке - устанавливаем выбранный товар
events.on('catalog:selectProduct', (product: IProduct) => {
  productsModel.setSelectedProduct(product);
});

//--ПРЕВЬЮ--
//показываем превьюшку карточки после того, как установили
events.on('preview:showPreview', () => {
  const selectedItem = productsModel.getSelectedProduct();
  if (selectedItem === null) return;

  const isInBasket = basketModel.isProductInBasket(selectedItem.id);
  const isAvailableForOrder = selectedItem.price !== null;

  if (!isAvailableForOrder) {
    cardPreview.textOnBtn = 'Недоступно';
    cardPreview.btnAvailable = false;
  } else if (isInBasket) {
    cardPreview.textOnBtn = 'Удалить из корзины';
    cardPreview.btnAvailable = true;
  } else {
    cardPreview.textOnBtn = 'Купить';
    cardPreview.btnAvailable = true;
  }

  modal.content = cardPreview.render(selectedItem);
});

//Добавить или удалить из корзины
events.on('preview:actionWithBasket', () => {
  const selectedItem = productsModel.getSelectedProduct();
  if (selectedItem === null) return;

  const isItemInBasket = basketModel.isProductInBasket(selectedItem.id);
  if (!isItemInBasket) {
    basketModel.addToBasket(selectedItem);
  } else {
    basketModel.removeFromBasket(selectedItem);
  }
  modal.closeModal();
});

//--КОРЗИНА--
//изменить корзину
events.on('basket:change', () => {

  const cardsList = basketModel.getProductsInBasket().map((item, index) => {
    const cardInBasket = new CardInBasket( //создаем новый экземпляр карточки
      cloneTemplate<HTMLElement>('#card-basket'), //как контейнер выступает шаблон card-basket
      {onClick: () => events.emit('basket:removeProduct', item)} //при клике убираем продукт
    );
    cardInBasket.itemIndex = index + 1;
    return cardInBasket.render(item); //рендерим по данным из пункта 
  })

  basketModal.items = cardsList;
  basketModal.totalPrice = basketModel.getBasketPrice();
  header.basketCounter = basketModel.getBasketItemsAmount();

  //дизейблим кнопку при необходимости
  basketModal.isOrderEnabled(basketModel.getBasketItemsAmount() > 0);
});

//открыть корзину
events.on('basket:open', () => {
  if (basketModel.getBasketItemsAmount() === 0) {
    basketModal.isOrderEnabled(false);
  } else {
    basketModal.isOrderEnabled(true);
  }
  modal.content = basketModal.render();
});

//удалить элемент в корзине
events.on('basket:removeProduct', (product: IProduct) => {
  const productToDelete = productsModel.getProductById(product.id);
  if (!productToDelete) return;
  basketModel.removeFromBasket(productToDelete);
});

//--ФОРМА ЗАКАЗА--
//открыть форму заказа
events.on('orderForm:open', () => {
  modal.content = orderForm.render();
});

//выбрать вариант платежа
events.on('orderForm:payByCard', () => {
  buyerModel.setPayment('card');
});

events.on('orderForm:payByCash', () => {
  buyerModel.setPayment('cash');
});

//выбрать адрес
events.on('orderForm:setAddress', (data: {value: string}) => {
  buyerModel.setAddress(data.value);
});

//изменение формы заказа
events.on('orderForm:change', () => {
  orderForm.payment = buyerModel.getBuyerData().payment;
  orderForm.address = buyerModel.getBuyerData().address;

  const errorsInOrder = buyerModel.validateBuyerData();
  
  //текст ошибки
  const errorsText = [errorsInOrder.address, errorsInOrder.payment].filter(Boolean).join('; ');

  orderForm.formErrors = errorsText;

  //дизейблим ли кнопку
  orderForm.isNextAllowed(errorsText.length === 0);
});

//--ФОРМА КОНТАКТОВ--
//открыть форму контактов
events.on('contactsForm:open', () => {
  modal.content = contactsForm.render();
});

//выбрать email
events.on('contactsForm:setEmail', (data: {value: string}) => {
  buyerModel.setEmail(data.value);
});

//выбрать телефон
events.on('contactsForm:setPhone', (data: {value: string}) => {
  buyerModel.setPhone(data.value);
});

//изменение формы контактов
events.on('contactsForm:change', () => {
  contactsForm.email = buyerModel.getBuyerData().email;
  contactsForm.phone = buyerModel.getBuyerData().phone;

  const errorsInContacts = buyerModel.validateBuyerData();
  
  //текст ошибки
  const errorsText = [errorsInContacts.email, errorsInContacts.phone].filter(Boolean).join('; ');

  contactsForm.formErrors = errorsText;

  //дизейблим ли кнопку
  contactsForm.isNextAllowed(errorsText.length === 0);
});

//--API--
//отправить данные на сервер
events.on('contactsForm:submit', async () => {
  const requestBody: TOrderRequest = {
    ...buyerModel.getBuyerData(),
    total: basketModel.getBasketPrice(),
    items: basketModel.getProductsInBasket().map(item => item.id)
  }

  try {
    const response: TOrderResponse = await communicationModel.postOrder(requestBody);
    buyerModel.clearBuyerData();
    basketModel.clearBasket();

    successModal.total = response.total;
    modal.content = successModal.render();
  } catch(error) {
    console.error("Ошибка при отправке:", error)
  }
});

//Очистить поля и задизейблить кнопки
events.on("buyer:clear", () => {
  orderForm.payment = null;
  orderForm.address = '';
  contactsForm.email = '';
  contactsForm.phone = '';
  orderForm.isNextAllowed(false);
  contactsForm.isNextAllowed(false);
});