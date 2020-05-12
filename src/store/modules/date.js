import moment from 'moment';

export const namespaced = true;

export const state = {
  date: '',
  userDate: moment().format('YYYY-MM-DD'),
  dates: [],
  dateMenu: false,
  isBusy: []
};

export const mutations = {
  UPDATE_DATE: (state, date) => (state.date = date),

  UPDATE_USER_DATE: (state, userDate) => (state.userDate = userDate),

  UPDATE_DATE_MENU: (state, dateMenu) => (state.dateMenu = dateMenu),

  SET_DATE: (state, input) => (state.date = input),

  SET_DATES: (state, bookDate) => state.dates.push(bookDate),

  CLOSE_DATE_MENU: (state, close) => (state.dateMenu = close),

  SET_BOOK_RANGE: (state, bookRange) => (state.bookRange = bookRange),

  IS_BUSY: (state, isBusy) => state.isBusy.push(isBusy)
};

export const actions = {
  async submitDate({ commit, dispatch }, input) {
    commit('SET_DATE', moment(input, 'YYYY-MM-DD').format('MM/DD/YYYY'));

    dispatch('close', false);
  },

  async getBookDates({ commit, dispatch, rootState }) {
    let books = rootState.book.books;

    if (books) {
      return books.forEach((book) => {
        console.log(book.date);
        commit('SET_DATES', book.date);
      });
    }

    try {
      books = await dispatch('book/getBooks', null, { root: true });
    } catch (err) {
      console.log('error: ' + err.message);
    }
  },

  availability({ commit, rootState }, availabilityTimes) {
    let date = moment(state.date, 'MM/DD/YYYY').format('YYYY-MM-DD');
    let books = rootState.book.books;
    let bookRange = [];

    books.forEach((book) => {
      if (date === book.date) {
        bookRange.push(
          `${moment(book.startTime).format('hh:mm A')} - ${moment(
            book.endTime
          ).format('hh:mm A')}`
        );
      }
    });

    availabilityTimes.forEach((availabileTime) => {
      bookRange.forEach((bookTime) => {
        if (availabileTime === bookTime) {
          return commit('IS_BUSY', true);
        }
      });
      return commit('IS_BUSY', false);
    });
  },

  updateDate: ({ commit }, date) => commit('UPDATE_DATE', date),

  updateUserDate: ({ commit }, userDate) =>
    commit('UPDATE_USER_DATE', userDate),

  updateDateMenu: ({ commit }, dateMenu) =>
    commit('UPDATE_DATE_MENU', dateMenu),

  close: ({ commit }) => commit('CLOSE_DATE_MENU', false)
};

export const getters = {};
