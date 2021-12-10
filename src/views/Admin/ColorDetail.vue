<template>
  <div class="container">
    <div v-if="isNew">
      <h1 class="text-center mt-2">New Color</h1>
    </div>
    <h1 v-else class="text-center mt-2">Color Details</h1>
    <form>
      <div v-if="!isNew" class="mb-3">
        <label for="color-id" class="form-label">ID</label>
        <input
          type="text"
          v-model="id"
          placeholder="ID"
          readonly
          id="color-id"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="color-user-id" class="form-label">User ID</label>
        <input
          type="text"
          v-model="color.user_id"
          placeholder="User ID"
          id="color-user-id"
          class="form-control"
          v-bind:class="userIdFormClass"
          v-bind:readonly="!isNew"
        />
        <div class="invalid-feedback">A valid User ID is required!</div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-6 mb-3">
          <label for="color-name" class="form-label">Name</label>
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
        <div class="col-12 col-sm-6 mb-3">
          <label for="color-color" class="form-label">Color</label>
          <input
            type="color"
            v-model="color.color"
            id="color-color"
            class="form-control form-control-color"
            v-bind:class="colorFormClass"
            v-bind:disabled="!isNew"
          />
          <div class="invalid-feedback">A color is required!</div>
        </div>
      </div>
      <router-link to="/admin/colors" class="btn btn-secondary me-1">
        Cancel
      </router-link>
      <button
        type="button"
        v-on:click="createButton()"
        v-if="isNew"
        class="btn btn-primary me-1"
        :disabled="!buttonValid"
      >
        Create
      </button>
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

const NEW_PATH = "new";

export default {
  name: "AdminUserDetail",
  components: {
    ConfirmationModal,
  },
  data() {
    return {
      id: "",
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
        this.$store.dispatch("colors/fetchColorById", this.id);
      } else {
        this.$router.push({ name: "AdminColors" });
      }
    } else {
      // clear any values already in this variable
      this.setColor({});
    }
  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapState(["currentUserChecked"]),
    ...mapState("colors", ["color"]),
    isNew() {
      return this.id === NEW_PATH;
    },
    userIdFormClass() {
      return this.color.user_id && validate(this.color.user_id)
        ? ""
        : "is-invalid";
    },
    nameFormClass() {
      return this.color.name ? "" : "is-invalid";
    },
    colorFormClass() {
      return this.color.color ? "" : "is-invalid";
    },
    buttonValid() {
      return (
        this.color.user_id &&
        validate(this.color.user_id) &&
        this.color.name &&
        this.color.color
      );
    },
  },
  methods: {
    ...mapMutations("colors", ["setColor"]),
    createButton() {
      this.confirmedMethod = "create";
      this.confirmationTitle = "Create new color?";
      this.confirmationBody = "Are you sure you want to create this color?";
      this.confirmationButton = "Create";
      this.confirmationButtonClass = "btn-primary";
      this.toggleVisible();
    },
    updateButton() {
      this.confirmedMethod = "update";
      this.confirmationTitle = "Update color?";
      this.confirmationBody = "Are you sure you want to update this color?";
      this.confirmationButton = "Update";
      this.confirmationButtonClass = "btn-warning";
      this.toggleVisible();
    },
    deleteButton() {
      this.confirmedMethod = "delete";
      this.confirmationTitle = "Delete color?";
      this.confirmationBody = "Are you sure you want to delete this color?";
      this.confirmationButton = "Delete";
      this.confirmationButtonClass = "btn-danger";
      this.toggleVisible();
    },
    toggleVisible() {
      this.confirmationVisible = !this.confirmationVisible;
    },
    confirmedDeleteButton() {
      const newColor = {
        user_id: this.color.user_id,
        name: this.color.name,
        color: this.color.color,
      };
      switch (this.confirmedMethod) {
        case "create":
          this.$store.dispatch("colors/createColor", newColor);
          break;
        case "update":
          newColor.id = this.color.id;
          this.$store.dispatch("colors/updateColor", newColor);
          break;
        case "delete":
          this.$store.dispatch("colors/deleteColor", this.id);
          break;
      }
    },
  },
};
</script>
