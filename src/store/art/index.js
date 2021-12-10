import artApi from "@/api/artApi";
import router from "@/router/index";

const state = {
  art: {},
  artList: [],
  searchList: [],
};

const mutations = {
  setArt(state, art) {
    state.art = art;
  },
  setArtList(state, artList) {
    state.artList = artList;
  },
  setSearchList(state, list) {
    state.searchList = list;
  },
};

const actions = {
  fetchAllArt: ({ commit }) => {
    artApi.getAllArt().then((response) => {
      if (response && response.status === 0) {
        commit("setArtList", response.value);
      }
    });
  },
  fetchArtById: ({ commit }, id) => {
    artApi.getArtById(id).then((response) => {
      if (response && response.status === 0) {
        commit("setArt", response.value);
      }
    });
  },
  fetchArtByUserId: ({ commit }, id) => {
    artApi.getArtByUserId(id).then((response) => {
      if (response && response.status === 0) {
        commit("setArtList", response.value);
      }
    });
  },
  fetchArtByColorId: ({ commit }, id) => {
    artApi.getArtByColorId(id).then((response) => {
      if (response && response.status === 0) {
        commit("setArtList", response.value);
      }
    });
  },
  searchForArt: ({ commit }, term) => {
    artApi.searchArt(term).then((response) => {
      if (response && response.status === 0) {
        commit("setArtList", response.value);
      }
    });
  },
  createArt: ({ commit }, art) => {
    artApi.createArt(art).then((response) => {
      if (response && response.status === 0) {
        // just route to correct page instead of setting details here
        commit("setArt", response.value);
        // TODO: read from a constants util file
        localStorage.removeItem("create_size");
        localStorage.removeItem("create_pixels");
        router.push("/admin/art");
      }
    });
  },
  updateArt: ({ commit }, art) => {
    artApi.updateArt(art).then((response) => {
      if (response && response.status === 0) {
        commit("setArt", response.value);
      }
    });
  },
  deleteArt: ({ commit }, id) => {
    artApi.deleteArt(id).then((response) => {
      if (response && response.status === 0) {
        commit("setArt", {});
        router.push("/admin/art");
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
