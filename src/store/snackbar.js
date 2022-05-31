const mutations = {
  alterSnackbar(state, data) {
    state.snackbar = true;
    state.snackbarColor = data.color;
    state.snackbarText = data.text;
  },
};

const state = {
  snackbar: false,
  snackbarTimeout: 3000,
  snackbarColor: "",
  snackbarText: "",
};

export default {
  mutations,
  state,
};
