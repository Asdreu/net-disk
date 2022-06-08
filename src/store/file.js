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
  allTimelineData: [],
  limit: 5,
  timelineData: [],
  isAllTimelineData: false,
  imageData: [],
  videoData: [],
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
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async getAllImageData({ commit }) {
    const result = await reqGetAllImageData();
    if (result.code === 800) {
      commit("GETALLIMAGEDATA", result.data);
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async getAllVideoData({ commit }) {
    const result = await reqGetAllVideoData();
    if (result.code === 800) {
      commit("GETALLVIDEODATA", result.data);
      return "OK";
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
    state.timelineData = state.allTimelineData.slice(0, state.limit);
    state.allTimelineData.splice(0, state.limit);
  },

  GETALLIMAGEDATA(state, data) {
    state.imageData = data;
  },

  GETALLVIDEODATA(state, data) {
    state.videoData = data;
  },

  addTimelineData(state) {
    if (state.allTimelineData.length < state.limit) {
      state.allTimelineData.forEach((item) => {
        state.timelineData.push(item);
      });
      state.allTimelineData.splice(0, state.allTimelineData.length);
      state.isAllTimelineData = true;
    } else {
      const temp = state.allTimelineData.slice(0, state.limit);
      temp.forEach((item) => {
        state.timelineData.push(item);
      });
      state.allTimelineData.splice(0, state.limit);
    }
  },

  handleFileUpload(state, files) {
    // timelineData 数据更改
    if (
      state.timelineData.length === 0 ||
      state.timelineData[0][0].file_time !== files[0].file_time
    ) {
      // 翻转数组是为了展示时最新上传的文件放在最前面
      state.timelineData.unshift(files.reverse());
    } else {
      state.timelineData[0].unshift(...files.reverse());
    }

    // imageData 和 videoData 数据更改
    files.forEach((file) => {
      if (/image/.test(file.file_type)) {
        state.imageData.unshift(file);
      } else {
        state.videoData.unshift(file);
      }
    });
  },

  handleFileDelete(state, fileId) {
    // imageData 和 videoData 数据更改
    for (let index in state.imageData) {
      if (state.imageData[index].file_id === fileId) {
        state.imageData.splice(index, 1);
      }
    }
    for (let index in state.videoData) {
      if (state.videoData[index].file_id === fileId) {
        state.videoData.splice(index, 1);
      }
    }

    // timelineData 数据更改
    for (let i in state.timelineData) {
      for (let j in state.timelineData[i]) {
        if (state.timelineData[i][j].file_id === fileId) {
          state.timelineData[i].splice(j, 1);
          if (state.timelineData[i].length === 0) {
            state.timelineData.splice(i, 1);
            return;
          }
        }
      }
    }
  },
};

export default {
  actions,
  mutations,
  state,
};
