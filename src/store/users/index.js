import router from "@/router/index";
import userApi from "@/api/userApi";

const state = {
  user: {},
  users: [],
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  fetchUsers: ({ commit }) => {
    userApi.getAllUsers().then((response) => {
      if (response && response.status === 0) {
        commit("setUsers", response.value);
      }
    });
  },
  fetchUserById: ({ commit }, id) => {
    userApi.getUserById(id).then((response) => {
      if (response && response.status === 0) {
        // Hack - trim date format so html form can read it
        if (
          response.value.date_of_birth &&
          response.value.date_of_birth.length > 10
        ) {
          response.value.date_of_birth = response.value.date_of_birth.substring(
            0,
            10
          );
        }
        commit("setUser", response.value);
      }
    });
  },
  createUser: ({ commit }, user) => {
    userApi.createUser(user).then((response) => {
      if (response && response.status === 0) {
        // just route to correct page instead of setting details here
        commit("setUser", response.value);
        router.push("/admin/users");
      }
    });
  },
  updateUser: ({ commit }, user) => {
    userApi.updateUser(user).then((response) => {
      if (response && response.status === 0) {
        commit("setUser", response.value);
      }
    });
  },
  deleteUser: ({ commit }, id) => {
    userApi.deleteUser(id).then((response) => {
      if (response && response.status === 0) {
        commit("setUser", {});
        router.push("/admin/users");
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
