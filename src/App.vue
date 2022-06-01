<template>
  <v-app>
    <!-- 全局弹出的信息条 -->
    <v-snackbar
      v-model="$store.state.snackbar.snackbar"
      top
      :timeout="time"
    >
      <span class="d-flex justify-center align-center">{{
        text
      }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="$store.state.snackbar.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    time() {
      return this.$store.state.snackbar.snackbarTimeout;
    },
    text() {
      return this.$store.state.snackbar.snackbarText;
    }
  }
};
</script>
