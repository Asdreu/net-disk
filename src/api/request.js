import axios from "axios";
import router from "@/router/index.js";
import store from "@/store/index.js";

const requests = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000,
});

requests.interceptors.request.use(
  (config) => {
    config.headers.SecretKey = process.env.VUE_APP_SECRET_KEY;
    if (/login/.test(config.url)) {
      return config;
    } else {
      config.headers.authorization = store.state.user.token;
      return config;
    }
  },
  (err) => {
    console.log(err);
  }
);

requests.interceptors.response.use(
  (res) => {
    if ([805, 806, 822, 823].includes(res.data.code)) {
      // 无法验证 Token, 跳转到登录页面
      router.replace({
        path: "/login",
      });
    }
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default requests;
