import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const tempColors = [
  { id: crypto.randomUUID(), name: "Blue", color: "#256eff" },
  { id: crypto.randomUUID(), name: "Purple", color: "#46237a" },
  {
    id: crypto.randomUUID(),
    name: "Fancy Schmancy Aquamarine",
    color: "#3ddc97",
  },
  { id: crypto.randomUUID(), name: "Basically just white", color: "#fcfcfc" },
  { id: crypto.randomUUID(), name: "RED", color: "#ff495c" },
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
