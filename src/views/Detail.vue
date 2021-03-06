<template>
  <div class="container">
    <h1 class="display-4 text-center mt-2">{{ art.name }}</h1>
    <div class="mt-2 art mx-auto">
      <display-art :art="art" />
      <p v-if="user.id" class="text-end fs-5">
        By
        <router-link :to="{ name: 'PublicProfile', params: { id: user.id } }">{{
          user.username
        }}</router-link>
      </p>
    </div>
    <form v-if="userIsOwner" class="card mt-3">
      <div class="card-body">
        <div>
          <label for="art-name" class="form-label">Edit artwork's name</label>
          <input
            type="text"
            v-model="art.name"
            placeholder="Name"
            id="art-name"
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
          Delete Art
        </button>
      </div>
    </form>
    <div>
      <h3 class="text-center mt-2">Saved Colors in this art</h3>
      <color-list />
    </div>
    <div>
      <h3 class="text-center mt-2">Possible Inspirations</h3>
      <p class="text-center">
        (Public domain from
        <a href="https://www.artic.edu/">the Art Institute of Chicago</a>)
      </p>
      <inspiration-list />
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
import DisplayArt from "../components/DisplayArt.vue";
import ColorList from "../components/ColorList.vue";
import InspirationList from "../components/InspirationList.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";

export default {
  components: { DisplayArt, ColorList, InspirationList, ConfirmationModal },
  name: "Detail",
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
      this.$store.dispatch("art/fetchArtById", this.id);
      this.$store.dispatch("users/fetchUserByArtId", this.id);
      this.$store.dispatch("colors/fetchColorsByArtId", this.id);
    } else {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapState("art", ["art"]),
    ...mapState("users", ["user"]),
    userIsOwner() {
      return (
        this.currentUser && this.art && this.currentUser.id === this.art.user_id
      );
    },
    nameFormClass() {
      return this.art.name !== "" && this.art.name.length <= 50
        ? ""
        : "is-invalid";
    },
    buttonValid() {
      return this.art.name !== "" && this.art.name.length <= 50;
    },
  },
  methods: {
    updateButton() {
      this.confirmedMethod = "update";
      this.confirmationTitle = "Update your artwork's name?";
      this.confirmationBody =
        "Are you sure you want to update this name? It will be immediately visible to other users.";
      this.confirmationButton = "Update art name";
      this.confirmationButtonClass = "btn-warning";
      this.toggleVisible();
    },
    deleteButton() {
      this.confirmedMethod = "delete";
      this.confirmationTitle = "Delete art?";
      this.confirmationBody =
        "Are you sure you want to delete this art? It will be permanently deleted from our system.";
      this.confirmationButton = "Delete art";
      this.confirmationButtonClass = "btn-danger";
      this.toggleVisible();
    },
    toggleVisible() {
      this.confirmationVisible = !this.confirmationVisible;
    },
    confirmedButton() {
      switch (this.confirmedMethod) {
        case "update":
          this.$store.dispatch("art/updateArt", this.art);
          break;
        case "delete":
          this.$store.dispatch("art/deleteArt", {
            id: this.id,
            redirectLink: "/",
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
.art {
  max-width: 518px;
}
</style>
