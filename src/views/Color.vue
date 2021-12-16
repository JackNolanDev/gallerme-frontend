<template>
  <div class="container">
    <h1 class="display-3 text-center mt-2">Saved colors</h1>
    <color-list class="mt-2" />
  </div>
</template>

<script>
import ColorList from "../components/ColorList.vue";

export default {
  name: "Colors",
  components: {
    ColorList,
  },
  beforeMount() {
    this.$store.dispatch("colors/fetchColorsForCurrentUser");
  },
};
</script>
