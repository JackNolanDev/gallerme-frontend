import artApi from "../../api/artApi";

const state = {
  art: {},
  artList: [],
};

const mutations = {
  setArtList(state, artList) {
    state.artList = artList;
  },
  setArt(state, art) {
    state.art = art;
  },
};

const actions = {
  fetchAllArt: ({ commit }) => {
    artApi.getAllArt().then((response) => {
      if (response && response.status == 0) {
        commit("setArtList", response.value);
      }
    });
  },
  fetchArtById: ({ commit }, id) => {
    artApi.getArtById(id).then((response) => {
      if (response && response.status == 0) {
        commit("setArt", response.value);
      }
    });
  },
  createArt: ({ commit }, art) => {
    artApi.createArt(art).then((response) => {
      if (response && response.status == 0) {
        // just route to correct page instead of setting details here
        commit("setArt", response.value);
      }
    });
  },
  updateArt: ({ commit }, art) => {
    artApi.updateArt(art).then((response) => {
      if (response && response.status == 0) {
        commit("setArt", response.value);
      }
    });
  },
  deleteArt: ({ commit }, id) => {
    artApi.deleteArt(id).then((response) => {
      if (response && response.status == 0) {
        commit("setArt", {});
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
