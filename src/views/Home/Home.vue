<template>
  <div class="home">
    <v-dialog v-model="lockMask" width="800" persistent overlay-opacity="0.8">
      <v-card
        class="pa-10 d-flex flex-column align-center justify-space-around"
        width="800"
        height="450"
        color="rgba(55, 55, 55, 0.5)"
      >
        <img src="../../assets/images/name.png" width="750" />
        <v-text-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
          color="orange darken-1"
        ></v-text-field>
        <v-btn @click="unlock" width="150" rounded color="orange darken-1"
          >解锁</v-btn
        >
      </v-card>
    </v-dialog>
    <v-app-bar class="orange darken-1" app clipped-left>
      <v-toolbar-title>
        <h2 style="color: white">Miss Yo</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
        <v-icon large color="white">mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 导航 -->
    <v-navigation-drawer app width="200" clipped permanent>
      <v-list nav>
        <v-list-item
          v-for="(item, index) in menu"
          :key="index"
          color="orange darken-1"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <upload-box v-if="/timeline/.test($route.fullPath)" :userId="userInfo.userId"></upload-box>
        <transition name="slide-fade" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import { getUserInfo } from "@/utils/temporary-user-info.js";

export default {
  name: "Home",
  data() {
    return {
      userInfo: {
        userAvatar: "",
        userId: "",
        username: "",
        password: "",
      },
      // 锁屏遮罩
      lockMask: false,
      password: "",
      menu: [
        { icon: "mdi-timeline-text", title: "时光轴", link: "/home/timeline" },
        { icon: "mdi-image", title: "照片管理", link: "/home/image" },
        { icon: "mdi-video", title: "视频管理", link: "/home/video" },
        { icon: "mdi-folder", title: "收藏夹", link: "/home/folder" },
        { icon: "mdi-account-cog", title: "个人设置", link: "/home/profile" },
      ],
    };
  },
  computed: {
    hasUserAvatar() {
      return !this.userInfo.userAvatar;
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
          case "user_password":
            this.userInfo.password = value;
            break;
          default:
            break;
        }
      }
    },

    // 锁屏
    lock() {
      this.lockMask = true;
      this.$store.commit("changeIsLocked", this.lockMask);
    },

    // 解锁
    unlock() {
      if (
        SparkMD5.hash(this.password) !==
        this.userInfo.password
      ) {
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
      this.$store.dispatch("quit");
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
