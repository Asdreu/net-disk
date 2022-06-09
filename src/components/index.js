import UploadBox from "./UploadBox.vue";
import ProgressLinear from "./ProgressLinear.vue";
import RightClickMenu from "./RightClickMenu.vue";
import FileShow from './FileShow.vue';
import FileTable from './FileTable.vue';

const components = [
  UploadBox,
  ProgressLinear,
  RightClickMenu,
  FileShow,
  FileTable
];

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
