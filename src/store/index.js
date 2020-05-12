import Vue from 'vue';
import Vuex from 'vuex';

import * as book from '../store/modules/book';
import * as contact from '../store/modules/contact';
import * as time from '../store/modules/time';
import * as date from '../store/modules/date';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book,
    contact,
    time,
    date
  }
});
