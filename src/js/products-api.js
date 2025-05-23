// Функції для роботи з бекендом
import axios from 'axios';

import { STORAGE_KEYS } from './constants';
STORAGE_KEYS.restoreState();
async function getCategories() {
  const response = await axios.get(`${STORAGE_KEYS.productsAPI}/category-list`);
  return response.data;
}

async function getProducts(currentPage) {
  const url = `${STORAGE_KEYS.productsAPI}?limit=${
    STORAGE_KEYS.per_Page
  }&skip=${(currentPage - 1) * STORAGE_KEYS.per_Page}`;
  const response = await axios.get(url);
  return response.data;
}

async function getProductsCategory(categorie, currentPage) {
  const url = `${STORAGE_KEYS.productsAPI}/category/${categorie}?limit=${
    STORAGE_KEYS.per_Page
  }&skip=${(currentPage - 1) * STORAGE_KEYS.per_Page}`;
  const response = await axios.get(url);
  return response.data;
}
async function getProductsId(id) {
  const url = `${STORAGE_KEYS.productsAPI}/${id}`;
  const response = await axios.get(url);
  return response.data;
}

async function getSearch(searchWord, currentPage) {
  const url = `${STORAGE_KEYS.productsAPI}/search?limit=${
    STORAGE_KEYS.per_Page
  }&q=${searchWord}&skip=${(currentPage - 1) * STORAGE_KEYS.per_Page}`;
  const response = await axios.get(url);
  return response.data;
}

export {
  getCategories,
  getProducts,
  getProductsCategory,
  getProductsId,
  getSearch,
};
