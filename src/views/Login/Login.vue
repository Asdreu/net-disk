<template>
  <div class="login-box d-flex justify-center align-center">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          class="d-flex flex-column justify-space-around align-center"
          width="450"
          outlined
          :elevation="hover ? 8 : 4"
        >
          <v-container fluid>
            <v-row justify="center" class="mt-2">
              <v-col class="d-flex justify-center align-center">
                <v-icon large color="indigo lighten-1"
                  >mdi-shield-key-outline</v-icon
                >
                &nbsp;
                <span
                  class="font-weight-bold text-h5 indigo--text text--lighten-1"
                  >登录</span
                >
              </v-col>
            </v-row>
            <v-row justify="center" class="mb-n8">
              <v-col cols="10">
                <v-text-field
                  v-model="username"
                  placeholder="用户名"
                  dense
                  outlined
                  clearable
                  color="indigo lighten-1"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="10">
                <v-text-field
                  v-model="password"
                  placeholder="密码"
                  type="password"
                  dense
                  outlined
                  clearable
                  color="indigo lighten-1"
                  @keyup.enter="login"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-n5">
              <v-col cols="10" class="d-flex justify-center align-center">
                <v-btn color="indigo lighten-1" width="100" @click="login"
                  ><span class="white--text">登录</span></v-btn
                >
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-4">
              <v-col cols="10" class="d-flex justify-end align-center">
                <!-- <router-link to="/register" class="text-decoration-none"
                  ><span class="link">注册</span></router-link
                > -->
                <!-- <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> -->
                <router-link to="/reset" class="text-decoration-none"
                  ><span class="link">忘记密码?</span></router-link
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.username === "" || this.password === "") {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "用户名和密码不能为空",
        });
        return;
      }

      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: SparkMD5.hash(this.password),
        });
        this.$bus.$emit("on-login");
        this.$router.push("/home");
        this.$store.commit("alterSnackbar", {
          color: "success",
          text: "欢迎来到个人云盘",
        });
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

<style lang="scss" scoped>
.login-box {
  height: 100vh;
}

.link:hover {
  color: #5C6BC0;
}
</style>
