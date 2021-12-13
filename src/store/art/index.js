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
  fetchArtForCurrentUser: ({ commit }) => {
    artApi.getArtForCurrentUser().then((response) => {
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
  createArt: ({ commit }, { art, redirectLink }) => {
    artApi.createArt(art).then((response) => {
      if (response && response.status === 0) {
        commit("setArt", response.value);
        // TODO: read from a constants util file
        localStorage.removeItem("create_size");
        localStorage.removeItem("create_pixels");
        if (redirectLink) {
          router.push(redirectLink);
        } else {
          // always redirect anyway to detail page
          router.push({ name: "Detail", params: { id: response.value.id } });
        }
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
  deleteArt: ({ commit }, { id, redirectLink }) => {
    artApi.deleteArt(id).then((response) => {
      if (response && response.status === 0) {
        commit("setArt", {});
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
