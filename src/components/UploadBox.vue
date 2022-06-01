<template>
  <div class="upload-area">
    <v-btn @click="addFiles" fab color="orange darken-1">
      <span v-if="uploading" class="white--text"></span>
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
              <v-list-item>
                  
              </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "UploadBox",
  data() {
    return {
      // 同步文件数据
      files: [],
      // 上传状态
      uploading: false,
      // 是否弹出对话框
      hasDialog: false,
    };
  },
  methods: {
    addFiles() {
      if (this.uploading) {
        this.hasDialog = true;
        return;
      }
      document.getElementById("file-input").click();
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
</style>
