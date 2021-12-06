<template>
  <div class="container">
    <h1 class="text-center mt-2">Sign Up</h1>
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
        <div class="mb-3">
          <label for="user-confirm-password" class="form-label">
            Confirm your Password
          </label>
          <input
            type="password"
            v-model="formConfirmPassword"
            placeholder="Password"
            id="user-confirm-password"
            class="form-control"
            v-bind:class="confirmPasswordFormClass"
            autocomplete="new-password"
          />
          <div class="invalid-feedback">Passwords need to match!</div>
        </div>
        <div class="mb-3">
          <label for="user-email" class="form-label">Email</label>
          <input
            type="text"
            v-model="formEmail"
            placeholder="Email"
            id="user-email"
            class="form-control"
            v-bind:class="emailFormClass"
          />
          <div class="invalid-feedback">An email is required!</div>
        </div>
        <div class="mb-3 row">
          <div class="col-12 col-md-6 mb-3 mb-md-0">
            <label for="user-first-name" class="form-label">
              First Name (Not Required)
            </label>
            <input
              type="text"
              v-model="formFirstName"
              placeholder="First Name"
              id="user-first-name"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6">
            <label for="user-last-name" class="form-label">
              Last Name (Not Required)
            </label>
            <input
              type="text"
              v-model="formLastName"
              placeholder="Last Name"
              id="user-last-name"
              class="form-control"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="user-dob" class="form-label">
            Birth Day (Not Required)
          </label>
          <input
            type="date"
            v-model="formDOB"
            id="user-dob"
            class="form-control"
          />
        </div>
        <button
          type="button"
          v-on:click="signupButton()"
          class="btn btn-primary me-1 col-12"
          :disabled="signUpButtonDisabled"
        >
          Sign Up
        </button>
      </form>
      <div class="col-0 col-md-1 col-lg-2 col-xxl-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      formUsername: "",
      formPassword: "",
      formConfirmPassword: "",
      formEmail: "",
      formFirstName: "",
      formLastName: "",
      formDOB: "",
    };
  },
  computed: {
    usernameInvalid() {
      return this.formUsername === "";
    },
    passwordInvalid() {
      return this.formPassword === "";
    },
    confirmPasswordInvalid() {
      return this.formPassword !== this.formConfirmPassword;
    },
    emailInvalid() {
      return this.formEmail === "";
    },
    usernameFormClass() {
      return this.usernameInvalid ? "is-invalid" : "";
    },
    passwordFormClass() {
      return this.passwordInvalid ? "is-invalid" : "";
    },
    confirmPasswordFormClass() {
      return this.confirmPasswordInvalid ? "is-invalid" : "";
    },
    emailFormClass() {
      return this.emailInvalid ? "is-invalid" : "";
    },
    signUpButtonDisabled() {
      return (
        this.usernameInvalid ||
        this.passwordInvalid ||
        this.confirmPasswordInvalid ||
        this.emailInvalid
      );
    },
  },
  methods: {
    signupButton() {
      const user = {
        username: this.formUsername,
        password: this.formPassword,
        email: this.formEmail,
      };
      if (this.formFirstName) {
        user.first_name = this.formFirstName;
      }
      if (this.formLastName) {
        user.last_name = this.formLastName;
      }
      if (this.formDOB) {
        user.date_of_birth = this.formDOB;
      }
      this.$store.dispatch("signup", user);
    },
  },
};
</script>
