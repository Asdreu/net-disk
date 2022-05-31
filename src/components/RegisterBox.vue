<template>
  <div>
    <v-card
      class="d-flex flex-column align-center py-5"
      width="400"
      height="550"
      color="#00000060"
    >
      <span class="text-h2 font-weight-medium origin--text darken-2 mb-10"
        >注册</span
      >
      <div style="width: 100%">
        <v-container>
          <v-row justify="center" class="mb-n8">
            <v-col cols="10">
              <v-text-field
                placeholder="请输入用户名"
                v-model="username"
                @blur="checkUsername"
                rounded
                dense
                filled
                clearable
                color="black"
                background-color="#fafafa7c"
                hint="用户名的长度为5~15位"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-n8">
            <v-col cols="10">
              <v-text-field
                type="password"
                placeholder="请输入密码"
                v-model="password"
                rounded
                dense
                filled
                clearable
                color="black"
                background-color="#fafafa7c"
                hint="密码长度为6~18位"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-n8">
            <v-col cols="10">
              <v-text-field
                type="password"
                placeholder="请再次输入密码"
                v-model="passwordAgain"
                rounded
                dense
                filled
                clearable
                color="black"
                background-color="#fafafa7c"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-n8">
            <v-col cols="10">
              <v-select
                v-model="question"
                :items="items"
                color="orange darken-1"
                label="请选择密保问题"
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-n8">
            <v-col cols="10">
              <v-text-field
                placeholder="密保答案"
                v-model="answer"
                rounded
                dense
                filled
                clearable
                color="black"
                background-color="#fafafa7c"
                hint="答案最多20字"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="d-flex justify-space-around mt-10">
        <v-btn
          @click="returnToLogin"
          width="150"
          rounded
          color="blue-grey lighten-4 mr-5"
          >取消</v-btn
        >
        <v-btn
          @click="register"
          width="150"
          rounded
          color="orange darken-1 ml-5"
          >注册</v-btn
        >
      </div>
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
        this.items = this.$store.state.questions;
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

    returnToLogin() {
      this.$emit("cancel");
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
        this.returnToLogin();
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
