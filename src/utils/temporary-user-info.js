export const setUserInfo = (userInfo) => {
  sessionStorage.setItem("USERINFO", JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem("USERINFO"));
};
