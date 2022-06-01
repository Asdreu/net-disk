import { reqUploadChunk } from "../api/index.js";

const actions = {
  async uploadChunk({ commit }, { params, onUploadProgress }) {
    const result = await reqUploadChunk(params, onUploadProgress);
    if (result.code === 812) {
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};

const mutations = {};

const state = {};

export default {
  actions,
  mutations,
  state,
};
