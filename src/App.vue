<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
  mounted() {
    this.$store.dispatch("fetchCurrentUser");
  },
};
</script>

<style>
/* // NOTE: Originally for adding a footer, but I decided it looked silly so it was removed
#app {
  position: relative;
  min-height: 100vh;
}*/
</style>
