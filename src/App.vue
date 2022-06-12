<template>
  <v-app>
    <!-- 全局弹出的信息条 -->
    <v-snackbar
      v-model="$store.state.snackbar.snackbar"
      top
      centered
      :color="color"
      :timeout="time"
    >
      <span class="d-flex justify-center align-center font-weight-bold">{{
        text
      }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="$store.state.snackbar.snackbar = false"
        >
          <v-icon :color="btnColor">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="lockMask" width="300" persistent overlay-opacity="0.5">
      <v-card
        class="pa-10 d-flex flex-column align-center justify-space-around"
        height="150"
        color="indigo lighten-4"
      >
        <v-text-field
          v-model="password"
          type="password"
          placeholder="请输入密码解锁"
          color="indigo darken-1"
          @keyup.enter="unlock"
        ></v-text-field>
        <v-btn @click="unlock" width="100" rounded color="indigo darken-1"
          >解锁</v-btn
        >
      </v-card>
    </v-dialog>

    <v-app-bar class="indigo lighten-1" app clipped-left>
      <v-toolbar-title>
        <h2 style="color: white">X - Net</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="canLogout" class="d-flex justify-start align-center">
        <div
          class="avatar d-flex justify-center align-center"
          :style="{
            backgroundImage: `url(${userInfo.userAvatar})`,
          }"
        >
          <!-- 没有头像时显示默认图标 -->
          <v-icon v-if="hasUserAvatar" size="36" color="white"
            >mdi-account-circle</v-icon
          >
        </div>
        <v-btn icon>
          <v-icon @click="lock" large color="white">mdi-lock</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @click="quit" large color="white">mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
import SparkMD5 from "spark-md5";
import { getUserInfo } from "@/utils/temporary-user-info.js";

export default {
  name: "App",
  data() {
    return {
      canLogout: false,
      lockMask: false,
      userInfo: {
        userAvatar: "",
        userId: "",
        username: "",
        password: "",
      },
      password: "",
    };
  },
  computed: {
    time() {
      return this.$store.state.snackbar.snackbarTimeout;
    },
    text() {
      return this.$store.state.snackbar.snackbarText;
    },
    color() {
      return this.$store.state.snackbar.snackbarColor;
    },
    btnColor() {
      return this.$store.state.snackbar.btnColor;
    },
    hasUserAvatar() {
      return !this.userInfo.userAvatar;
    },
  },
  mounted() {
    this.$bus.$on("on-login", this.handleLogin);
    this.$bus.$on("updateAvatar", this.handleAvatar);
    this.prepareUserInfo();
  },
  updated() {
    if (/home/.test(this.$route.fullPath)) {
      this.canLogout = true;
    }
  },
  methods: {
    handleLogin() {
      this.canLogout = true;
      this.prepareUserInfo();
    },

    handleAvatar(avatar){
      this.userInfo.userAvatar = avatar;
    },

    prepareUserInfo() {
      if (!getUserInfo()) {
        return;
      }
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
          case "user_password":
            this.userInfo.password = value;
            break;
          default:
            break;
        }
      }
      if (sessionStorage.getItem("avatar")) {
        this.userInfo.userAvatar = sessionStorage.getItem("avatar");
      }
    },

    // 锁屏
    lock() {
      this.lockMask = true;
      this.$store.commit("changeIsLocked", this.lockMask);
    },

    // 解锁
    unlock() {
      if (SparkMD5.hash(this.password) !== this.userInfo.password) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "密码错误",
        });
        this.password = "";
        return;
      } else {
        this.lockMask = false;
        this.password = "";
        this.$store.commit("changeIsLocked", this.lockMask);
      }
    },

    // 退出登录
    quit() {
      this.canLogout = false;
      this.$store.dispatch("quit");
      this.$store.commit("handleIsAll");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 36px;
  height: 36px;
  margin-right: 6px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
</style>
