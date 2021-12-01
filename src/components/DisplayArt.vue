<template>
  <div v-bind:style="artBoardStyle" class="artBoard">
    <div
      v-for="(pixel, index) in pixels"
      v-bind:key="index"
      v-bind:style="{ backgroundColor: pixel }"
      class="ratio ratio-1x1"
    ></div>
  </div>
</template>

<script>
export default {
  name: "DisplayArt",
  props: {
    art: Object,
  },
  computed: {
    artBoardStyle() {
      return { gridTemplateColumns: `repeat(${this.art.size}, 1fr)` };
    },
    pixels() {
      if (!this.art || !this.art.data) {
        return [];
      }
      const pixelCount = Math.ceil(this.art.data.length / 6);
      const pixels = new Array(pixelCount);
      for (let i = 0, o = 0; i < pixelCount; ++i, o += 6) {
        pixels[i] = "#" + this.art.data.substring(o, o + 6);
      }
      return pixels;
    },
  },
};
</script>

<style scoped>
.artBoard {
  display: grid;
}
</style>
