<template>
  <div class="container">
    <h1 class="display-3 text-center mt-2">Edit Saved Color</h1>
    <div class="card mt-2">
      <display-color class="card-body" :color="color" />
    </div>
    <p class="mt-3">
      <router-link
        :to="{ name: 'PublicProfile', params: { id: color.user_id } }"
      >
        Visit the owner's profile page
      </router-link>
    </p>
    <form v-if="userIsOwner" class="card mt-3">
      <div class="card-body">
        <div>
          <label for="color-name" class="form-label">
            Edit saved color's name
          </label>
          <input
            type="text"
            v-model="color.name"
            placeholder="Name"
            id="color-name"
            class="form-control"
            v-bind:class="nameFormClass"
          />
          <div class="invalid-feedback">A name is required!</div>
        </div>
        <button
          type="button"
          v-on:click="updateButton()"
          class="btn btn-warning me-1 mt-2"
          :disabled="!buttonValid"
        >
          Update Name
        </button>
        <button
          type="button"
          v-on:click="deleteButton()"
          class="btn btn-danger me-1 mt-2"
        >
          Delete Color
        </button>
      </div>
    </form>
    <div class="mt-2">
      <h2>Artworks connected to this color</h2>
      <art-list />
    </div>
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
import { validate } from "uuid";
import { mapState } from "vuex";
import DisplayColor from "../components/DisplayColor.vue";
import ArtList from "../components/ArtList.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";

export default {
  components: { DisplayColor, ArtList, ConfirmationModal },
  name: "ColorDetail",
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
    this.id = this.$route.params.id;
    if (validate(this.id)) {
      this.$store.dispatch("colors/fetchColorById", this.id);
      this.$store.dispatch("art/fetchArtByColorId", this.id);
    } else {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapState("colors", ["color"]),
    userIsOwner() {
      return (
        this.currentUser &&
        this.color &&
        this.currentUser.id === this.color.user_id
      );
    },
    nameFormClass() {
      return this.color.name !== "" && this.color.name.length <= 50
        ? ""
        : "is-invalid";
    },
    buttonValid() {
      return this.color.name !== "" && this.color.name.length <= 50;
    },
  },
  methods: {
    updateButton() {
      this.confirmedMethod = "update";
      this.confirmationTitle = "Update your color's name?";
      this.confirmationBody =
        "Are you sure you want to update this name? It will be immediately visible to other users.";
      this.confirmationButton = "Update Color Name";
      this.confirmationButtonClass = "btn-warning";
      this.toggleVisible();
    },
    deleteButton() {
      this.confirmedMethod = "delete";
      this.confirmationTitle = "Delete saved color?";
      this.confirmationBody =
        "Are you sure you want to delete this color? It will be permanently deleted from our system.";
      this.confirmationButton = "Delete Color";
      this.confirmationButtonClass = "btn-danger";
      this.toggleVisible();
    },
    toggleVisible() {
      this.confirmationVisible = !this.confirmationVisible;
    },
    confirmedButton() {
      switch (this.confirmedMethod) {
        case "update":
          this.$store.dispatch("colors/updateColor", this.color);
          break;
        case "delete":
          this.$store.dispatch("colors/deleteColor", {
            id: this.id,
            redirectLink: "/",
          });
          break;
      }
    },
  },
};
</script>
