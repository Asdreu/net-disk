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
      // 文档高度
      scrollHeight: 0,
      // 浏览器可视区域高度
      clientHeight: 0,
      // 鼠标左击选取的文件
      leftClickFile: null,
      // 鼠标右击选取的文件
      rightClickFile: null,
      // 鼠标右击客户端屏幕坐标
      coordinate: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    files() {
      return this.$store.state.file.timelineData;
    },
    isAll() {
      return this.$store.state.file.isAllTimelineData;
    },
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
    await this.getFileData();
    this.$nextTick(() => {
      this.scrollHeight = document.documentElement.scrollHeight;
      this.clientHeight = document.documentElement.clientHeight;
    });
  },
  mounted() {
    // 监听滚轮事件
    window.addEventListener("scroll", this.handleScrollEvent);
  },
  methods: {
    async getFileData() {
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
        // TODO: 改成网络请求加载分页
        this.$store.commit("addTimelineData");

        // 渲染后重新计算
        this.$nextTick(() => {
          this.scrollHeight = document.documentElement.scrollHeight;
          this.clientHeight = document.documentElement.clientHeight;
        });
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
            this.$store.commit("handleFileDelete", this.rightClickFile.file_id);
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
