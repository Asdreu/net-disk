<template>
  <div class="home">
    <!-- 导航 -->
    <v-navigation-drawer app clipped permanent expand-on-hover>
      <v-list nav>
        <v-list-item
          v-for="(item, index) in menu"
          :key="index"
          color="indigo darken-1"
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
      menu: [
        { icon: "mdi-timeline-text", title: "时光轴", link: "/home/timeline" },
        { icon: "mdi-image", title: "照片管理", link: "/home/image" },
        { icon: "mdi-video", title: "视频管理", link: "/home/video" },
        { icon: "mdi-folder", title: "收藏夹", link: "/home/folder" },
        { icon: "mdi-account-cog", title: "个人设置", link: "/home/profile" },
      ],
    };
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
  },
};
</script>
