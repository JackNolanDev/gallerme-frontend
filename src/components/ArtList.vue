<template>
  <div class="artList">
    <router-link
      v-for="(art, index) in artList"
      v-bind:key="index"
      :to="{ name: linkName, params: { id: art.id } }"
    >
      <art-card :art="art" />
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArtCard from "./ArtCard.vue";

export default {
  name: "ArtList",
  props: {
    linkName: {
      type: String,
      default: "AdminArtDetail",
    },
    width: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ArtCard,
  },
  computed: {
    ...mapState("art", ["artList"]),
    artListStype() {
      return this.width !== 0
        ? { gridTemplateColumns: `repeat(${this.width}, 1fr)` }
        : {};
    },
  },
};
</script>

<style scoped>
.artList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 30px;
}
@media (max-width: 992px) {
  .artList {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .artList {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
