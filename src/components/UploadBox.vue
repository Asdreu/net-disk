<template>
  <div class="upload-area">
    <v-btn @click="addFiles" fab color="orange darken-1">
      <span v-if="uploading" class="white--text"
        >{{ completedNum }}/{{ files.length }}</span
      >
      <v-icon v-else large color="white">mdi-plus</v-icon>
    </v-btn>
    <v-file-input
      id="file-input"
      v-model="files"
      style="display: none"
      multiple
      accept="image/*,video/*"
      @change="hasDialog = true"
    ></v-file-input>
    <v-dialog v-model="hasDialog" width="800">
      <div class="white py-3 d-flex justify-center align-center">
        <span class="text-h4 font-weight-bold">上传列表</span>
      </div>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(file, index) of files"
            :key="file.name"
            color="orange darken-1"
          >
            <div
              class="file d-flex justify-space-between align-center"
              :style="{
                background: completedFileName.includes(file.name)
                  ? 'linear-gradient(to right, #6aa0fc, #2962ff)'
                  : '',
              }"
            >
              <span>{{ index + 1 }}.{{ file.name }}</span>
              <v-icon @click="deleteFile(index)">mdi-close</v-icon>
            </div>
            <!-- <v-progress-linear
              :complated="percentage"
              :active="file.name === currentFile.name ? true : false"
            ></v-progress-linear> -->
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div bottom d-flex justify-center align-center py-2>
        <template v-if="!uploading">
          <v-btn @click="cancelUpload" class="mr-12" width="150" elevation="0"
            >取消</v-btn
          >
          <v-btn
            @click="upload"
            class="ml-12"
            width="150"
            color="orange"
            elevation="0"
            >开始上传</v-btn
          >
        </template>
        <template v-else>
          <v-btn @click="hasDialog = false" width="150" elevation="0"
            >后台运行</v-btn
          >
        </template>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import { cutBlob } from "../utils/file-processing.js";

export default {
  name: "UploadBox",
  props: {
    userId: String,
  },
  data() {
    return {
      // 同步文件数据
      files: [],
      // 上传状态
      uploading: false,
      // 是否弹出对话框
      hasDialog: false,
      // 文件夹hash
      hash: SparkMD5.hash(this.userId),
      // 已完成上传的文件数量
      completedNum: 0,
      // 已成功上传的文件
      completedFiles: [],
      // 已成功上传的文件的文件名
      completedFileName: [],
      // 当前正在上传的文件
      currentFile: {},
      // 当前正在上传的文件已上传的大小
      currentFileLoaded: 0,
      // 上传百分比
      percentage: 0,
    };
  },
  watch: {
    files: {
      handler(newVal) {
        if (newVal.length === 0) {
          this.hasDialog = false;
        }
      },
    },
  },
  methods: {
    addFiles() {
      if (this.uploading) {
        this.hasDialog = true;
        return;
      }
      document.getElementById("file-input").click();
    },

    deleteFile(index) {
      this.files.splice(index, 1);
    },

    cancelUpload() {
      this.files = [];
    },

    async upload() {
      this.uploading = true;
      for (let file of this.files) {
        this.currentFile = file;

        // 进行切片
        let chunks = await cutBlob(file);

        let promiseArr = chunks.chunkArr.map((chunk, index) => {
          return new Promise(async (resolve, reject) => {
            // 参数使用 FromData 格式
            let params = new FormData();
            params.append("hash", this.hash);
            params.append("chunk", chunk);
            params.append("index", index);

            // 上传处理进度事件
            // TODO: 不明白上传进度处理事件
            let lastLoaded = 0;
            const onUploadProgress = (progressEvent) => {
              this.currentFileLoaded += progressEvent.loaded - lastLoaded;
              this.percentage = Math.floor(
                (this.currentFileLoaded / file.size) * 100
              );
              if (progressEvent.loaded == progressEvent.total) {
                lastLoaded = 0;
              } else {
                lastLoaded = progressEvent.loaded;
              }
            };
            try {
              await this.$store.dispatch("uploadChunk", {
                params,
                onUploadProgress,
              });
              resolve();
            } catch (error) {
              console.log(error.message);
              reject();
            }
          });
        });

        let result = await Promise.all(promiseArr).then(
          (res) => {
            return 1;
          },
          (err) => {
            return 0;
          }
        );

        if (result === 0) {
          this.$store.commit("alterSnackbar", {
            color: "error",
            text: `${this.file.name}上传失败`
          });
          continue;
        }

        // TODO: 制作迷你图
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-area {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 10;
}

.file {
  width: calc(100% - 32px);
  height: 90%;
  position: absolute;
  z-index: 1;
}

.bottom {
  background-color: #fff;
  border-top: 1px #cacaca solid;
}
</style>
