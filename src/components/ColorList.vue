<template>
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
</template>

<script>
import { mapState } from "vuex";
import DisplayColor from "./DisplayColor.vue";

export default {
  name: "ColorList",
  props: {
    linkName: {
      type: String,
      default: "AdminColorDetail",
    },
  },
  components: {
    DisplayColor,
  },
  computed: {
    ...mapState("colors", ["colors"]),
  },
};
</script>
