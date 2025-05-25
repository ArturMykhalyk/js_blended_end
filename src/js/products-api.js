// Функції для роботи з бекендом
import axios from 'axios';

import { STORAGE_KEYS } from './constants';

STORAGE_KEYS.restoreState();

export async function getCategories() {
  const baseUrl = STORAGE_KEYS.productsAPI;
  const endPoint = '/category-list';
  const url = baseUrl + endPoint;

  const response = await axios.get(url);
  return response.data;
}

export async function getProducts(currentPage) {
  const baseUrl = STORAGE_KEYS.productsAPI;
  const endPoint = '';
  const url = baseUrl + endPoint;

  const params = {
    skip: (currentPage - 1) * STORAGE_KEYS.per_Page,
    limit: STORAGE_KEYS.per_Page,
  };
  console.log(params.page);
  const response = await axios.get(url, { params });
  return response.data;
}

export async function getProductsCategory(categorie, currentPage) {
  const baseUrl = STORAGE_KEYS.productsAPI;
  const endPoint = `/category/${categorie}`;
  const url = baseUrl + endPoint;

  const params = {
    skip: (currentPage - 1) * STORAGE_KEYS.per_Page,
    limit: STORAGE_KEYS.per_Page,
  };
  console.log(params.page);
  const response = await axios.get(url, { params });
  return response.data;
}

export async function getProductsId(id) {
  const baseUrl = STORAGE_KEYS.productsAPI;
  const endPoint = `/${id}`;
  const url = baseUrl + endPoint;

  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
}

export async function getSearch(searchWord, currentPage) {
  const baseUrl = STORAGE_KEYS.productsAPI;
  const endPoint = `/search`;
  const url = baseUrl + endPoint;

  const params = {
    q: searchWord,
    skip: (currentPage - 1) * STORAGE_KEYS.per_Page,
    limit: STORAGE_KEYS.per_Page,
  };

  const response = await axios.get(url, { params });
  return response.data;
}
