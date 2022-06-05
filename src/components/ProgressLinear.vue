<template>
  <div class="progress-box d-flex align-center">
    <div
      class="progress-bar d-flex align-center"
      :style="{ width: active ? `${percentage}%` : '0' }"
    ></div>
  </div>
</template>
<script>
export default {
  name: "ProgressLinear",
  props: {
    percentage: {
      type: Number,
      require: true,
    },
    active: {
      type: Boolean,
      require: true,
    },
  },
};
</script>
<style lang="scss">
.progress-box {
  position: absolute;
  width: calc(100% - 32px);
  height: 100%;
  z-index: 0;
  .progress-bar {
    height: 90%;
    background: linear-gradient(to right, #6aa0fc, #2962ff);
    transition: width 200ms ease;
  }
}
</style>
