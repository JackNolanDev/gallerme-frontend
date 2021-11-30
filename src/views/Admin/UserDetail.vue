<template>
  <div class="container">
    <div v-if="isNew">
      <h1 class="text-center mt-2">New User</h1>
    </div>
    <h1 v-else class="text-center mt-2">User Details</h1>
    <form>
      <div v-if="!isNew" class="mb-3">
        <label for="user-id" class="form-label">ID</label>
        <input
          type="text"
          v-model="id"
          placeholder="ID"
          readonly
          id="user-id"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="user-username" class="form-label">Username</label>
        <input
          type="text"
          v-model="user.username"
          placeholder="Username"
          id="user-username"
          class="form-control"
          v-bind:class="usernameFormClass"
          autocomplete="username"
        />
        <div class="invalid-feedback">Username is required!</div>
      </div>
      <div v-if="isNew" class="mb-3">
        <label for="user-password" class="form-label">Password</label>
        <input
          type="password"
          v-model="user.password"
          placeholder="Password"
          id="user-password"
          class="form-control"
          v-bind:class="passwordFormClass"
          autocomplete="new-password"
        />
        <div class="invalid-feedback">Password is required!</div>
      </div>
      <div class="mb-3">
        <label for="user-email" class="form-label">Email</label>
        <input
          type="text"
          v-model="user.email"
          placeholder="Email"
          id="user-email"
          class="form-control"
          v-bind:class="emailFormClass"
        />
        <div class="invalid-feedback">An email is required!</div>
      </div>
      <div class="mb-3">
        <label class="form-check-label">User Type</label>
        <div class="form-check">
          <input
            type="radio"
            v-model="user.role"
            value="USER"
            name="role-radio"
            id="user-option"
            class="form-check-input"
            v-bind:class="roleFormClass"
          />
          <label class="form-check-label" for="user-option">
            <i class="fas fa-user"></i> User
          </label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            v-model="user.role"
            value="ADMIN"
            name="role-radio"
            id="admin-option"
            class="form-check-input"
            v-bind:class="roleFormClass"
          />
          <label class="form-check-label" for="admin-option">
            <i class="fas fa-chess-king"></i> Admin
          </label>
          <div class="invalid-feedback">A role is required!</div>
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-12 col-md-6 mb-3 mb-md-0">
          <label for="user-first-name" class="form-label">
            First Name (Not Required)
          </label>
          <input
            type="text"
            v-model="user.first_name"
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
            v-model="user.last_name"
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
          v-model="user.date_of_birth"
          id="user-dob"
          class="form-control"
        />
      </div>
      <router-link to="/admin/users" class="btn btn-secondary me-1">
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
import { mapState, mapMutations } from "vuex";
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
    this.id = this.$route.params.id;
    if (!this.isNew) {
      if (validate(this.id)) {
        this.$store.dispatch("users/fetchUserById", this.id);
      } else {
        this.$router.push({ name: "AdminUsers" });
      }
    } else {
      // clear any values already in this variable
      this.setUser({});
    }
  },
  computed: {
    ...mapState("users", ["user"]),
    isNew() {
      return this.id === NEW_PATH;
    },
    usernameFormClass() {
      return this.user.username ? "" : "is-invalid";
    },
    passwordFormClass() {
      return this.user.password ? "" : "is-invalid";
    },
    emailFormClass() {
      return this.user.email ? "" : "is-invalid";
    },
    roleFormClass() {
      return this.user.role === "USER" || this.user.role === "ADMIN"
        ? ""
        : "is-invalid";
    },
    buttonValid() {
      return (
        (!this.isNew || this.user.password) &&
        this.user.username &&
        this.user.email &&
        (this.user.role === "USER" || this.user.role === "ADMIN")
      );
    },
  },
  methods: {
    ...mapMutations("users", ["setUser"]),
    createButton() {
      this.confirmedMethod = "create";
      this.confirmationTitle = "Create new user?";
      this.confirmationBody = "Are you sure you want to create this user?";
      this.confirmationButton = "Create";
      this.confirmationButtonClass = "btn-primary";
      this.toggleVisible();
    },
    updateButton() {
      this.confirmedMethod = "update";
      this.confirmationTitle = "Update user?";
      this.confirmationBody = "Are you sure you want to update this user?";
      this.confirmationButton = "Update";
      this.confirmationButtonClass = "btn-warning";
      this.toggleVisible();
    },
    deleteButton() {
      this.confirmedMethod = "delete";
      this.confirmationTitle = "Delete user?";
      this.confirmationBody = "Are you sure you want to delete this user?";
      this.confirmationButton = "Delete";
      this.confirmationButtonClass = "btn-danger";
      this.toggleVisible();
    },
    toggleVisible() {
      this.confirmationVisible = !this.confirmationVisible;
    },
    confirmedDeleteButton() {
      const newUser = {
        username: this.user.username,
        email: this.user.email,
        role: this.user.role,
      };
      if (this.user.first_name) {
        newUser.first_name = this.user.first_name;
      }
      if (this.user.last_name) {
        newUser.last_name = this.user.last_name;
      }
      if (this.user.date_of_birth) {
        newUser.date_of_birth = this.user.date_of_birth;
      }
      switch (this.confirmedMethod) {
        case "create":
          newUser.password = this.user.password;
          this.$store.dispatch("users/createUser", newUser);
          break;
        case "update":
          newUser.id = this.user.id;
          this.$store.dispatch("users/updateUser", newUser);
          break;
        case "delete":
          this.$store.dispatch("users/deleteUser", this.id);
          break;
      }
    },
  },
};
</script>
