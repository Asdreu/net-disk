<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>数据列表</h4>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchKeyword"
          color="indigo lighten-1"
          append-icon="mdi-magnify"
          label="搜索"
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
        :loading="filesList.length === 0 ? true: false"
        checkbox-color="indigo lighten-1"
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
            <v-icon v-if="/video/.test(item.file_type)" color="grey lighten-1"
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
              <v-icon color="blue accent-4" small>mdi-folder-open</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              elevation="0"
              @click="deleteFileById(item.file_id)"
            >
              <v-icon color="red" small>mdi-delete-forever</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:body.append v-if="selectedFiles.length !== 0">
          <div style="width: 100%; height: 100%" class="d-flex justify-center">
            <v-btn
              text
              class="mt-3 mb-3"
              color="indigo lighten-1"
              @click="deleteFilesInBatches"
              >删除</v-btn
            >
          </div>
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
        this.$store.commit("handleFileDelete", fileId);
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
          this.$store.commit("handleFileDelete", id);
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
