<template>
  <div class="container">
    <h1 class="text-center mt-2">Art</h1>
    <router-link to="/admin/art/new" class="btn btn-primary">
      Create New Art
    </router-link>
    <div class="list-group mt-2">
      <router-link
        v-for="(art, index) in artList"
        v-bind:key="index"
        :to="{ name: 'AdminArtDetail', params: { id: art.id } }"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <display-art v-bind:art="art" class="art me-2" />
        <div>{{ art.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DisplayArt from "../../components/DisplayArt.vue";

export default {
  name: "AdminArt",
  components: {
    DisplayArt,
  },
  beforeMount() {
    if (!this.isAdmin) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("art/fetchAllArt");
  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapState("art", ["artList"]),
  },
};
</script>

<style scoped>
.art {
  width: 200px;
}
</style>
