const state = {
  snackbar: false,
  snackbarTimeout: 1500,
  snackbarColor: "",
  snackbarText: "",
  btnColor: "",
};

const mutations = {
  alterSnackbar(state, data) {
    state.snackbar = true;
    state.snackbarText = data.text;
    if (data.color === "error") {
      state.snackbarColor = "red accent-2";
      state.btnColor = "blue lighten-5";
    } else {
      state.snackbarColor = "grey darken-3";
      state.btnColor = "blue";
    }
  },
};

export default {
  mutations,
  state,
};
