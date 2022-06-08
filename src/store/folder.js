import { getFoldersInfo } from "../utils/temporary-folders-info.js";

const state = {
  folders: [],
};

const actions = {};

const mutations = {
  getFoldersInfo(state) {
    state.folders = getFoldersInfo();
  },
};

export default {
  state,
  actions,
  mutations,
};
