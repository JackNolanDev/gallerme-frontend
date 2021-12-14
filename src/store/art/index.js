import aicApi from "@/api/aicApi";
import artApi from "@/api/artApi";
import router from "@/router/index";

const AIC_LIMIT = 10;

const state = {
  art: {},
  artList: [],
  aicPage: 1,
  prevAicTerm: "",
  inspiration: [],
};

const mutations = {
  setArt(state, art) {
    state.art = art;
  },
  setArtList(state, artList) {
    state.artList = artList;
  },
  setAicResult(state, result) {
    state.aicPage = result.pagination.current_page;
    state.inspiration = result.data;
  },
  resetAic(state, term) {
    state.aicPage = 1;
    state.inspiration = [];
    state.prevAicTerm = term;
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
  fetchHomeArt: ({ commit }) => {
    artApi.getArtForHome().then((response) => {
      if (response && response.status === 0) {
        commit("setArtList", response.value);
      }
    });
  },
  fetchArtById: ({ dispatch, commit }, id) => {
    artApi.getArtById(id).then((response) => {
      if (response && response.status === 0) {
        commit("setArt", response.value);
        // grab details based on art name if on detail page
        if (router.currentRoute.name === "Detail") {
          dispatch("fetchInspiration", response.value.name);
        }
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
  fetchInspiration: ({ state, commit }, term) => {
    let page = state.aicPage;
    if (term !== state.prevAicTerm) {
      commit("resetAic", term);
      page = 1;
    }
    aicApi.searchArt(term, page, AIC_LIMIT).then((response) => {
      if (response) {
        console.log(response);
        commit("setAicResult", response);
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
