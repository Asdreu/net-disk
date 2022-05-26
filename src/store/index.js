import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    folders: [],
    snackbar: false,
    snackbarTimeout: 2000,
    snackbarColor: "grey darken-4",
    snackbarText: "fucking you",
    lockStatus: "close",
  },
  actions: {},
  mutations: {},
});
