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
  appendToColors(state, color) {
    state.colors.push(color);
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
  fetchColorsForCurrentUser: ({ commit }) => {
    colorApi.getColorsForCurrentUser().then((response) => {
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
  createColor: ({ commit }, { color, redirectLink }) => {
    colorApi.createColor(color).then((response) => {
      if (response && response.status === 0) {
        // just route to correct page instead of setting details here
        commit("setColor", response.value);
        if (redirectLink) {
          router.push(redirectLink);
        } else {
          commit("appendToColors", response.value);
        }
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
  deleteColor: ({ commit }, { id, redirectLink }) => {
    colorApi.deleteColor(id).then((response) => {
      if (response && response.status === 0) {
        commit("setColor", {});
        if (redirectLink) {
          router.push(redirectLink);
        }
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
