import request from "./request.js";
import SparkMD5 from "spark-md5";

export const reqLogin = (userName, password) => {
  return request({
    url: "/login/login",
    method: "post",
    data: {
      user_name: userName,
      user_password: SparkMD5.hash(password),
    },
  });
};
