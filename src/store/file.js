import { reqUploadChunk, reqUploadMiniPic } from "../api/index.js";

const actions = {
  async uploadChunk({ commit }, { params, onUploadProgress }) {
    const result = await reqUploadChunk(params, onUploadProgress);
    if (result.code === 812) {
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async uploadMiniPic({ commit }, params) {
    const result = await reqUploadMiniPic(params);
    if (result.code === 808) {
      return result.data;
    } else {
      return Promise.reject(new Error(result.message));
    }
  }
};

const mutations = {};

const state = {};

export default {
  actions,
  mutations,
  state,
};
