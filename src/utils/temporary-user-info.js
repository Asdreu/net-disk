export const setUserInfo = (userInfo) => {
  // userInfo 必须是一个对象
  sessionStorage.setItem("USERINFO", JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem("USERINFO"));
};
