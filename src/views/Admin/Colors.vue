<template>
  <div class="container">
    <h1 class="text-center mt-2">Colors</h1>
    <router-link to="/admin/colors/new" class="btn btn-primary">
      Create New Color
    </router-link>
    <div class="list-group mt-2">
      <router-link
        v-for="(color, index) in colors"
        v-bind:key="index"
        :to="{ name: 'AdminColorDetail', params: { id: color.id } }"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <div
          v-bind:style="{ backgroundColor: color.color }"
          class="colorSquare me-2"
        ></div>
        <div>{{ color.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminColors",
  beforeMount() {
    this.$store.dispatch("colors/fetchColors");
  },
  computed: {
    ...mapState("colors", ["colors"]),
  },
};
</script>

<style scoped>
.colorSquare {
  width: 50px;
  height: 50px;
}
</style>
