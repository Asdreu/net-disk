<template>
  <div class="folder-area d-flex flex-wrap">
    <div class="d-flex flex-column">
      <!-- 文件区域 -->
      <div class="d-flex flex-wrap">
        <div
          class="d-flex flex-column align-center mr-10 mt-2"
          v-for="(folder, index) of folders"
          :key="index"
        >
          <v-icon>mdi-folder</v-icon>
          <span>{{ folder }}</span>
        </div>
        <!-- 最后一个新建文件夹盒子 -->
        <div>
          <v-icon>mdi-plus</v-icon>
          <span>新建收藏夹</span>
        </div>
      </div>
      <!-- 删除区域 -->
      <div>
        <v-icon>mdi-delete-outline</v-icon>
        <v-icon>mdi-delete-empty-outline</v-icon>
      </div>
    </div>
    <v-dialog v-model="hasDialog"></v-dialog>
  </div>
</template>

<script>
export default {
  name: "Folder",
  data() {
    return {
      hasDialog: false,
    };
  },
  computed: {
    folders() {
      return this.$store.state.folder.folders;
    },
  },
  created() {
    this.$store.commit("getFoldersInfo");
  },
};
</script>

<style lang="scss">
.folder-area {
  width: 100%;
}
</style>
