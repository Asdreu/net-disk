import Vue from "vue";
import VueRouter from "vue-router";

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
        component: () => import("../views/Home/Image.vue"),
      },
      {
        path: "video",
        component: () => import("../views/Home/Video.vue"),
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
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
