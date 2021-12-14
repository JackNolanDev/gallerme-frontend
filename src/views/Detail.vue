<template>
  <div class="container">
    <h1 class="display-4 text-center mt-2">{{ art.name }}</h1>
    <div class="mt-2 art mx-auto">
      <display-art :art="art" />
      <p class="text-end fs-5">
        By
        <router-link :to="{ name: 'PublicProfile', params: { id: user.id } }">{{
          user.username
        }}</router-link>
      </p>
    </div>
    <div>
      <h3 class="text-center mt-2">Saved Colors in this art</h3>
      <color-list />
    </div>
    <div>
      <h3 class="text-center mt-2">Possible Inspirations</h3>
      <p class="text-center">
        (Public domain from
        <a href="https://www.artic.edu/">the Art Institute of Chicago</a>)
      </p>
      <inspiration-list />
    </div>
  </div>
</template>

<script>
import { validate } from "uuid";
import { mapState } from "vuex";
import DisplayArt from "../components/DisplayArt.vue";
import ColorList from "../components/ColorList.vue";
import InspirationList from "../components/InspirationList.vue";

export default {
  components: { DisplayArt, ColorList, InspirationList },
  name: "Detail",
  beforeMount() {
    this.id = this.$route.params.id;
    if (validate(this.id)) {
      this.$store.dispatch("art/fetchArtById", this.id);
      this.$store.dispatch("users/fetchUserByArtId", this.id);
      this.$store.dispatch("colors/fetchColorsByArtId", this.id);
    }
  },
  computed: {
    ...mapState("art", ["art"]),
    ...mapState("users", ["user"]),
  },
};
</script>

<style scoped>
.art {
  max-width: 518px;
}
</style>
