import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: () => import("@/views/List")
  },
  {
    path: "/topic/:id",
    name: "Article",
    component: () => import("@/views/Article")
  },
  {
    path: "/user/:username",
    name: "Author",
    component: () => import("@/views/Author")
  },
  {
    path: "/comments/:id",
    name: "Comments",
    component:()=>import("@/views/Comments")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
