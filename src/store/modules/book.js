import FormService from '../../MOD3-Server/FormService';

export const namespaced = true;

export const state = {
  books: [],
  bookMenu: false,
  valid: '',
  email: ''
};

export const mutations = {
  UPDATE_BOOK_MENU: (state, bookMenu) => (state.bookMenu = bookMenu),

  UPDATE_VALID: (state, valid) => (state.valid = valid),

  UPDATE_EMAIL: (state, email) => (state.email = email),

  SET_BOOKS: (state, books) => (state.books = books),

  CLOSE_BOOK_MENU: (state, close) => (state.bookMenu = close)
};

export const actions = {
  async createBook({ dispatch }, book) {
    try {
      await FormService.postBook(book);
    } catch (err) {
      if (err) throw err;
    }
    dispatch('close', false);
  },

  async getBooks({ commit }) {
    try {
      const books = await FormService.getBooks();
      commit('SET_BOOKS', books.data);
    } catch (err) {
      if (err) throw err;
    }
  },

  close: ({ commit }) => commit('CLOSE_BOOK_MENU', false),

  updateBookMenu: ({ commit }, bookMenu) =>
    commit('UPDATE_BOOK_MENU', bookMenu),

  updateValid: ({ commit }, valid) => commit('UPDATE_VALID', valid),

  updateEmail: ({ commit }, email) => commit('UPDATE_EMAIL', email)
};

export const getters = {};
