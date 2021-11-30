<template>
  <div class="modal fade" v-bind:class="showModalClass" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            v-on:click="toggleVisible()"
            class="btn-close"
          ></button>
        </div>
        <div class="modal-body">{{ body }}</div>
        <div class="modal-footer">
          <button
            type="button"
            v-on:click="toggleVisible()"
            class="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            v-on:click="primaryButton"
            class="btn"
            v-bind:class="primaryButtonClass"
          >
            {{ primaryButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    visible: Boolean,
    title: String,
    body: String,
    primaryButtonText: {
      type: String,
      default: "Confirm",
    },
    primaryButtonClass: {
      type: String,
      default: "btn-primary",
    },
  },
  computed: {
    showModalClass() {
      return this.visible ? "show showModal" : "";
    },
  },
  methods: {
    toggleVisible() {
      this.$emit("toggleVisible");
    },
    primaryButton() {
      this.$emit("toggleVisible");
      this.$emit("primaryButton");
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
