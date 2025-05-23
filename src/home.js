//Логіка сторінки Home
import { getCategories, getProducts } from './js/products-api';
import {
  createCategories,
  createProducts,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  updateCartCount,
  updateWishlistCount,
} from './js/render-function';
import {
  handleCategoryClick,
  handleProductClick,
  handleMoreBtnClick,
  searchForm,
  searchClear,
  handleAddBtnCart,
  handleAddBtnWishlist,
  handleScrollUpBtn,
  handletoggleTheme,
} from './js/handlers';
import { STORAGE_KEYS } from './js/constants';
import { refs } from './js/refs';

refs.categories.addEventListener('click', handleCategoryClick);
refs.products.addEventListener('click', handleProductClick);
refs.loadMoreButton.addEventListener('click', handleMoreBtnClick);
refs.searchForm.addEventListener('submit', searchForm);
refs.searchClear.addEventListener('click', searchClear);
refs.btnAddCartModal.addEventListener('click', handleAddBtnCart);
refs.btnAddWishlistModal.addEventListener('click', handleAddBtnWishlist);
refs.scrollUpBtn.addEventListener('click', handleScrollUpBtn);
refs.toggleTheme.addEventListener('change', handletoggleTheme);

window.addEventListener('DOMContentLoaded', () => {
  STORAGE_KEYS.restoreState();

  showLoader();
  updateCartCount();
  updateWishlistCount();
  if (STORAGE_KEYS.getTheme() === 'dark') {
    refs.toggleTheme.checked = true;
  }

  getCategories()
    .then(categories => {
      createCategories(categories);
    })
    .catch(error => console.log('categories', error));

  getProducts(STORAGE_KEYS._page)
    .then(products => {
      hideLoader();
      createProducts(products.products);
      STORAGE_KEYS._totalPage = products.total / STORAGE_KEYS.per_Page;
      if (STORAGE_KEYS._totalPage > 1) {
        showLoadMoreButton();
        STORAGE_KEYS.incrementPage();
      }
    })
    .catch(error => console.log('products', error));
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollUpBtn.style.display = 'block';
  } else {
    scrollUpBtn.style.display = 'none';
  }
});

window.addEventListener('beforeunload', () => {
  STORAGE_KEYS.saveState();
});
