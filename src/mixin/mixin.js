export const mixin = {
  data() {
    return {
      files: [],
      filesType: "",
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
  async mounted() {
    await this.init();
    this.$bus.$on("upload-files", this.handleFilesUpload);
    this.$bus.$on("alter", this.handleFileAlter);
  },
  methods: {
    async init() {
      if (/image/.test(this.$route.fullPath)) {
        this.filesType = "image";
        try {
          this.files = await this.$store.dispatch("getAllImageData");
          return "OK";
        } catch (error) {
          this.$store.commit("alterSnackbar", {
            color: "error",
            text: error.message,
          });
        }
      } else if (/video/.test(this.$route.fullPath)) {
        this.filesType = "video";
        try {
          this.files = await this.$store.dispatch("getAllVideoData");
          return "OK";
        } catch (error) {
          this.$store.commit("alterSnackbar", {
            color: "error",
            text: error.message,
          });
        }
      }
    },

    handleFilesUpload(uploadFiles) {
      uploadFiles.forEach((file) => {
        if (new RegExp(this.filesType).test(file.file_type)) {
          this.files.unshift(file);
        }
      });
    },

    handleFileAlter(params) {
      const { type, fileId } = params;
      switch (type) {
        case "delete":
          break;
      
        default:
          break;
      }
    }
  },
};
