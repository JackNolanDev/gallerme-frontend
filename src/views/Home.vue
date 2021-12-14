<template>
  <div class="container">
    <h1 class="display-1 text-center mt-2">GALLERME</h1>
    <p class="text-center">A Pixel Art Website</p>
    <art-list />
  </div>
</template>

<script>
import ArtList from "../components/ArtList.vue";
export default {
  components: { ArtList },
  name: "Home",
  beforeMount() {
    this.$store.dispatch("art/fetchHomeArt");
  },
};
</script>
