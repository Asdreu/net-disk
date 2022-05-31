import LoginBox from "./LoginBox.vue";
import RegisterBox from './RegisterBox.vue';
import ResetBox from "./ResetBox.vue";

const components = [LoginBox, RegisterBox, ResetBox];

const install = function (Vue) {
  if (install.installed) {
    return;
  }

  // 全局注册组件
  components.forEach((item) => {
    Vue.component(item.name, item);
  });
};

export default {
  install,
};
