import {
  reqLogin,
  reqCheckUsername,
  reqGetQuestions,
  reqRegister,
} from "../api/index.js";
import { setToken, getToken, removeToken } from "../utils/token.js";
import { setUserInfo } from "../utils/temporary-user-info.js";
import { setFoldersInfo } from "../utils/temporary-folders-info.js";

const state = {
  token: getToken(),
  userInfo: {},
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

  quit({ commit }) {
    removeToken();
    commit("QUIT");
  },
};

const mutations = {
  LOGIN(state, data) {
    state.token = getToken();
    state.userInfo = data.user;
    state.folders = data.folders;
    // 会话存储用户信息
    setUserInfo(data.user);
    // 会话存储收藏夹信息
    setFoldersInfo(data.folders);
  },

  GETQUESTIONS(state, questions) {
    state.questions = questions;
  },

  QUIT(state) {
    state.userInfo = null;
    state.token = null;
  },

  changeIsLocked(state, status) {
    state.isLocked = status;
  },
};

export default {
  state,
  actions,
  mutations,
};
