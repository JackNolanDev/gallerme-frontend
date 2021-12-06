<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">GallerMe 🖼️</router-link>
      <button
        type="button"
        v-on:click="toggleDropDown()"
        class="navbar-toggler"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-bind:class="dropDownClass" class="navbar-collapse">
        <div class="navbar-nav me-auto">
          <!-- class="active" to make the link the active one -->
          <router-link to="/search" class="nav-link">Explore</router-link>
          <router-link to="/create" class="nav-link">Create</router-link>
          <router-link v-if="isAdmin" to="/admin" class="nav-link">
            Admin
          </router-link>
        </div>
        <div v-if="isLoggedIn" class="navbar-nav">
          <router-link to="/profile" class="nav-link me-1">
            Profile
          </router-link>
          <button
            type="button"
            v-on:click="logoutButton()"
            class="btn btn-outline-secondary"
          >
            Logout
          </button>
        </div>
        <div v-else class="d-flex">
          <!-- Replace with profile link & Logout button when logged in -->
          <router-link to="/signup" class="btn btn-outline-success me-2">
            Sign Up
          </router-link>
          <router-link to="/login" class="btn btn-outline-secondary">
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Nav",
  data() {
    return {
      showDropDown: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isAdmin"]),
    dropDownClass() {
      return this.showDropDown ? "" : "collapse";
    },
  },
  methods: {
    toggleDropDown() {
      this.showDropDown = !this.showDropDown;
    },
    logoutButton() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
