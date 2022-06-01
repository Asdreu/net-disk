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
      endIndex = startIndex = chunkSize;

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

// TODO: 迷你图