import LoginBox from "./LoginBox.vue";
import RegisterBox from "./RegisterBox.vue";
import ResetBox from "./ResetBox.vue";
import UploadBox from "./UploadBox.vue";
import ProgressLinear from "./ProgressLinear.vue";

const components = [LoginBox, RegisterBox, ResetBox, UploadBox, ProgressLinear];

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
