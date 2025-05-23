//Обʼєкт з посиланнями на ДОМ елементи

import { searchForm } from './handlers';

export const refs = {
  categories: document.querySelector('.categories'),
  products: document.querySelector('.products'),
  loadMoreButton: document.querySelector('.moreButton'),
  modal: document.querySelector('.modal'),
  modalProduct: document.querySelector('.modal-product'),
  closeModalBtn: document.querySelector('.modal__close-btn'),
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form__input'),
  searchClear: document.querySelector('.search-form__btn-clear'),
  btnAddCartModal: document.querySelector('.modal-product__btn--cart'),
  btnAddWishlistModal: document.querySelector('.modal-product__btn--wishlist'),
  navCountCart: document.querySelector('[data-cart-count]'),
  navCountWishlist: document.querySelector('[data-wishlist-count]'),
  itemsCart: document.querySelector('[data-count]'),
  totalCart: document.querySelector('[data-price]'),
  buyProductsBtn: document.querySelector('.cart-summary__btn'),
  scrollUpBtn: document.getElementById('scrollUpBtn'),
  toggleTheme: document.querySelector('[type="checkbox"]'),
};
