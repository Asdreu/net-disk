import LoginBox from "./LoginBox.vue";
import ResetBox from "./ResetBox.vue";

const components = [LoginBox, ResetBox];

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
