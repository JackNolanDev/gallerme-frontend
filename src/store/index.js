import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import artStore from "./art";
import colorStore from "./colors";
import userStore from "./users";
import accountApi from "../api/accountApi";

Vue.use(Vuex);

const tempColors = [
  { id: 1, name: "Blue", color: "#256eff" },
  { id: 2, name: "Purple", color: "#46237a" },
  { id: 3, name: "Fancy Schmancy Aquamarine", color: "#3ddc97" },
  { id: 4, name: "Basically just white", color: "#fcfcfc" },
  { id: 5, name: "RED", color: "#ff495c" },
];

const state = {
  favoriteColors: tempColors, // [],
  currentUser: {},
  currentUserChecked: false,
};

const getters = {
  isLoggedIn: (state) => state.currentUser.id !== undefined,
  isAdmin: (state) => state.currentUser.role === "ADMIN",
};

const mutations = {
  setFavoriteColors(state, favoriteColors) {
    state.favoriteColors = favoriteColors;
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
  currentUserChecked(state) {
    state.currentUserChecked = true;
  },
};

const actions = {
  fetchCurrentUser: ({ state, commit }) => {
    // only run api if we haven't checked it yet
    if (!state.currentUserChecked) {
      accountApi.currentUser().then((response) => {
        commit("currentUserChecked");
        if (response) {
          if (response.status === 0) {
            commit("setCurrentUser", response.value);
            if (
              router.currentRoute.meta.adminOnly &&
              response.value.role !== "ADMIN"
            ) {
              // re-route from admin only page if not admin
              router.push("/");
            }
          } else if (router.currentRoute.meta.loggedInOnly) {
            // re-route from logged in only page if not admin
            router.push("/");
          }
        }
      });
    }
  },
  signup: ({ commit }, user) => {
    accountApi.signup(user).then((response) => {
      if (response && response.status === 0) {
        commit("setCurrentUser", response.value);
        router.push("/");
      }
    });
  },
  login: ({ commit }, user) => {
    accountApi.login(user).then((response) => {
      if (response && response.status === 0) {
        commit("setCurrentUser", response.value);
        router.push("/");
      }
    });
  },
  logout: ({ commit }) => {
    accountApi.logout().then((response) => {
      if (response && response.status === 0) {
        commit("setCurrentUser", {});
        router.push("/");
      }
    });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    art: artStore,
    colors: colorStore,
    users: userStore,
  },
});
