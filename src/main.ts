import './scss/styles.scss';
import { Catalog } from './components/models/Catalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { apiProducts } from './utils/data';
import { Communication } from './components/services/Communication';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

// КАТАЛОГ
console.log("ПРОВЕРКА КАТАЛОГА")
const productsModel = new Catalog();
//установить каталог
productsModel.setProductsList(apiProducts.items);
//получить каталог
console.log("Массив товаров из каталога: ", productsModel.getProductsList());
//получить по айди
console.log("Товар с ID 854cef69-976d-4c2a-a18c-2aa45046c390: ", productsModel.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'));
//выбрать товар
productsModel.setSelectedProduct(apiProducts.items[1]);
//получить выбранный товар
console.log("Выбрали: HEX-леденец")
console.log("Выбранный товар: ", productsModel.getSelectedProduct());

//КОРЗИНА
console.log("ПРОВЕРКА КОРЗИНЫ")
const basketModel = new Basket();
//изначальное кол-во товаров в корзине
console.log("Изначальное количество товаров в корзине: ", basketModel.getBasketItemsAmount());
//добавили в корзину
basketModel.addToBasket(apiProducts.items[0]);
basketModel.addToBasket(apiProducts.items[3]);
basketModel.addToBasket(apiProducts.items[1]);
//кол-во товаров после добавления двух
console.log("Добавили: +1 час в сутках, Фреймворк куки судьбы, HEX-леденец")
console.log("Количество товаров в корзине после добавления: ", basketModel.getBasketItemsAmount());
//вывести товары, которые есть в корзине
console.log("Список товаров в корзине после добавления: ", basketModel.getProductsInBasket());
//вывести стоимость
console.log("Стоимость корзины: ", basketModel.getBasketPrice());
//убрать из корзины
basketModel.removeFromBasket(apiProducts.items[0]);
//кол-во товаров после удаления одного
console.log("Убрали: +1 час в сутках")
console.log("Количество товаров в корзине после удаления: ", basketModel.getBasketItemsAmount());
//вывести товары, которые есть в корзине
console.log("Список товаров в корзине после удаления: ", basketModel.getProductsInBasket());
//проверка наличия в корзине - нет в корзине
console.log("Товар \"Мамка-таймер\" есть в корзине? ", basketModel.isProductInBasket(apiProducts.items[2].id));
//проверка наличия в корзине - есть в корзине
console.log("Товар \"HEX-леденец\" есть в корзине? ", basketModel.isProductInBasket(apiProducts.items[1].id));
//очистить
basketModel.clearBasket();
console.log("Количество товаров после очистки корзины: ", basketModel.getBasketItemsAmount());
console.log("Список товаров после очистки корзины", basketModel.getProductsInBasket());

//ПОКУПАТЕЛЬ
console.log("ПРОВЕРКА ПОКУПАТЕЛЯ");
const buyerModel = new Buyer();
//изначальные данные пользователя
console.log("Изначальные данные пользователя: ", buyerModel.getBuyerData());
//валидация
console.log("Валидация данных (данные отсутствуют): ", buyerModel.validateBuyerData());
//ввести данные
buyerModel.setPayment('cash');
buyerModel.setEmail('test@test.test');
buyerModel.setPhone('79000000000');
buyerModel.setAddress('Улица Тестов, д1, кв.1')
//получить новые данные
console.log("Заполненные данные пользователя: ", buyerModel.getBuyerData());
//валидируем
console.log("Валидация данных (данные есть): ", buyerModel.validateBuyerData());
//удаляем данные
buyerModel.clearBuyerData();
console.log("Данные пользователя после очистки: ", buyerModel.getBuyerData());

//API
console.log("ПРОВЕРКА API")
const getCatalog = async() => {
  try {
    const communicationModel = new Communication(new Api(API_URL)); //новый экземпляр класса
    const response = await communicationModel.getProducts(); //получаем данные с сервера
    productsModel.setProductsList(response.items); //берем массив товаров и устанавливаем
    console.log("Товары из каталога (через сервер):", productsModel.getProductsList()); //получаем сформированный список
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
  }
}

getCatalog();