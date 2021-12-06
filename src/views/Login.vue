<template>
  <div class="container">
    <h1 class="text-center mt-2">Login</h1>
    <div class="row">
      <div class="col-0 col-md-1 col-lg-2 col-xxl-3"></div>
      <form class="col-12 col-md-10 col-lg-8 col-xxl-6">
        <div class="mb-3">
          <label for="user-username" class="form-label">Username</label>
          <input
            type="text"
            v-model="formUsername"
            placeholder="Username"
            id="user-username"
            class="form-control"
            v-bind:class="usernameFormClass"
            autocomplete="username"
          />
          <div class="invalid-feedback">Username is required!</div>
        </div>
        <div class="mb-3">
          <label for="user-password" class="form-label">Password</label>
          <input
            type="password"
            v-model="formPassword"
            placeholder="Password"
            id="user-password"
            class="form-control"
            v-bind:class="passwordFormClass"
            autocomplete="new-password"
          />
          <div class="invalid-feedback">Password is required!</div>
        </div>
        <button
          type="button"
          v-on:click="signupButton()"
          class="btn btn-primary me-1 col-12"
          :disabled="signUpButtonDisabled"
        >
          Login
        </button>
      </form>
      <div class="col-0 col-md-1 col-lg-2 col-xxl-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formUsername: "",
      formPassword: "",
    };
  },
  computed: {
    usernameInvalid() {
      return this.formUsername === "";
    },
    passwordInvalid() {
      return this.formPassword === "";
    },
    usernameFormClass() {
      return this.usernameInvalid ? "is-invalid" : "";
    },
    passwordFormClass() {
      return this.passwordInvalid ? "is-invalid" : "";
    },
    signUpButtonDisabled() {
      return this.usernameInvalid || this.passwordInvalid;
    },
  },
  methods: {
    signupButton() {
      const user = {
        username: this.formUsername,
        password: this.formPassword,
      };
      this.$store.dispatch("login", user);
    },
  },
};
</script>
