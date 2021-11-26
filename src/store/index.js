import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const tempColors = [
  { id: 1, name: "Blue", color: "#256eff" },
  { id: 2, name: "Purple", color: "#46237a" },
  { id: 3, name: "Fancy Schmancy Aquamarine", color: "#3ddc97" },
  { id: 4, name: "Basically just white", color: "#fcfcfc" },
  { id: 5, name: "RED", color: "#ff495c" },
];

const state = {
  isLoggedIn: false,
  favoriteColors: tempColors, // [],
};

const mutations = {
  setFavoriteColors(state, favoriteColors) {
    state.favoriteColors = favoriteColors;
  },
};

const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
