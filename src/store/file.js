import {
  reqUploadChunk,
  reqUploadMiniPic,
  reqGetTimelineDataLimit,
  reqGetAllTimelineData,
  reqGetAllImageData,
  reqGetAllVideoData,
  reqDeleteFileById,
  reqDeleteFilesInBatches,
} from "../api/index.js";

const state = {
  allTimelineData: []
};

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
  },

  async getTimelineDataLimit({ commit }, params) {
    const result = await reqGetTimelineDataLimit(params);
    if (result.code === 800) {
      return result.data;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async getAllTimelineData({ commit }) {
    const result = await reqGetAllTimelineData();
    if (result.code === 800) {
      commit("GETALLTIMELINEDATA", result.data);
      return result.data;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async getAllImageData() {
    const result = await reqGetAllImageData();
    if (result.code === 800) {
      return result.data;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async getAllVideoData() {
    const result = await reqGetAllVideoData();
    if (result.code === 800) {
      return result.data;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async deleteFileById({ commit }, fileId) {
    const result = await reqDeleteFileById(fileId);
    if (result.code === 808) {
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async deleteFilesInBatches({ commit }, fileIdArr) {
    const result = await reqDeleteFilesInBatches(fileIdArr);
    if (result.code === 814) {
      // 返回批量删除成功的文件ID
      return result.data;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};

const mutations = {
  GETALLTIMELINEDATA(state, data) {
    state.allTimelineData = data;
  }
};

export default {
  actions,
  mutations,
  state,
};
