import colorApi from "@/api/colorApi";
import router from "@/router/index";

const state = {
  color: {},
  colors: [],
};

const mutations = {
  setColors(state, colors) {
    state.colors = colors;
  },
  setColor(state, color) {
    state.color = color;
  },
};

const actions = {
  fetchColors: ({ commit }) => {
    colorApi.getAllColors().then((response) => {
      if (response && response.status == 0) {
        commit("setColors", response.value);
      }
    });
  },
  fetchColorById: ({ commit }, id) => {
    colorApi.getColorById(id).then((response) => {
      if (response && response.status == 0) {
        commit("setColor", response.value);
      }
    });
  },
  createColor: ({ commit }, color) => {
    colorApi.createColor(color).then((response) => {
      if (response && response.status == 0) {
        // just route to correct page instead of setting details here
        commit("setColor", response.value);
        router.push("/admin/colors");
      }
    });
  },
  updateColor: ({ commit }, color) => {
    colorApi.updateColor(color).then((response) => {
      if (response && response.status == 0) {
        commit("setColor", response.value);
      }
    });
  },
  deleteColor: ({ commit }, id) => {
    colorApi.deleteColor(id).then((response) => {
      if (response && response.status == 0) {
        commit("setColor", {});
        router.push("/admin/colors");
      }
    });
  },
};

const module = {
  state,
  mutations,
  actions,
  namespaced: true,
};

export default module;
