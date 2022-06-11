<template>
  <div class="profile-page d-flex justify-center align-center">
    <v-card
      v-if="type === 'user'"
      class="pt-5 mr-n5 d-flex flex-column justify-center align-center"
      width="35%"
    >
      <div class="avatar">
        <div
          class="avatar"
          v-if="userInfo.userAvatar"
          :style="{ backgroundImage: `url(${userInfo.userAvatar})` }"
        ></div>
        <v-icon v-else size="100" color="grey darken-4"
          >mdi-account-circle</v-icon
        >
        <v-file-input
          id="avatar-input"
          style="display: none"
          v-model="avatarFile"
          accept="image/*"
          @change="uploadAvatarFile"
        ></v-file-input>
      </div>

      <div class="profile-info d-flex flex-column mt-5 mb-12 ml-10 pl-10">
        <span
          >用户名: <span>{{ userInfo.username }}</span></span
        >
        <span
          >用户 ID: <span>{{ userInfo.userId }}</span></span
        >
        <span
          >注册时间: <span>{{ userInfo.registerTime }}</span></span
        >
        <span
          >密保问题: <span>{{ userInfo.userQuestion }}</span></span
        >
        <span
          >密保答案: <span>{{ userInfo.userAnswer }}</span></span
        >
      </div>

      <div class="d-flex justify-center mb-5" style="width: 100%">
        <v-btn
          class="mr-8 white--text"
          width="100"
          color="indigo lighten-1"
          @click="inputAvatarFile"
          >上传头像</v-btn
        >
        <v-btn
          class="white--text"
          width="120"
          color="indigo lighten-1"
          @click="toEdit"
          >修改密保问题</v-btn
        >
      </div>
    </v-card>

    <v-card
      v-else-if="type === 'edit'"
      class="d-flex flex-column justify-start align-center"
      width="40%"
    >
      <v-container fluid>
        <v-row justify="center">
          <v-col class="d-flex justify-center align-center">
            <span class="text-h6 font-weight-bold indigo--text darken-1"
              >修改密保问题</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-subheader
              class="d-flex justify-end font-weight-bold text-subtitle-1"
              >密保问题</v-subheader
            >
          </v-col>
          <v-col cols="8">
            <v-select
              v-model="newQuestion"
              :items="items"
              dense
              outlined
              color="indigo darken-1"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-n7">
          <v-col cols="3">
            <v-subheader
              class="d-flex justify-end font-weight-bold text-subtitle-1"
              >密保答案</v-subheader
            >
          </v-col>
          <v-col cols="8">
            <v-text-field v-model="newAnswer" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center align-center">
            <v-btn
              class="mr-10 white--text"
              width="100"
              color="indigo lighten-1"
              @click="editQuestion"
              >提交</v-btn
            >
            <v-btn
              class="ml-5 white--text"
              width="100"
              color="indigo lighten-1"
              @click="cancel"
              >取消</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/temporary-user-info.js";

export default {
  name: "Profile",
  data() {
    return {
      type: "user",
      userInfo: {
        userAvatar: "",
        userId: "",
        username: "",
        userQuestion: "",
        userAnswer: "",
        registerTime: "",
      },
      avatarFile: null,
      newQuestion: "",
      newAnswer: "",
    };
  },
  computed: {
    items() {
      return this.$store.state.user.questions;
    },
  },
  mounted() {
    this.prepareUserInfo();
  },
  methods: {
    prepareUserInfo() {
      for (let [key, value] of Object.entries(getUserInfo())) {
        switch (key) {
          case "user_avatar":
            this.userInfo.userAvatar = value;
            break;
          case "user_id":
            this.userInfo.userId = value;
            break;
          case "user_name":
            this.userInfo.username = value;
            break;
          case "user_question":
            this.userInfo.userQuestion = value;
            break;
          case "user_answer":
            this.userInfo.userAnswer = value;
            break;
          case "register_time":
            this.userInfo.registerTime = value;
            break;
          default:
            break;
        }
      }
    },

    inputAvatarFile() {
      let el = document.getElementById("avatar-input");
      el.click();
    },

    async uploadAvatarFile() {
      let avatarData = new FormData();
      avatarData.append("user_avatar", this.avatarFile);
      try {
        await this.$store.dispatch("updateAvatar", avatarData);
        this.userInfo.userAvatar = sessionStorage.getItem("avatar");
        this.$bus.$emit("updateAvatar", this.userInfo.userAvatar);
        this.$store.commit("alterSnackbar", {
          color: "success",
          text: "头像上传成功",
        });
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },

    async toEdit() {
      this.type = "edit";
      try {
        await this.$store.dispatch("getQuestions");
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },

    async editQuestion() {
      if (
        this.newQuestion === this.userInfo.userQuestion &&
        this.newAnswer === this.userInfo.userAnswer
      ) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "未做任何修改",
        });
        return;
      }

      if (this.newQuestion === "" || this.newAnswer === "") {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "未做任何修改",
        });
        return;
      }

      try {
        console.log("111");
        await this.$store.dispatch("updateUserQuestion", {
          userQuestion: this.newQuestion,
          userAnswer: this.newAnswer,
        });
        this.$store.commit("alterSnackbar", {
          color: "success",
          text: "修改成功",
        });
        this.userInfo.userQuestion = this.newQuestion;
        this.userInfo.userAnswer = this.newAnswer;
        this.type = "user";
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },

    cancel() {
      this.newQuestion = "";
      this.newAnswer = "";
      this.type = "user";
    },
  },
};
</script>

<style lang="scss">
.profile-page {
  width: 100%;
  height: 80vh;
}

.avatar {
  height: 100px;
  width: 100px;
  border-radius: 50% !important;
  background-position: center;
  background-size: contain;
}

.profile-info {
  width: 100%;
  span {
    font-size: 18px;
    span {
      font-size: 18px;
    }
  }
}
</style>
