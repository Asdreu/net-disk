export const setFoldersInfo = (folders) => {
  sessionStorage.setItem("FOLDERS", JSON.stringify(folders));
};

export const getFoldersInfo = () => {
  return JSON.parse(sessionStorage.getItem("FOLDERS"));
};

export const removeFoldersInfo = () => {
  sessionStorage.removeItem("FOLDERS");
};
