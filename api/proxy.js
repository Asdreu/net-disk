const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  if (!req.url.startsWith("/api")) {
    return;
  }

  const target = "https://alonepluto.info/api/cloud/v1";
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })(req, res);
};
