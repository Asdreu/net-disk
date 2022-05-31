<template>
  <div>
    <v-card
      class="d-flex flex-column justify-space-around align-center"
      width="400"
      height="500"
      color="#00000060"
    >
      <v-container fluid>
        <v-row class="mb-12">
          <v-col><img src="../assets/images/name.png" width="350px" /></v-col>
        </v-row>
        <v-row justify="center" class="mb-n8">
          <v-col cols="8">
            <v-text-field
              v-model="username"
              placeholder="请输入用户名"
              rounded
              filled
              dense
              background-color="#fafafa7c"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              v-model="password"
              placeholder="请输入密码"
              type="password"
              rounded
              filled
              dense
              background-color="#fafafa7c"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn width="150" rounded color="orange darken-1" @click="login"
              >登录</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="d-flex justify-center">
            <a @click="toRegister">注册</a>
          </v-col>
          <v-col class="d-flex justify-center">
            <a @click="toResetPassword">忘记密码</a>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5';

export default {
  name: "LoginBox",
  props: {
    type: String,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    toRegister() {
      this.$emit("update:type", "register");
    },

    toResetPassword() {
      this.$emit("update:type", "reset");
    },

    async login() {
      if (this.username === "" || this.password === "") {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "用户名和密码不能为空",
        });
      }

      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: SparkMD5.hash(this.password),
        });
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
