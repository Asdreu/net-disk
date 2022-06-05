export const cutBlob = (file) => {
  // 浏览器兼容
  const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;

  // 切片大小
  const chunkSize = 2 * 1024 * 1024;
  // 切片数量
  const chunkNum = Math.ceil(file.size / chunkSize);
  // 切片数组
  let chunkArr = [];

  let [startIndex, endIndex, chunk] = [0, 0, undefined];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < chunkNum; i++) {
      startIndex = i * chunkSize;
      endIndex = startIndex + chunkSize;

      endIndex > file.size && (endIndex = file.size);

      chunk = blobSlice.call(file, startIndex, endIndex);
      chunkArr.push(chunk);
    }
    resolve({
      chunkArr,
      fileInfo: {
        total: chunkNum,
        name: file.name,
        size: file.size,
        type: file.type,
        suffixName: file.name.split(".")[1],
      },
    });
  });
};

export const makeMini = async (file) => {
  const url = URL.createObjectURL(file);
  if (/image/.test(file.type)) {
    // 制作图片迷你图
    function makeMiniPic() {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          const canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 200 * (height / width);
          canvas
            .getContext("2d")
            .drawImage(img, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL("image/png");
          resolve(base64);
        };
      });
    }
    const result = await makeMiniPic();
    return result;
  } else if (/video/.test(file.type)) {
    function makeMiniPic() {
      return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.src = url;
        video.onloadeddata = () => {
          const width = video.videoWidth;
          const height = video.videoHeight;

          const canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 200 * (height / width);
          canvas
            .getContext("2d")
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL("image/png");
          resolve(base64);
        };
      });
    }
    const result = await makeMiniPic();
    return result;
  }
};

export const formatFileSize = (value) => {
  const size = Number(value);
  const unit = 1024 * 1024;
  const a = size / unit;
  const b = a + "";
  if (b.indexOf(".") === -1) {
    return a;
  } else {
    return a.toFixed(2);
  }
}