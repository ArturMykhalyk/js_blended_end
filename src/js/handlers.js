import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';
import {
  getProducts,
  getProductsCategory,
  getProductsId,
  getSearch,
} from './products-api';
import {
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
} from './render-function';
import { openModal } from './modal';
import { STORAGE_KEYS } from './constants';

// Універсальна функція для завантаження продуктів
async function loadProducts({ search = false, loadMore = false } = {}) {
  try {
    let products;

    if (search) {
      products = await getSearch(
        STORAGE_KEYS.getSearchWord(),
        STORAGE_KEYS.getPage()
      );
    } else if (STORAGE_KEYS.getCategory() === 'All') {
      products = await getProducts(STORAGE_KEYS.getPage());
    } else {
      products = await getProductsCategory(
        STORAGE_KEYS.getCategory(),
        STORAGE_KEYS.getPage()
      );
    }
    console.log(products);

    if (!loadMore) clearProducts();

    if (products.products.length === 0) {
      showNotFound();
      hideLoadMoreButton();
      return;
    }

    hideNotFound();
    createProducts(products.products);

    STORAGE_KEYS.setTotalPage(products.total / STORAGE_KEYS.per_Page);

    if (STORAGE_KEYS.getPage() <= STORAGE_KEYS.getTotalPage()) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      if (loadMore) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results",
          position: 'topRight',
        });
      }
    }
    STORAGE_KEYS.incrementPage();
  } catch (error) {
    console.error('Loading products error:', error);
  } finally {
    hideLoader();
  }
}

// Обробка кліку по категорії
async function handleCategoryClick(event) {
  if (!event.target.classList.contains('categories__btn')) return;

  document
    .querySelectorAll('.categories__btn')
    .forEach(btn => btn.classList.remove('categories__btn--active'));

  event.target.classList.add('categories__btn--active');
  STORAGE_KEYS.setCategory(event.target.textContent);

  hideLoadMoreButton();
  await loadProducts();
}

// Завантаження ще продуктів
async function handleMoreBtnClick() {
  showLoader();
  await loadProducts({ search: STORAGE_KEYS.isSearch(), loadMore: true });
}

// Відкриття модального вікна з деталями
async function handleProductClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) return;

  openModal();

  STORAGE_KEYS.setIdProduct(productItem.dataset.id);

  //для побажань
  if (STORAGE_KEYS.hasIdWishlist(STORAGE_KEYS.getIdProduct())) {
    refs.btnAddWishlistModal.textContent = 'Remove from Wishlist';
  } else {
    refs.btnAddWishlistModal.textContent = 'Add to Wishlist';
  }
  //для корзини
  if (STORAGE_KEYS.hasIdCart(STORAGE_KEYS.getIdProduct())) {
    refs.btnAddCartModal.textContent = 'Remove from cart';
  } else {
    refs.btnAddCartModal.textContent = 'Add to Cart';
  }
  const product = await getProductsId(STORAGE_KEYS.getIdProduct());
  createProductModal(product);
}

// Обробка форми пошуку
async function searchForm(event) {
  event.preventDefault();
  STORAGE_KEYS.setPage(1);
  const keyword = refs.searchInput.value.trim();

  if (!keyword) {
    refs.searchForm.reset();
    return iziToast.error({
      message: `The input string must not be empty.`,
      position: 'topRight',
    });
  }

  STORAGE_KEYS.setSearch(true, keyword);
  await loadProducts({ search: true });

  refs.searchForm.reset();
}

// Очистити пошук
async function searchClear() {
  STORAGE_KEYS.setSearch(false);
  refs.searchInput.value = '';

  await loadProducts();
}

function handleAddBtnCart(event) {
  if (event.target.textContent.toLowerCase().trim() === 'add to cart') {
    STORAGE_KEYS.addIdCart(STORAGE_KEYS.getIdProduct());
    STORAGE_KEYS.saveState();
    event.target.textContent = 'Remove from cart';
  } else {
    event.target.textContent = 'Add to Cart';
    STORAGE_KEYS.removeIdCart(STORAGE_KEYS._idProduct);
    STORAGE_KEYS.saveState();
  }
  updateCartCount();
}

function handleAddBtnWishlist(event) {
  if (event.target.textContent.toLowerCase().trim() === 'add to wishlist') {
    STORAGE_KEYS.addIdWishlist(STORAGE_KEYS.getIdProduct());
    STORAGE_KEYS.saveState();
    event.target.textContent = 'Remove from Wishlist';
  } else {
    event.target.textContent = 'Add to Wishlist';
    STORAGE_KEYS.removeIdWishlist(STORAGE_KEYS._idProduct);
    STORAGE_KEYS.saveState();
  }
  updateWishlistCount();
}

function handleBuyBtnCart() {
  iziToast.success({
    message: `Thank you for your order.`,
    position: 'topRight',
  });

  STORAGE_KEYS.setIdCart([]);
  STORAGE_KEYS.saveState();

  clearProducts();
  updateCartCount();
  refs.totalCart.textContent = '0';
  refs.itemsCart.textContent = '0';
  showNotFound();
}

function handleScrollUpBtn() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function handletoggleTheme() {
  if (refs.toggleTheme.checked) {
    STORAGE_KEYS.setTheme('dark');
    refs.toggleTheme.checked = true;
    STORAGE_KEYS.saveState();
  } else {
    STORAGE_KEYS.setTheme('light');
    refs.toggleTheme.checked = false;
    STORAGE_KEYS.saveState();
  }

  console.log(STORAGE_KEYS.getTheme());
}
export {
  handleCategoryClick,
  handleProductClick,
  handleMoreBtnClick,
  searchForm,
  searchClear,
  handleAddBtnCart,
  handleAddBtnWishlist,
  handleBuyBtnCart,
  handleScrollUpBtn,
  handletoggleTheme,
};
