<template>
  <div class="reset-page d-flex justify-center align-center">
    <v-card class="pa-5" width="40%" flat>
      <v-container fluid>
        <v-row>
          <v-col class="d-flex justify-center"
            ><span class="text-h5 font-weight-bold indigo--text darken-1"
              >重置密码</span
            ></v-col
          >
        </v-row>

        <v-row>
          <v-col>
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-stepper
                  v-model="step"
                  width="100%"
                  :class="`elevation-${hover ? 8 : 4}`"
                >
                  <v-stepper-header>
                    <v-stepper-step
                      step="1"
                      :complete="step > 1"
                      color="indigo darken-1"
                      >用户名</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step
                      step="2"
                      :complete="step > 2"
                      color="indigo darken-1"
                      >密保问题</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step
                      step="3"
                      :complete="step > 3"
                      color="indigo darken-1"
                      >重置密码</v-stepper-step
                    >
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-card
                        width="100%"
                        height="200"
                        class="mx-auto d-flex flex-column justify-space-around align-center"
                      >
                        <div style="width: 60%">
                          <v-text-field
                            v-model="username"
                            label="用户名"
                            outlined
                            dense
                            clearable
                            color="indigo lighten-1"
                          ></v-text-field>
                        </div>
                        <div class="mt-n5">
                          <v-btn
                            class="mr-3 white--text"
                            @click="completedFirstStep"
                            width="100"
                            color="indigo lighten-1"
                            >下一步</v-btn
                          >
                          <v-btn
                            class="white--text"
                            @click="cancelReset"
                            width="100"
                            color="indigo lighten-1"
                            >取消</v-btn
                          >
                        </div>
                      </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <v-card
                        width="100%"
                        height="200"
                        class="mx-auto d-flex flex-column justify-space-around align-center"
                      >
                        <span>{{ question }}</span>
                        <div style="width: 60%" class="mt-n5">
                          <v-text-field
                            v-model="inputAnswer"
                            label="答案"
                            outlined
                            dense
                            clearable
                            color="indigo lighten-1"
                          ></v-text-field>
                        </div>
                        <div class="mt-n5">
                          <v-btn
                            class="mr-3 white--text"
                            @click="completedSecondStep"
                            width="100"
                            color="indigo lighten-1"
                            >下一步</v-btn
                          >
                          <v-btn
                            class="white--text"
                            @click="cancelReset"
                            width="100"
                            color="indigo lighten-1"
                            >取消</v-btn
                          >
                        </div>
                      </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                      <v-card
                        width="100%"
                        height="200"
                        class="mx-auto d-flex flex-column justify-space-around align-center"
                      >
                        <div style="width: 60%">
                          <v-text-field
                            v-model="newPassword"
                            label="密码"
                            type="password"
                            outlined
                            dense
                            clearable
                            color="indigo lighten-1"
                          ></v-text-field>
                          <v-text-field
                            v-model="passwordAgain"
                            label="确认密码"
                            type="password"
                            outlined
                            dense
                            clearable
                            color="indigo lighten-1"
                          ></v-text-field>
                        </div>
                        <div class="mt-n5">
                          <v-btn
                            class="mr-3 white--text"
                            @click="resetPassword"
                            width="100"
                            color="indigo lighten-1"
                            >下一步</v-btn
                          >
                          <v-btn
                            class="white--text"
                            @click="cancelReset"
                            width="100"
                            color="indigo lighten-1"
                            >取消</v-btn
                          >
                        </div>
                      </v-card>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import sparkMd5 from 'spark-md5';

export default {
  name: "Reset",
  data() {
    return {
      step: 1,
      username: "",
      question: "",
      trueAnswer: "",
      inputAnswer: "",
      newPassword: "",
      passwordAgain: "",
    };
  },
  mounted() {
    this.step = 1;
  },
  methods: {
    cancelReset() {
      this.$router.push("/login");
    },

    async completedFirstStep() {
      if (this.username === "") {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "请输入用户名",
        });
        return;
      }
      try {
        await this.$store.dispatch("getUserQuestion", this.username);
        this.question = this.$store.state.user.userQuestion;
        this.trueAnswer = this.$store.state.user.userAnswer;
        this.step += 1;
      } catch (error) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: error.message,
        });
      }
    },

    completedSecondStep() {
      if (this.trueAnswer !== SparkMD5.hash(this.inputAnswer)) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "答案错误",
        });
        return;
      }
      this.step += 1;
    },

    async resetPassword() {
      if (this.newPassword !== this.passwordAgain) {
        this.$store.commit("alterSnackbar", {
          color: "error",
          text: "两次密码不一致",
        });
        return;
      }

      try {
        await this.$store.dispatch("resetPassword", {
          username: this.username,
          password: sparkMd5.hash(this.newPassword),
        });
        this.step += 1;
        this.question = "";
        this.trueAnswer = "";
        this.inputAnswer = "";
        this.newPassword = "";
        this.passwordAgain = "";
        this.$store.commit("alterSnackbar", {
          color: "success",
          text: "密码重置成功",
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
.reset-page {
  height: 100vh;
}
</style>
