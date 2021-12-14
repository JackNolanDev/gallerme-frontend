import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import artStore from "./art";
import colorStore from "./colors";
import userStore from "./users";
import accountApi from "../api/accountApi";

// Hack - trim date format so html form can read it - need util JS file because this is duplicated
const trimDOB = (res) => {
  if (res.value.date_of_birth && res.value.date_of_birth.length > 10) {
    return res.value.date_of_birth.substring(0, 10);
  }
  return undefined;
};

Vue.use(Vuex);

const state = {
  currentUser: {},
  currentUserDup: {},
  currentUserChecked: false,
};

const getters = {
  isLoggedIn: (state) => state.currentUser.id !== undefined,
  isAdmin: (state) => state.currentUser.role === "ADMIN",
};

const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
    state.currentUserDup = { ...currentUser }; // need to copy values not set pointer
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
            response.value.date_of_birth = trimDOB(response);
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
