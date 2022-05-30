import Vue from "vue";
import Vuex from "vuex";
import router from '../router/index.js';
import { reqLogin } from "../api/index.js";
import { setToken, getToken } from "../utils/token.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken(),
    user: {},
    folders: [],
    snackbar: false,
    snackbarTimeout: 2000,
    snackbarColor: "",
    snackbarText: "",
    lockStatus: "close",
  },

  actions: {
    async login({ commit }, { username, password }) {
      let result = await reqLogin(username, password);
      console.log(result);
      switch (result.code) {
        case 802:
          // 登录成功
          setToken(result.data.token);
          commit("LOGIN", result.data);
          router.push("/home");
          commit("alterSnackbar", {
            color: "success",
            text: "Welcome to net-disk."
          });
          return "OK";
        case 803:
          // 用户不存在
          commit("alterSnackbar", {
            color: "error",
            text: "User does not exist, please register first."
          });
          return "User does not exist.";
        case 804:
          // 密码错误
          commit("alterSnackbar", {
            color: "error",
            text: "Password is not true."
          })
          return "Password is not true.";
        case 822:
          // SecretKey 过期
          commit("alterSnackbar", {
            color: "error",
            text: "SecretKey expires."
          })
          return "SecretKey expires.";
        default:
          return Promise.reject(new Error("Unknown error"));
      }
    },
  },

  mutations: {
    alterSnackbar(state, data) {
      state.snackbar = true;
      state.snackbarColor = data.color;
      state.snackbarText = data.text;
    },

    LOGIN(state, data) {
      state.token = getToken();
      state.user = data.user;
      state.folders = data.folders;
    },
  },
});
