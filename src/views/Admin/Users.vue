<template>
  <div class="container">
    <h1 class="display-3 text-center mt-2">Users</h1>
    <router-link to="/admin/users/new" class="btn btn-primary">
      Create New User
    </router-link>
    <div class="list-group mt-2">
      <router-link
        v-for="(user, index) in users"
        v-bind:key="index"
        :to="{ name: 'AdminUserDetail', params: { id: user.id } }"
        class="list-group-item list-group-item-action"
      >
        <i v-if="user.role === 'ADMIN'" class="fas fa-chess-king"></i>
        <i v-else class="fas fa-user"></i>
        {{ user.username }}, {{ user.email }}, {{ user.first_name }}
        {{ user.last_name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "AdminUsers",
  beforeMount() {
    if (this.currentUserChecked && !this.isAdmin) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("users/fetchUsers");
  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapState(["currentUserChecked"]),
    ...mapState("users", ["users"]),
  },
};
</script>
