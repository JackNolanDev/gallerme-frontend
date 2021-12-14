<template>
  <div>
    <div class="artList" v-bind:style="artListStyle">
      <router-link
        v-for="(art, index) in artList"
        v-bind:key="index"
        :to="{ name: linkName, params: { id: art.id } }"
      >
        <art-card :art="art" />
      </router-link>
    </div>
    <h3 v-if="artList.length === 0" class="text-center mt-5 mb-5">(No art)</h3>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArtCard from "./ArtCard.vue";

export default {
  name: "ArtList",
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
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
    linkName() {
      return this.isAdmin ? "AdminArtDetail" : "Detail";
    },
    artListStyle() {
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
  grid-template-columns: repeat(5, 1fr);
  column-gap: 40px;
  row-gap: 40px;
}
@media (max-width: 1400px) {
  .artList {
    column-gap: 30px;
    grid-template-columns: repeat(4, 1fr);
  }
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
