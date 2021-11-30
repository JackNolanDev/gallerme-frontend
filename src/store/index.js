import Vue from "vue";
import Vuex from "vuex";
import artStore from "./art";
import colorStore from "./colors";
import userStore from "./users";
import userApi from "../api/userApi";

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
  isLoggedIn: (state) => state.currentUser.id === undefined, // state.currentUser !== {}
  isAdmin: (state) => state.currentUser.role === undefined, // state.currentUser !== {} && state.currentUser.role === "ADMIN",
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
      userApi.currentUser().then((response) => {
        commit("currentUserChecked");
        if (response && response.status == 0) {
          // just route to correct page instead of setting details here
          commit("setCurrentUser", response.value);
        }
      });
    }
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
