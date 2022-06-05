<template>
  <div>
    <v-overlay>
      <div
        class="external-box d-flex justify-center align-center"
        @click.self="closeFileShow"
      >
        <v-card
          class="card rounded-0 d-flex justify-center align-center"
          width="85vw"
          height="50vh"
          color="#000000a4"
        >
          <v-icon
            class="close-icon"
            @click="closeFileShow"
            color="red"
            tag="button"
            >mdi-close-circle</v-icon
          >
          <v-img
            v-if="/image/.test(fileData.file_type)"
            :src="fileData.file_src"
            contain
            width="70%"
            height="100%"
          ></v-img>
          <video
            v-if="/video/.test(fileData.file_type)"
            :src="fileData.file_src"
            controls
            width="70%"
            height="100%"
          ></video>
          <div></div>
        </v-card>
      </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "FileShow",
  props: {
    file: Object,
  },
  data() {
    return {
      // 收藏夹对话框
      collectDialog: false,
      // 删除对话框
      deleteDialog: false,
      // 书写对话框
      typeDialog: false,
      // 备忘录
      msg: "",
      // 收藏文件夹名字
      folder: "",
    };
  },
  computed: {
    fileData() {
      return this.file;
    },
  },
  methods: {
    closeFileShow() {
      this.$emit("update:file", null);
    },
  },
};
</script>

<style lang="scss">
.external-box {
  width: 100vw;
  height: 100vh;
}

.close-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
