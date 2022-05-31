import {
  reqLogin,
  reqCheckUsername,
  reqGetQuestions,
  reqRegister,
} from "../api/index.js";
import { setToken, getToken } from "../utils/token.js";

const state = {
  token: getToken(),
  user: {},
  folders: [],
  questions: [],
  isLocked: false,
};

const actions = {
  async login({ commit }, { username, password }) {
    const result = await reqLogin(username, password);
    if (result.code === 802) {
      // 登录成功
      setToken(result.data.token);
      commit("LOGIN", result.data);
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async checkUsername(context, username) {
    const result = await reqCheckUsername(username);
    console.log(result);
    if (result.code === 810) {
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async getQuestions({ commit }) {
    const result = await reqGetQuestions();
    if (result.code === 800) {
      commit("GETQUESTIONS", result.data);
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async register(context, params) {
    const result = await reqRegister(params);
    if (result.code === 820) {
      return result.message;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};

const mutations = {
  LOGIN(state, data) {
    state.token = getToken();
    state.user = data.user;
    state.folders = data.folders;
  },

  GETQUESTIONS(state, questions) {
    state.questions = questions;
  },
};

export default {
  state,
  actions,
  mutations,
};
