<template>
  <div class="d-flex align-items-center">
    <div
      v-bind:style="{ backgroundColor: color.color }"
      class="colorSquare me-2"
    ></div>
    <div>{{ color.name }}</div>
  </div>
</template>

<script>
export default {
  name: "DisplayColor",
  props: {
    color: Object,
  },
};
</script>

<style scoped>
.colorSquare {
  width: 50px;
  height: 50px;
}
</style>
