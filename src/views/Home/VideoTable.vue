<template>
  <file-table :files="files" :headers="headers"></file-table>
</template>

<script>
import { mixin } from "@/mixin/mixin.js";

export default {
  name: "VideoTable",
  mixins: [mixin],
};
</script>
