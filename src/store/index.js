import Vue from 'vue';
import Vuex from 'vuex';

import * as book from '../store/modules/book';
import * as contact from '../store/modules/contact';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book,
    contact
  }
});
