//Логіка сторінки Wishlist
import { getProductsId } from './js/products-api';
import {
  createProducts,
  showLoader,
  hideLoader,
  updateCartCount,
  updateWishlistCount,
  showNotFound,
  hideNotFound,
} from './js/render-function';
import {
  handleProductClick,
  handleAddBtnCart,
  handleAddBtnWishlist,
  handletoggleTheme,
} from './js/handlers';
import { STORAGE_KEYS } from './js/constants';
import { refs } from './js/refs';

window.addEventListener('DOMContentLoaded', async () => {
  STORAGE_KEYS.restoreState();
  hideNotFound();
  showLoader();
  updateCartCount();
  updateWishlistCount();
  if (STORAGE_KEYS.getTheme() === 'dark') {
    refs.toggleTheme.checked = true;
  }

  if (STORAGE_KEYS.getIdWishlist().length === 0) {
    showNotFound();
  }
  const promisseWichlist = STORAGE_KEYS.getIdWishlist().map(elem =>
    getProductsId(elem)
  );

  const product = await Promise.all(promisseWichlist);
  createProducts(product);
  hideLoader();
});

window.addEventListener('beforeunload', () => {
  STORAGE_KEYS.saveState();
});

refs.products.addEventListener('click', handleProductClick);
refs.btnAddCartModal.addEventListener('click', handleAddBtnCart);
refs.btnAddWishlistModal.addEventListener('click', handleAddBtnWishlist);
refs.toggleTheme.addEventListener('change', handletoggleTheme);
