<template>
  <div>
    <v-timeline v-if="files.length" dense align-top>
      <v-timeline-item
        v-for="(items, index) of files"
        :key="index"
        fill-dot
        small
        color="orange darken-1"
      >
        <v-card class="elevation-2">
          <v-card-title class="headline mb-n5">{{
            items[0].file_time
          }}</v-card-title>
          <v-card-text class="d-flex justify-start align-center flex-wrap">
            <v-card
              class="rounded-0 mt-5 mr-5"
              hover
              v-for="item in items"
              :key="item.file_id"
              @click.right.prevent="handleRightClick($event, item)"
              @click.left.prevent="leftClickFile = item"
            >
              <div
                class="img-box"
                v-loading="{ src: item.file_mini, type: item.file_type }"
              >
                <img class="img" src="../../../public/logo.png" />
                <v-icon class="icon icon-hidden" color="orange darken-1" x-large
                  >mdi-play-circle-outline</v-icon
                >
              </div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <!-- 右击选择菜单 -->
    <right-click-menu
      v-if="rightClickFile"
      :coordinate="coordinate"
      @file-action="handleMenuAction"
    ></right-click-menu>

    <!-- 文件展示 -->
    <file-show v-if="leftClickFile" :file.sync="leftClickFile"></file-show>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data() {
    return {
      page: 0,
      limit: 5,
      // 所有文件
      allFiles: [],
      // 文件数据
      files: [],
      // 文档高度
      scrollHeight: 0,
      // 浏览器可视区域高度
      clientHeight: 0,
      // 是否获取到了全部数据
      isAll: false,
      // 鼠标左击选取的文件
      leftClickFile: null,
      // 鼠标右击选取的文件
      rightClickFile: null,
      // 鼠标右击客户端屏幕坐标
      coordinate: {
        x: 0,
        y: 0,
      },
      // 所有文件资源的日期
      allDate: [],
    };
  },
  directives: {
    loading: {
      inserted: (el, binding) => {
        const { src, type } = binding.value;
        const img = new Image();
        // TODO: 搞清楚 onload 原理
        img.onload = () => {
          el.childNodes[0].src = src;
          if (/video/.test(type)) {
            el.childNodes[1].classList.remove("icon-hidden");
          }
        };
        img.src = src;
      },
    },
  },
  async created() {
    this.allFiles = await this.getFileData();
    this.files = this.allFiles.slice(0, this.limit);
    this.allFiles.splice(0, this.limit);
    /* this.files.forEach((item) => {
      if (!this.allDate.includes(item[0].file_time)) {
        this.allDate.push(item[0].file_time);
      }
    }); */
    this.$nextTick(() => {
      this.scrollHeight = document.documentElement.scrollHeight;
      this.clientHeight = document.documentElement.clientHeight;
    });
  },
  mounted() {
    // 监听滚轮事件
    window.addEventListener("scroll", this.handleScrollEvent);
    // 监听上传事件
    this.$bus.$on("upload-files", this.handleFilesUpload);
    // 监听文件修改
    this.$bus.$on("alter", this.handleFileAlter);
  },
  methods: {
    async getFileData() {
      /* const params = {
        page: this.page,
        limit: this.limit,
      }; */
      try {
        const result = await this.$store.dispatch("getAllTimelineData");
        return result;
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },

    async handleScrollEvent() {
      this.rightClickFile = null;
      this.leftClickFile = null;
      if (
        Math.abs(
          this.scrollHeight -
            this.clientHeight -
            document.documentElement.scrollTop
        ) < 1 &&
        !this.isAll
      ) {
        // const fileData = await this.getFileData();
        /* if (fileData.length === 0) {
          this.isAll = true;
          return;
        } */

        /* fileData.forEach((item) => {
          if (this.allDate.includes(item[0].file_time)) {
            this.isAll = true;
            return;
          } else {
            this.files.push(item);
            this.allDate.push(item[0].file_time);
          }
        }); */

        // TODO: 改成网络请求加载分页
        if (this.allFiles.length < this.limit) {
          this.allFiles.forEach((item) => {
            this.files.push(item);
          });
          this.isAll = true;
          return;
        } else {
          const temp = this.allFiles.slice(0, this.limit);
          temp.forEach((item) => {
            this.files.push(item);
          });
          this.allFiles.splice(0, this.limit);
        }

        // 渲染后重新计算
        this.$nextTick(() => {
          this.scrollHeight = document.documentElement.scrollHeight;
          this.clientHeight = document.documentElement.clientHeight;
        });
      }
    },

    handleFilesUpload(uploadFiles) {
      if (
        this.files.length === 0 ||
        this.files[0][0].file_time !== uploadFiles[0].file_time
      ) {
        // 翻转数组是为了展示时最新上传的文件放在最前面
        this.files.unshift(uploadFiles.reverse());
      } else {
        this.files[0].unshift(...uploadFiles.reverse());
      }
    },

    handleRightClick(event, file) {
      this.coordinate.x = event.clientX;
      this.coordinate.y = event.clientY;
      this.rightClickFile = file;
    },

    // 文件删除、下载操作
    async handleMenuAction(action) {
      switch (action) {
        case "open":
          this.leftClickFile = this.rightClickFile;
          break;
        case "delete":
          try {
            await this.$store.dispatch(
              "deleteFileById",
              this.rightClickFile.file_id
            );
            this.$bus.$emit("alter", {
              type: "delete",
              fileId: this.rightClickFile.file_id,
            });
          } catch (error) {
            this.$store.commit("alterSnackbar", {
              color: "error",
              text: error.message,
            });
          }
          break;
        default:
          break;
      }
      this.rightClickFile = null;
    },

    handleFileAlter(params) {
      const { type, fileId } = params;
      switch (type) {
        case "delete":
          for (let i in this.files) {
            for (let j in this.files[i]) {
              if (this.files[i][j].file_id === fileId) {
                this.files[i].splice(j, 1);
                if (this.files[i].length === 0) {
                  this.files.splice(i, 1);
                }
                return;
              }
            }
          }
        case "rename":
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.img-box {
  position: relative;
  width: 150px;
  height: 150px;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .icon {
    position: absolute;
    // 播放图标的大小是40px
    top: calc(50% - 20px);
    left: calc(50% - 20px);
  }
  .icon-hidden {
    display: none !important;
  }
}
</style>
