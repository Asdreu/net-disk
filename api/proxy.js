import { createProxyMiddleware } from "http-proxy-middleware";

export default function handler(req, res) {
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
}
