import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { formatFileSize } from "./utils/file-processing.js";
import "@/assets/style/base.scss";

Vue.config.productionTip = false;

import components from "@/components/index.js";
Vue.use(components);
Vue.filter("fileSizeFormat", formatFileSize);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
