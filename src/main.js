import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'
import "@/assets/style/base.scss";

Vue.config.productionTip = false;

import components from '@/components/index.js';
Vue.use(components);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
