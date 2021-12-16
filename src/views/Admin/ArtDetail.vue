<template>
  <div class="container">
    <div v-if="isNew">
      <h1 class="display-3 text-center mt-2">New Art</h1>
    </div>
    <h1 v-else class="display-3 text-center mt-2">Art Details</h1>
    <form>
      <div v-if="!isNew" class="mb-3">
        <label for="art-id" class="form-label">ID</label>
        <input
          type="text"
          v-model="id"
          placeholder="ID"
          readonly
          id="art-id"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="art-user-id" class="form-label">
          User ID
          <router-link
            :to="{ name: 'AdminUserDetail', params: { id: art.user_id } }"
            v-if="!isNew"
          >
            (visit user page)
          </router-link>
        </label>
        <input
          type="text"
          v-model="art.user_id"
          placeholder="User ID"
          id="art-user-id"
          class="form-control"
          v-bind:class="userIdFormClass"
          v-bind:readonly="!isNew"
        />
        <div class="invalid-feedback">A valid User ID is required!</div>
      </div>
      <div v-if="!isNew" class="mb-3">
        <label for="art-name" class="form-label">Name</label>
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
      <div class="mb-3">
        <label class="form-label">Art</label>
        <create-art
          v-if="isNew"
          :showFavoriteColorSelector="false"
          @published="createButton"
        />
        <display-art v-else v-bind:art="art" class="art" />
      </div>
      <router-link to="/admin/art" class="btn btn-secondary me-1">
        Cancel
      </router-link>
      <button
        type="button"
        v-on:click="updateButton()"
        v-if="!isNew"
        class="btn btn-warning me-1"
        :disabled="!buttonValid"
      >
        Update
      </button>
      <button
        type="button"
        v-on:click="deleteButton()"
        v-if="!isNew"
        class="btn btn-danger me-1"
      >
        Delete
      </button>
    </form>
    <div v-if="!isNew" class="mt-2">
      <h2>Favorite Colors in this art</h2>
      <color-list :isAdmin="true" />
    </div>
    <confirmation-modal
      v-bind:title="confirmationTitle"
      v-bind:body="confirmationBody"
      v-bind:primaryButtonText="confirmationButton"
      v-bind:primaryButtonClass="confirmationButtonClass"
      v-bind:visible="confirmationVisible"
      @toggleVisible="toggleVisible"
      @primaryButton="confirmedDeleteButton"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { validate } from "uuid";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import DisplayArt from "../../components/DisplayArt.vue";
import CreateArt from "../../components/CreateArt.vue";
import ColorList from "../../components/ColorList.vue";

const NEW_PATH = "new";

export default {
  name: "AdminArtDetail",
  components: {
    ConfirmationModal,
    DisplayArt,
    CreateArt,
    ColorList,
  },
  data() {
    return {
      id: "",
      publishedArt: {},
      confirmedMethod: "",
      confirmationTitle: "",
      confirmationButton: "Confirm",
      confirmationButtonClass: "btn-primary",
      confirmationBody: "",
      confirmationVisible: false,
    };
  },
  beforeMount() {
    if (this.currentUserChecked && !this.isAdmin) {
      this.$router.push("/");
      return;
    }
    this.id = this.$route.params.id;
    if (!this.isNew) {
      if (validate(this.id)) {
        this.$store.dispatch("art/fetchArtById", this.id);
        //this.$store.dispatch("users/fetchUserByArtId", this.id);
        this.$store.dispatch("colors/fetchColorsByArtId", this.id);
      } else {
        this.$router.push({ name: "AdminArt" });
      }
    } else {
      // clear any values already in this variable
      this.setArt({});
    }
  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapState(["currentUserChecked"]),
    ...mapState("art", ["art"]),
    isNew() {
      return this.id === NEW_PATH;
    },
    userIdFormClass() {
      return this.art.user_id && validate(this.art.user_id) ? "" : "is-invalid";
    },
    nameFormClass() {
      return this.art.name ? "" : "is-invalid";
    },
    buttonValid() {
      return this.art.user_id && validate(this.art.user_id) && this.art.name;
    },
  },
  methods: {
    ...mapMutations("art", ["setArt"]),
    createButton(art) {
      if (!this.art.user_id) {
        return;
      }
      this.publishedArt = art;
      this.confirmedMethod = "create";
      this.confirmationTitle = "Create new art?";
      this.confirmationBody = "Are you sure you want to create this art?";
      this.confirmationButton = "Create";
      this.confirmationButtonClass = "btn-primary";
      this.toggleVisible();
    },
    updateButton() {
      this.confirmedMethod = "update";
      this.confirmationTitle = "Update art?";
      this.confirmationBody = "Are you sure you want to update this art?";
      this.confirmationButton = "Update";
      this.confirmationButtonClass = "btn-warning";
      this.toggleVisible();
    },
    deleteButton() {
      this.confirmedMethod = "delete";
      this.confirmationTitle = "Delete art?";
      this.confirmationBody = "Are you sure you want to delete this art?";
      this.confirmationButton = "Delete";
      this.confirmationButtonClass = "btn-danger";
      this.toggleVisible();
    },
    toggleVisible() {
      this.confirmationVisible = !this.confirmationVisible;
    },
    confirmedDeleteButton() {
      switch (this.confirmedMethod) {
        case "create":
          this.$store.dispatch("art/createArt", {
            art: {
              user_id: this.art.user_id,
              name: this.publishedArt.name,
              size: this.publishedArt.size,
              data: this.publishedArt.data,
            },
            redirectLink: "/admin/art",
          });
          break;
        case "update":
          this.$store.dispatch("art/updateArt", this.art);
          break;
        case "delete":
          this.$store.dispatch("art/deleteArt", {
            id: this.id,
            redirectLink: "/admin/art",
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
.art {
  max-width: 300px;
}
</style>
