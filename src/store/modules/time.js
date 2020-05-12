import moment from 'moment';

export const namespaced = true;

export const state = {
  timeStart: '',
  timeEnd: '',
  startTime: '',
  endTime: '',
  timeMenuStart: false,
  timeMenuEnd: false
};

export const mutations = {
  UPDATE_TIME_START: (state, timeStart) => (state.timeStart = timeStart),
  UPDATE_TIME_END: (state, timeEnd) => (state.timeEnd = timeEnd),

  UPDATE_START_TIME: (state, startTime) => (state.timeStart = startTime),
  UPDATE_END_TIME: (state, endTime) => (state.timeEnd = endTime),

  UPDATE_TIME_MENU_START: (state, timeMenuStart) =>
    (state.timeMenuStart = timeMenuStart),
  UPDATE_TIME_MENU_END: (state, timeMenuEnd) =>
    (state.timeMenuEnd = timeMenuEnd),

  SET_START_TIME: (state, timeStart) => (state.startTime = timeStart),
  SET_END_TIME: (state, timeEnd) => (state.endTime = timeEnd),

  CLOSE_TIME_MENU_START: (state, close) => (state.timeMenuStart = close),
  CLOSE_TIME_MENU_END: (state, close) => (state.timeMenuEnd = close)
};

export const actions = {
  submitStartTime({ commit, getters }) {
    commit('SET_START_TIME', getters.formatTimeStart);
    commit('CLOSE_TIME_MENU_START', false);
  },

  submitEndTime({ commit, getters }) {
    commit('SET_END_TIME', getters.formatTimeEnd);
    commit('CLOSE_TIME_MENU_END', false);
  },

  updateTimeStart: ({ commit }, timeStart) =>
    commit('UPDATE_TIME_START', timeStart),

  updateTimeEnd: ({ commit }, timeEnd) => commit('UPDATE_TIME_END', timeEnd),

  updateStartTime: ({ commit }, startTime) =>
    commit('UPDATE_START_TIME', startTime),

  updateEndTime: ({ commit }, endTime) => commit('UPDATE_END_TIME', endTime),

  updateTimeMenuStart: ({ commit }, timeMenuStart) =>
    commit('UPDATE_TIME_MENU_START', timeMenuStart),

  updateTimeMenuEnd: ({ commit }, timeMenuEnd) =>
    commit('UPDATE_TIME_MENU_END', timeMenuEnd)
};

export const getters = {
  formatTimeStart: (state) => moment(state.timeStart, 'hh:mm').format('h:mm A'),
  formatTimeEnd: (state) => moment(state.timeEnd, 'hh:mm').format('h:mm A')
};
