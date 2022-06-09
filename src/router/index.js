import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("../views/Register/Register.vue"),
  },
  {
    path: "/reset",
    component: () => import("../views/Reset/Reset.vue"),
  },
  {
    path: "/home",
    redirect: "/home/timeline",
  },
  {
    path: "/home",
    component: () => import("../views/Home/Home.vue"),
    children: [
      {
        path: "timeline",
        component: () => import("../views/Home/TimeLine.vue"),
      },
      {
        path: "image",
        component: () => import("../views/Home/ImageTable.vue"),
      },
      {
        path: "video",
        component: () => import("../views/Home/VideoTable.vue"),
      },
      {
        path: "folder",
        component: () => import("../views/Home/Folder.vue"),
      },
      {
        path: "profile",
        component: () => import("../views/Home/Profile.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = store.state.user.token;
  if (token) {
    if (to.path === "/login") {
      next("/home");
    } else {
      next();
    }
  } else {
    if (/home/.test(to.fullPath)) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
