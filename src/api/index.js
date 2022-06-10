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

export const reqGetUserQuestion = (username) => {
  return request({
    url: "/login/getuserquestion",
    method: "get",
    params: {
      user_name: username,
    },
  });
};

export const reqResetPassword = ({ username, password }) => {
  return request({
    url: "/login/resetpassword",
    method: "post",
    data: {
      user_name: username,
      user_password: password,
    },
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

export const reqUploadMiniPic = (params) => {
  return request({
    url: "/upload/completed",
    method: "post",
    data: params,
  });
};

export const reqGetTimelineDataLimit = (params) => {
  return request({
    url: "/data/getTimelineDataLimit",
    method: "get",
    params: params,
  });
};

export const reqGetAllTimelineData = () => {
  return request({
    url: "/data/getTimelineData",
    method: "get",
  });
};

export const reqGetAllImageData = () => {
  return request({
    url: "/data/getImageData",
    method: "get",
  });
};

export const reqGetAllVideoData = () => {
  return request({
    url: "/data/getvideoData",
    method: "get",
  });
};

export const reqDeleteFileById = (fileId) => {
  return request({
    url: "/data/deleteFile",
    method: "delete",
    data: {
      file_id: fileId,
    },
  });
};

export const reqDeleteFilesInBatches = (fileIdArr) => {
  return request({
    url: "/data/bulkDelete",
    method: "delete",
    data: {
      file_list: fileIdArr,
    },
  });
};
