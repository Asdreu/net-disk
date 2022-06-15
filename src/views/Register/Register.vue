<template>
  <div class="register-page d-flex justify-center align-center">
    <v-card class="d-flex flex-column align-center" width="35%" flat>
      <v-container fluid>
        <v-row class="first-row mb-3" justify="center">
          <v-col
            cols="12"
            class="text-h4 font-weight-bold d-flex justify-center"
            >注册</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col cols="3">
            <v-subheader
              class="d-flex justify-end font-weight-bold text-subtitle-1"
              >用户名</v-subheader
            >
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="username"
              @blur="checkUsername"
              dense
              clearable
              outlined
              hint="用户名的长度为5~15位"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n7">
          <v-col cols="3">
            <v-subheader
              class="d-flex justify-end font-weight-bold text-subtitle-1"
              >密码</v-subheader
            >
          </v-col>
          <v-col cols="8">
            <v-text-field
              type="password"
              v-model="password"
              dense
              clearable
              outlined
              hint="密码长度为6~18位"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n7">
          <v-col cols="3">
            <v-subheader
              class="d-flex justify-end font-weight-bold text-subtitle-1"
              >确认密码</v-subheader
            >
          </v-col>
          <v-col cols="8">
            <v-text-field
              type="password"
              v-model="passwordAgain"
              dense
              clearable
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n7">
          <v-col cols="3">
            <v-subheader
              class="d-flex justify-end font-weight-bold text-subtitle-1"
              >密保问题</v-subheader
            ></v-col
          >
          <v-col cols="8">
            <v-select
              v-model="question"
              :items="items"
              color="indigo darken-1"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n7">
          <v-col cols="3">
            <v-subheader
              class="d-flex justify-end font-weight-bold text-subtitle-1"
              >密保答案</v-subheader
            ></v-col
          >
          <v-col cols="8">
            <v-text-field
              v-model="answer"
              dense
              clearable
              outlined
              hint="答案最多20字"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n5">
          <v-col cols="3"></v-col>
          <v-col cols="8">
            <v-btn
              color="indigo lighten-1"
              width="100%"
              class="white--text font-weight-bold"
              @click="register"
            >
              <v-icon>mdi-account-plus</v-icon>
              &nbsp; 注册</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="3"></v-col>
          <v-col cols="8"><router-link to="/login" class="text-decoration-none">已有账号？</router-link></v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import SparkMD5 from "spark-md5";

export default {
  name: "RegisterBox",
  data() {
    return {
      username: "",
      password: "",
      passwordAgain: "",
      items: [],
      question: "",
      answer: "",
    };
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      try {
        await this.$store.dispatch("getQuestions");
        this.items = this.$store.state.user.questions;
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },

    async checkUsername() {
      if (/[^a-zA-Z1-9]/.test(this.username)) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "用户名包含规则外字符",
        });
        return;
      }

      if (this.username.length < 5 || this.username.length > 15) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "用户名长度错误",
        });
        return;
      }

      try {
        await this.$store.dispatch("checkUsername", this.username);
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
        this.username = "";
      }
    },

    async register() {
      if (this.password !== this.passwordAgain) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "两次输入的密码不一致",
        });
        return;
      }

      if (this.question === "" || this.answer === "") {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "请设置密保问题和答案",
        });
        return;
      }

      if (this.answer.length > 20) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "密保答案不超过20字",
        });
        return;
      }

      const params = {
        user_name: this.username,
        user_password: SparkMD5.hash(this.password),
        user_question: this.question,
        user_answer: this.answer,
        mock: "mock",
      };
      try {
        const message = await this.$store.dispatch("register", params);
        this.$store.commit("alterSnackbar", {
          color: "success",
          text: message,
        });
        this.$router.push("/login");
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
.register-page {
  height: 100vh;
}

.first-row {
  border-bottom: 1px #e5e5e5 solid;
}
</style>
