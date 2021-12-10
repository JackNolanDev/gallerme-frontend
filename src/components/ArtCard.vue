<template>
  <div class="card">
    <DisplayArt :art="art" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ art.name }}</h5>
    </div>
  </div>
</template>

<script>
import DisplayArt from "./DisplayArt.vue";

export default {
  name: "ArtCard",
  props: {
    art: Object,
  },
  components: {
    DisplayArt,
  },
};
</script>
