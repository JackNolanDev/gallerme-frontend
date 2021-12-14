<template>
  <div class="container">
    <h1 class="display-4 text-center mt-2">{{ user.username }}</h1>
    <h2 class="mt-5">Artworks created by {{ displayName }}</h2>
    <art-list />
    <h2 class="mt-5">Colors saved by {{ displayName }}</h2>
    <color-list />
  </div>
</template>

<script>
import { validate } from "uuid";
import { mapState } from "vuex";
import ColorList from "../components/ColorList.vue";
import ArtList from "../components/ArtList.vue";

export default {
  components: { ColorList, ArtList },
  name: "PublicProfile",
  beforeMount() {
    this.id = this.$route.params.id;
    if (validate(this.id)) {
      this.$store.dispatch("users/fetchUserById", this.id);
      this.$store.dispatch("art/fetchArtByUserId", this.id);
      this.$store.dispatch("colors/fetchColorsByUserId", this.id);
    } else {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    ...mapState("users", ["user"]),
    displayName() {
      if (!this.user.first_name && !this.user.last_name) {
        return this.user.username;
      }
      return `${this.user.first_name} ${this.user.last_name}`;
    },
  },
};
</script>
