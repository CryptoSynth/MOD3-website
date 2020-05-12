import FormService from '../../MOD3-Server/FormService';

export const namespaced = true;

export const state = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  valid: true,
  contactMenu: false
};

export const mutations = {
  UPDATE_FIRST_NAME: (state, firstName) => (state.firstName = firstName),

  UPDATE_LAST_NAME: (state, lastName) => (state.lastName = lastName),

  UPDATE_EMAIL: (state, email) => (state.email = email),

  UPDATE_PHONE: (state, phone) => (state.phone = phone),

  UPDATE_MESSAGE: (state, message) => (state.message = message),

  UPDATE_VALID: (state, valid) => (state.valid = valid),

  UPDATE_CONTACT_MENU: (state, contactMenu) =>
    (state.contactMenu = contactMenu),

  CLOSE_CONTACT_MENU: (state, close) => (state.contactMenu = close)
};

export const actions = {
  async createContact({ dispatch }, contact) {
    try {
      await FormService.postContact(contact);
      dispatch('close', false);
    } catch (err) {
      if (err) throw err;
    }
  },

  close: ({ commit }) => commit('CLOSE_CONTACT_MENU', false),

  updateFirstName: ({ commit }, firstName) =>
    commit('UPDATE_FIRST_NAME', firstName),

  updateLastName: ({ commit }, lastName) =>
    commit('UPDATE_LAST_NAME', lastName),

  updateEmail: ({ commit }, email) => commit('UPDATE_EMAIL', email),

  updatePhone: ({ commit }, phone) => commit('UPDATE_PHONE', phone),

  updateMessage: ({ commit }, message) => commit('UPDATE_MESSAGE', message),

  updateValid: ({ commit }, valid) => commit('UPDATE_VALID', valid),

  updateContactMenu: ({ commit }, contactMenu) =>
    commit('UPDATE_CONTACT_MENU', contactMenu)
};
export const getters = {};
