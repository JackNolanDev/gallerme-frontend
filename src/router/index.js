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
      import(/* webpackChunkName: "color" */ "../views/Color.vue"),
  },
  {
    path: "/search",
    name: "Explore",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Explore.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  /* ADMIN PAGES */
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin/Admin.vue"),
  },
  {
    path: "/admin/art",
    name: "AdminArt",
    component: () =>
      import(/* webpackChunkName: "adminArt" */ "../views/Admin/Art.vue"),
  },
  {
    path: "/admin/art/:id",
    name: "AdminArtDetail",
    component: () =>
      import(
        /* webpackChunkName: "adminArtDetail" */ "../views/Admin/ArtDetail.vue"
      ),
  },
  {
    path: "/admin/colors",
    name: "AdminColors",
    component: () =>
      import(/* webpackChunkName: "adminColors" */ "../views/Admin/Colors.vue"),
  },
  {
    path: "/admin/colors/:id",
    name: "AdminColorDetail",
    component: () =>
      import(
        /* webpackChunkName: "adminColorDetail" */ "../views/Admin/ColorDetail.vue"
      ),
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: () =>
      import(/* webpackChunkName: "adminUsers" */ "../views/Admin/Users.vue"),
  },
  {
    path: "/admin/users/:id",
    name: "AdminUserDetail",
    component: () =>
      import(
        /* webpackChunkName: "adminUserDetail" */ "../views/Admin/UserDetail.vue"
      ),
  },
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  routes,
});

export default router;
