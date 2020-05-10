import moment from 'moment';

export const namespaced = true;

export const state = {
  time: '',
  userTime: '',
  timeMenu: false
};

export const mutations = {
  UPDATE_TIME(state, time) {
    state.time = time;
  },

  UPDATE_USER_TIME(state, userTime) {
    state.userTime = userTime;
  },

  UPDATE_TIME_MENU(state, timeMenu) {
    state.timeMenu = timeMenu;
  },

  SET_TIME(state, time) {
    state.userTime = time;
  },

  CLOSE_TIME_MENU(state, close) {
    state.timeMenu = close;
  }
};

export const actions = {
  submitTime({ commit, getters }) {
    commit('SET_TIME', getters.formatTimeInput);
    commit('CLOSE_TIME_MENU', false);
    // this.$emit('endTimeSent', this.userTime);
  },

  updateTime({ commit }, time) {
    commit('UPDATE_TIME', time);
  },

  updateUserTime({ commit }, userTime) {
    commit('UPDATE_USER_TIME', userTime);
  },

  updateTimeMenu({ commit }, timeMenu) {
    commit('UPDATE_TIME_MENU', timeMenu);
  }
};

export const getters = {
  formatTimeInput: (state) => moment(state.time, 'hh:mm').format('h:mm A')
};
