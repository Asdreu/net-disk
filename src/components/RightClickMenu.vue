<template>
  <div @click.right.prevent="">
    <v-overlay opacity="0">
      <div
        :style="{
          position: 'fixed',
          zIndex: 100,
          top: `${y}px`,
          left: `${x}px`,
        }"
        v-click-outside="leaveMenu"
      >
        <v-list min-width="165" elevation="2" light>
          <v-list-item-group>
            <v-list-item
              v-for="(selection, index) of menu"
              :key="index"
              @click="selectAction(selection.action)"
              dense
              color="orange darken-1"
            >
              <v-list-item-icon>
                <v-icon
                  v-text="selection.icon"
                  :color="selection.color"
                ></v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{ selection.title }}</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "RightClickMenu",
  props: {
    coordinate: Object,
  },
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0,
      menu: [
        {
          icon: "mdi-folder-open",
          title: "打开",
          color: "blue accent-4",
          action: "open",
        },
        {
          icon: "mdi-rename-box",
          title: "重命名",
          color: "orange darken-1",
          action: "rename",
        },
        {
          icon: "mdi-delete-forever",
          title: "删除",
          color: "red darken-3",
          action: "delete",
        },
        {
          icon: "mdi-cloud-download",
          title: "下载",
          color: "green darken-3",
          action: "download",
        },
      ],
    };
  },
  computed: {
    x() {
      if (this.clientWidth - this.coordinate.x > 170) {
        return this.coordinate.x;
      } else {
        return this.coordinate.x - 166;
      }
    },

    y() {
      if (this.clientHeight - this.coordinate.y > 175) {
        return this.coordinate.y;
      } else {
        return this.coordinate.y - 175;
      }
    },
  },
  mounted() {
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
  },
  methods: {
    selectAction(action) {
      this.$emit("file-action", action);
    },

    // 点击菜单外部，离开菜单
    leaveMenu() {
      this.$emit("file-action", "cancel");
    },
  },
};
</script>
