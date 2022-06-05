<template>
  <div>
    <v-card>
      <v-card-title>
        <h1>数据列表</h1>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchKeyword"
          color="orange darken-1"
          append-icon="mdi-magnify"
          label="表内查询"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        class="elevation-1"
        v-model="selectedFiles"
        :headers="headers"
        :items="filesList"
        :search="searchKeyword"
        :items-per-page="5"
        show-select
        checkbox-color="orange darken-1"
      >
        <template v-slot:item.file_mini="{ item }">
          <div
            class="ma-1 d-flex justify-center align-center"
            :style="{
              width: '80px',
              height: '80px',
              backgroundImage: `url(${item.file_mini})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }"
          >
            <v-icon v-if="/video/.test(item.file_type)" color="orange"
              >mdi-play-circle-outline</v-icon
            >
          </div>
        </template>
        <template v-slot:item.file_size="{ item }">
          <div>
            <span>{{ item.file_size | fileSizeFormat }} MB</span>
          </div>
        </template>
        <template v-slot:item.handle="{ item }">
          <div class="d-flex justify-start align-center">
            <v-btn
              class="mr-5"
              fab
              small
              elevation="0"
              @click="currentFlie = item"
            >
              <v-icon color="blue accent-4">mdi-folder-open</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              elevation="0"
              @click="deleteFileById(item.file_id)"
            >
              <v-icon color="red">mdi-delete-forever</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:body.append v-if="selectedFiles.length !== 0">
          <v-btn
            class="mt-3 mb-3 ml-4"
            color="orange darken-1"
            @click="deleteFilesInBatches"
            >批量删除</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
    <file-show v-if="currentFlie" :file.sync="currentFlie"></file-show>
  </div>
</template>

<script>
export default {
  name: "FileTable",
  props: {
    files: Array,
    headers: Array,
  },
  data() {
    return {
      currentFlie: null,
      searchKeyword: "",
      selectedFiles: [],
    };
  },
  computed: {
    filesList() {
      return this.files;
    },
  },
  methods: {
    async deleteFileById(fileId) {
      try {
        await this.$store.dispatch("deleteFileById", fileId);
        this.$store.commit("alterSnackbar", {
          color: "success",
          text: "删除文件成功",
        });
        // TODO: 将删除操作发布到事件总线
        this.$bus.$emit("alter", { type: "delete", fileId: fileId });
        for (let index in this.filesList) {
          if (this.filesList[index].file_id === fileId) {
            this.filesList.splice(index, 1);
          }
        }
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },

    async deleteFilesInBatches() {
      let fileIdArr = [];
      this.selectedFiles.forEach((file) => {
        fileIdArr.push(file.file_id);
      });
      try {
        const result = await this.$store.dispatch(
          "deleteFilesInBatches",
          fileIdArr
        );
        this.$store.commit("alterSnackbar", {
          color: "success",
          text: "批量删除成功",
        });

        for (let id of result) {
          // TODO: 将删除操作发布到全局事件总线
          for (let index in this.filesList) {
            if (this.filesList[index].file_id === id) {
              this.filesList.splice(index, 1);
            }
          }
        }
        // 重置选择列表
        this.selectedFiles = [];
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },
  },
};
</script>
