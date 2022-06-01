const state = {
  snackbar: false,
  snackbarTimeout: 2000,
  snackbarColor: "",
  snackbarText: "",
};

const mutations = {
  alterSnackbar(state, data) {
    state.snackbar = true;
    state.snackbarColor = data.color;
    state.snackbarText = data.text;
  },
};

export default {
  mutations,
  state,
};
