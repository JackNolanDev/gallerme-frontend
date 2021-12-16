<template>
  <div class="container">
    <h1 class="display-4 text-center mt-2">{{ currentUser.username }}</h1>
    <form class="card">
      <div class="card-body">
        <div class="mb-3">
          <h4>Edit fields in your user:</h4>
          <label for="user-username" class="form-label">Username</label>
          <input
            type="text"
            v-model="currentUserDup.username"
            placeholder="Username"
            id="user-username"
            class="form-control"
            v-bind:class="usernameFormClass"
            autocomplete="username"
          />
          <div class="invalid-feedback">Username is required!</div>
        </div>
        <div class="mb-3">
          <label for="user-email" class="form-label">Email</label>
          <input
            type="text"
            v-model="currentUserDup.email"
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
              v-model="currentUserDup.first_name"
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
              v-model="currentUserDup.last_name"
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
            v-model="currentUserDup.date_of_birth"
            id="user-dob"
            class="form-control"
          />
        </div>
        <button
          type="button"
          v-on:click="updateButton()"
          class="btn btn-warning me-1"
          :disabled="!buttonValid"
        >
          Update user fields
        </button>
        <button
          type="button"
          v-on:click="deleteButton()"
          class="btn btn-danger me-1"
        >
          Delete account
        </button>
      </div>
    </form>
    <h2 class="mt-5">Artworks created by {{ displayName }}</h2>
    <art-list />
    <h2 class="mt-5">Colors saved by {{ displayName }}</h2>
    <color-list />
    <confirmation-modal
      v-bind:title="confirmationTitle"
      v-bind:body="confirmationBody"
      v-bind:primaryButtonText="confirmationButton"
      v-bind:primaryButtonClass="confirmationButtonClass"
      v-bind:visible="confirmationVisible"
      @toggleVisible="toggleVisible"
      @primaryButton="confirmedButton"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ColorList from "../components/ColorList.vue";
import ArtList from "../components/ArtList.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";

export default {
  components: { ColorList, ArtList, ConfirmationModal },
  name: "PublicProfile",
  data() {
    return {
      confirmedMethod: "",
      confirmationTitle: "",
      confirmationButton: "Confirm",
      confirmationButtonClass: "btn-primary",
      confirmationBody: "",
      confirmationVisible: false,
    };
  },
  beforeMount() {
    if (this.currentUserChecked && !this.isLoggedIn) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("art/fetchArtForCurrentUser");
    this.$store.dispatch("colors/fetchColorsForCurrentUser");
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["currentUser", "currentUserDup", "currentUserChecked"]),
    displayName() {
      if (!this.currentUser.first_name && !this.currentUser.last_name) {
        return this.currentUser.username;
      }
      return `${this.currentUser.first_name} ${this.currentUser.last_name}`;
    },
    usernameFormClass() {
      return this.currentUserDup.username ? "" : "is-invalid";
    },
    emailFormClass() {
      return this.currentUserDup.email ? "" : "is-invalid";
    },
    buttonValid() {
      return (
        this.currentUserDup.username !== this.currentUser.username ||
        this.currentUserDup.email !== this.currentUser.email ||
        this.currentUserDup.first_name !== this.currentUser.first_name ||
        this.currentUserDup.last_name !== this.currentUser.last_name ||
        this.currentUserDup.date_of_birth !== this.currentUser.date_of_birth
      );
    },
  },
  methods: {
    updateButton() {
      this.confirmedMethod = "update";
      this.confirmationTitle = "Update your account information?";
      this.confirmationBody =
        "Are you sure you want to update this information? It will be permanent.";
      this.confirmationButton = "Update account";
      this.confirmationButtonClass = "btn-warning";
      this.toggleVisible();
    },
    deleteButton() {
      this.confirmedMethod = "delete";
      this.confirmationTitle = "Delete account?";
      this.confirmationBody =
        "Are you sure you want to delete your account? If you do, all of your artworks and colors will be deleted as well!";
      this.confirmationButton = "Delete account";
      this.confirmationButtonClass = "btn-danger";
      this.toggleVisible();
    },
    toggleVisible() {
      this.confirmationVisible = !this.confirmationVisible;
    },
    confirmedButton() {
      switch (this.confirmedMethod) {
        case "update":
          this.$store.dispatch("users/updateUser", this.currentUserDup);
          break;
        case "delete":
          this.$store.dispatch("users/deleteUser", {
            id: this.currentUser.id,
            redirectLink: "/",
          });
          break;
      }
    },
  },
};
</script>
