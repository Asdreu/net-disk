const url =
  process.env.NODE_ENV === "development"
    ? "https://alonepluto.info/api/cloud/v1"
    : "http://127.0.0.1:8081";

module.exports = {
  // publicPath: "./",
  lintOnSave: false,
  productionSourceMap: false,

  devServer: {
    // 开发环境代理服务器
    proxy: {
      api: {
        target: url,
        // 是否改变传递给目标服务器的自身端口信息
        changeOrigin: true,
        // 代理服务器转发时路径去除 api, 替代为' '(空)
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  transpileDependencies: ["vuetify"],
};
