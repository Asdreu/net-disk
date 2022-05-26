<template>
  <div class="login-page d-flex justify-center align-center">
    <!-- 顶部信息栏 -->
    <v-sheet
      class="bar d-flex justify-end align-center"
      height="45"
      color="#0808084d"
    >
      <div class="pt-2 d-flex align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" href="https://github.com/Asdreu">
              <img src="../assets/images/github.png" />
            </a>
          </template>
          <span>我的 GitHub</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" href="https://github.com/Asdreu">
              <img src="../assets/images/weixin.png" />
            </a>
          </template>
          <span>联系开发者</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" href="https://www.alonepluto.info/free">
              <img src="../assets/images/find.png" />
            </a>
          </template>
          <span>发现更多</span>
        </v-tooltip>
      </div>
    </v-sheet>

    <LoginBox></LoginBox>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-image: url("../assets/images/bg.jpg");
  background-size: cover;
  .bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    img {
      width: 28px;
      height: 28px;
      margin: 0px 15px;
    }
  }
}
</style>
