//Функцію для створення, рендеру або видалення розмітки

import { refs } from './refs';
// swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Zoom } from 'swiper/modules';
import { STORAGE_KEYS } from './constants';

function createCategories(categories) {
  categories.unshift('All');
  const markup = categories

    .map(
      categories => `<li class="categories__item">
          <button class="categories__btn" type="button">${categories}</button>
        </li>`
    )
    .join('');

  refs.categories.insertAdjacentHTML('beforeend', markup);
}

function createProducts(products) {
  const markup = products

    .map(
      ({ id, title, brand, category, description, price, images }) => `
      <li class="products__item" data-id="${id}">
        <img class="products__image"  src="${images[0]}" alt="${description}" />
        <p class="products__title">${title}</p>
        <p class="products__brand">
          <span class="products__brand--bold">Brand:${
            brand ? brand : ' no brand'
          }</span>
        </p>
        <p class="products__category">Category: ${category}</p>
        <p class="products__price">Price: ${price}$</p>
      </li>`
    )
    .join('');

  refs.products.insertAdjacentHTML('beforeend', markup);
}

function createProductModal({
  title,
  description,
  price,
  images,
  returnPolicy,
  shippingInformation,
  tags,
}) {
  const tagsMarkup = tags
    .map(tag => `<li class="modal-product__tag">${tag}</li>`)
    .join('');
  const loopEnable = images.length > 1;
  const imagesSlides = images
    .map(
      image => `
        <div class="swiper-slide">
          <div class="swiper-zoom-container">
          <img class="modal-product__img" src="${image}" alt="${description}" />
        </div>   
        </div>`
    )
    .join('');
  const markup = `
        <div class="swiper modal-product__slider">
      <div class="swiper-wrapper">
        ${imagesSlides}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tagsMarkup}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping:${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`;

  refs.modalProduct.innerHTML = markup;

  new Swiper('.modal-product__slider', {
    modules: [Navigation, Pagination, Autoplay, Zoom],
    loop: loopEnable,
    zoom: {
      maxRatio: 3,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });
}

function clearProducts() {
  refs.products.innerHTML = '';
}
function showNotFound() {
  document.querySelector('.not-found').classList.add('not-found--visible');
}

//  Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає
function hideNotFound() {
  document.querySelector('.not-found').classList.remove('not-found--visible');
}
//  Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
function showLoader() {
  document.querySelector('.loader').classList.add('visible');
}
//  Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає
function hideLoader() {
  document.querySelector('.loader').classList.remove('visible');
}
function showLoadMoreButton() {
  document.querySelector('.moreButton').classList.add('visible');
}
function hideLoadMoreButton() {
  document.querySelector('.moreButton').classList.remove('visible');
}

function updateCartCount() {
  refs.navCountCart.textContent = STORAGE_KEYS._idCart.length;
}

function updateWishlistCount() {
  refs.navCountWishlist.textContent = STORAGE_KEYS._idWishlist.length;
}

export {
  createCategories,
  createProducts,
  clearProducts,
  showNotFound,
  hideNotFound,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  createProductModal,
  updateCartCount,
  updateWishlistCount,
};
