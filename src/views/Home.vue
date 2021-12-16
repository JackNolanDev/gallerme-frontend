<template>
  <div>
    <div class="container home">
      <h1 class="display-1 text-center mt-2">GALLERME</h1>
      <p class="text-center">A Pixel Art Website</p>
      <div
        v-if="alertVisible"
        class="alert alert-primary alert-dismissible"
        role="alert"
      >
        Check out our <router-link to="/privacy">Privacy Policy</router-link>
        <button
          type="button"
          v-on:click="toggleAlert()"
          class="btn-close"
          aria-label="Close"
        ></button>
      </div>
      <art-list class="mb-5" />
    </div>
    <Footer />
  </div>
</template>

<script>
import ArtList from "../components/ArtList.vue";
import Footer from "../components/Footer.vue";
export default {
  components: { ArtList, Footer },
  name: "Home",
  data() {
    return {
      alertVisible: false,
    };
  },
  beforeMount() {
    this.$store.dispatch("art/fetchHomeArt");
    if (localStorage.getItem("viewedPrivacyPolicy") !== "true") {
      this.alertVisible = true;
    }
  },
  methods: {
    toggleAlert() {
      this.alertVisible = !this.alertVisible;
    },
  },
};
</script>

<style>
.home {
  position: relative;
  min-height: calc(100vh - 120px);
}
</style>
