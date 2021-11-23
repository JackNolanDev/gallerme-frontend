import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../components/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/Home",
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
  },
  {
    path: "/color",
    name: "Color",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Color.vue"),
  },
  {
    path: "/search",
    name: "Explore",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Explore.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/SignUp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Profile.vue"),
  },
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  routes,
});

export default router;
