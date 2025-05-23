//Константи

export const STORAGE_KEYS = {
  productsAPI: 'https://dummyjson.com/products',
  per_Page: 12,
  _idProduct: 0,
  _idCart: [],
  _idWishlist: [],
  _category: 'All',
  _page: 1,
  _search: false,
  _searchWord: '',
  _totalPage: 1,
  _theme: 'light',
  getTheme() {
    return this._theme;
  },
  setTheme(value) {
    this._theme = value;
  },
  setIdCart(value) {
    this._idCart = value;
  },
  addIdCart(value) {
    this._idCart.push(value);
  },

  getIdCart() {
    return this._idCart;
  },
  removeIdCart(value) {
    this._idCart = this._idCart.filter(item => item !== value);
  },

  setIdWishlist(value) {
    this._idWishlist = value;
  },
  addIdWishlist(value) {
    this._idWishlist.push(value);
  },

  getIdWishlist() {
    return this._idWishlist;
  },
  removeIdWishlist(value) {
    this._idWishlist = this._idWishlist.filter(item => item !== value);
  },
  hasIdWishlist(value) {
    return this._idWishlist.includes(value);
  },
  hasIdCart(value) {
    return this._idCart.includes(value);
  },
  setIdProduct(value) {
    this._idProduct = value;
  },
  getIdProduct() {
    return this._idProduct;
  },
  setCategory(value) {
    this._category = value;
    this._page = 1;
  },
  getCategory() {
    return this._category;
  },

  setPage(value) {
    this._page = value;
  },
  getPage() {
    return this._page;
  },

  incrementPage() {
    this._page++;
  },

  setSearch(flag, word = '') {
    this._search = flag;
    this._searchWord = word;
    this._page = 1;
  },
  isSearch() {
    return this._search;
  },
  getSearchWord() {
    return this._searchWord;
  },

  setTotalPage(value) {
    this._totalPage = value;
  },
  getTotalPage() {
    return this._totalPage;
  },

  saveState() {
    const state = {
      idCart: this._idCart,
      idWishlist: this._idWishlist,
      theme: this._theme,
    };
    localStorage.setItem('cart', JSON.stringify(state));
  },

  restoreState() {
    const state = JSON.parse(localStorage.getItem('cart'));
    if (state) {
      this._theme = state.theme;
      this._idCart = Array.isArray(state.idCart) ? state.idCart : [];
      this._idWishlist = Array.isArray(state.idWishlist)
        ? state.idWishlist
        : [];
    }
  },
};
