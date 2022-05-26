<template>
  <v-app>
    <!-- 全局弹出的信息条 -->
    <v-snackbar
      v-model="$store.state.snackbar"
      top
      :timeout="$store.state.snackbarTimeout"
    >
      <span class="d-flex justify-center align-center">{{
        $store.state.snackbarText
      }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="$store.state.snackbar = false"
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
  data() {
    return {};
  },
};
</script>
