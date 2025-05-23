//Логіка сторінки Cart
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
  handleBuyBtnCart,
  handletoggleTheme,
} from './js/handlers';
import { STORAGE_KEYS } from './js/constants';
import { refs } from './js/refs';
import { totalCart } from './js/helpers';

window.addEventListener('DOMContentLoaded', async () => {
  STORAGE_KEYS.restoreState();
  hideNotFound();
  showLoader();
  updateCartCount();
  updateWishlistCount();
  if (STORAGE_KEYS.getTheme() === 'dark') {
    refs.toggleTheme.checked = true;
  }

  if (STORAGE_KEYS.getIdCart().length === 0) {
    showNotFound();
  }
  const promisseCart = STORAGE_KEYS.getIdCart().map(elem =>
    getProductsId(elem)
  );

  const product = await Promise.all(promisseCart);

  createProducts(product);

  refs.totalCart.textContent = totalCart(product);
  refs.itemsCart.textContent = product.length;

  hideLoader();
});

window.addEventListener('beforeunload', () => {
  STORAGE_KEYS.saveState();
});

refs.products.addEventListener('click', handleProductClick);
refs.btnAddCartModal.addEventListener('click', handleAddBtnCart);
refs.btnAddWishlistModal.addEventListener('click', handleAddBtnWishlist);
refs.buyProductsBtn.addEventListener('click', handleBuyBtnCart);
refs.toggleTheme.addEventListener('change', handletoggleTheme);
