export const mixin = {
  data() {
    return {
      headers: [
        { text: "文件", value: "file_mini" },
        { text: "名称", value: "file_name" },
        { text: "大小", value: "file_size" },
        { text: "上传时间", value: "file_time" },
        { text: "收藏夹", value: "file_folder" },
        { text: "操作", value: "handle" },
      ],
    };
  },
  computed: {
    files() {
      if (/image/.test(this.$route.fullPath)) {
        return this.$store.state.file.imageData;
      } else {
        return this.$store.state.file.videoData;
      }
    }
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      if (/image/.test(this.$route.fullPath)) {
        try {
          await this.$store.dispatch("getAllImageData");
          return "OK";
        } catch (error) {
          this.$store.commit("alterSnackbar", {
            color: "error",
            text: error.message,
          });
        }
      } else if (/video/.test(this.$route.fullPath)) {
        try {
          await this.$store.dispatch("getAllVideoData");
          return "OK";
        } catch (error) {
          this.$store.commit("alterSnackbar", {
            color: "error",
            text: error.message,
          });
        }
      }
    },
  },
};
