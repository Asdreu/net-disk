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

export const reqCheckUsername = (username) => {
  return request({
    url: "/login/checkname",
    method: "post",
    data: {
      user_name: username,
    },
  });
};

export const reqGetQuestions = () => {
  return request({
    url: "/login/getquestions",
    method: "get",
  });
};

export const reqRegister = (params) => {
  return request({
    url: "/login/signin",
    method: "post",
    data: params
  });
}