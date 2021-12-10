<template>
  <div class="container">
    <h1 class="text-center mt-2">Art</h1>
    <router-link to="/admin/art/new" class="btn btn-primary">
      Create New Art
    </router-link>
    <art-list class="mt-2" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ArtList from "../../components/ArtList.vue";

export default {
  name: "AdminArt",
  components: {
    ArtList,
  },
  beforeMount() {
    if (this.currentUserChecked && !this.isAdmin) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("art/fetchAllArt");
  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapState(["currentUserChecked"]),
  },
};
</script>
