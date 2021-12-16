<template>
  <div>
    <div class="list-group">
      <router-link
        v-for="(color, index) in colors"
        v-bind:key="index"
        :to="{ name: linkName, params: { id: color.id } }"
        class="list-group-item list-group-item-action"
      >
        <display-color :color="color" />
      </router-link>
    </div>
    <h3 v-if="colors.length === 0" class="text-center mt-5 mb-5">
      (No colors)
    </h3>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DisplayColor from "./DisplayColor.vue";

export default {
  name: "ColorList",
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DisplayColor,
  },
  computed: {
    ...mapState("colors", ["colors"]),
    linkName() {
      return this.isAdmin ? "AdminColorDetail" : "ColorDetails";
    },
  },
};
</script>
