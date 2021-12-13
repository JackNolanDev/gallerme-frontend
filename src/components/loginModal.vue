<template>
  <div class="modal fade" v-bind:class="showModalClass" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Please log in or sign up!</h5>
          <button
            type="button"
            v-on:click="toggleVisible()"
            class="btn-close"
          ></button>
        </div>
        <div class="modal-body">
          In order to do this action, you must
          <router-link to="/login">log in</router-link> or
          <router-link to="/signup">sign up</router-link>.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            v-on:click="toggleVisible()"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    showModalClass() {
      return this.isVisible ? "show showModal" : "";
    },
  },
  methods: {
    toggleVisible() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style scoped>
.showModal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>
