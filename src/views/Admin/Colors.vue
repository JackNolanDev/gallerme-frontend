<template>
  <div class="container">
    <h1 class="text-center mt-2">Colors</h1>
    <router-link to="/admin/colors/new" class="btn btn-primary">
      Create New Color
    </router-link>
    <color-list class="mt-2" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ColorList from "../../components/ColorList.vue";

export default {
  name: "AdminColors",
  components: {
    ColorList,
  },
  beforeMount() {
    if (this.currentUserChecked && !this.isAdmin) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("colors/fetchColors");
  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapState(["currentUserChecked"]),
  },
};
</script>
