import colorApi from "@/api/colorApi";
import router from "@/router/index";

const state = {
  color: {},
  colors: [],
  colorSearchList: [],
};

const mutations = {
  setColor(state, color) {
    state.color = color;
  },
  setColors(state, colors) {
    state.colors = colors;
  },
  setColorSearchList(state, list) {
    state.colorSearchList = list;
  },
};

const actions = {
  fetchColors: ({ commit }) => {
    colorApi.getAllColors().then((response) => {
      if (response && response.status === 0) {
        commit("setColors", response.value);
      }
    });
  },
  fetchColorById: ({ commit }, id) => {
    colorApi.getColorById(id).then((response) => {
      if (response && response.status === 0) {
        commit("setColor", response.value);
      }
    });
  },
  fetchColorsByUserId: ({ commit }, id) => {
    colorApi.getColorByUserId(id).then((response) => {
      if (response && response.status === 0) {
        commit("setColors", response.value);
      }
    });
  },
  fetchColorsByArtId: ({ commit }, id) => {
    colorApi.getColorByArtId(id).then((response) => {
      if (response && response.status === 0) {
        commit("setColors", response.value);
      }
    });
  },
  searchForColors: ({ commit }, term) => {
    colorApi.searchColors(term).then((response) => {
      if (response && response.status === 0) {
        commit("setColorSearchList", response.value);
      }
    });
  },
  createColor: ({ commit }, color) => {
    colorApi.createColor(color).then((response) => {
      if (response && response.status === 0) {
        // just route to correct page instead of setting details here
        commit("setColor", response.value);
        router.push("/admin/colors");
      }
    });
  },
  updateColor: ({ commit }, color) => {
    colorApi.updateColor(color).then((response) => {
      if (response && response.status === 0) {
        commit("setColor", response.value);
      }
    });
  },
  deleteColor: ({ commit }, id) => {
    colorApi.deleteColor(id).then((response) => {
      if (response && response.status === 0) {
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
