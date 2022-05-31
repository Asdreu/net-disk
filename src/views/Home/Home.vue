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
        <v-btn width="150" rounded color="orange darken-1">解锁</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 锁屏遮罩
      lockMask: false,
      password: "",
    };
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped></style>
