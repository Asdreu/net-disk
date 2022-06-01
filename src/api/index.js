import request from "./request.js";

export const reqLogin = (username, password) => {
  return request({
    url: "/login/login",
    method: "post",
    data: {
      user_name: username,
      user_password: password,
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
    data: params,
  });
};

export const reqUploadChunk = (params, onUploadProgress) => {
  return request({
    url: "/upload/upload",
    method: "post",
    data: params,
    onUploadProgress: onUploadProgress,
  });
};
