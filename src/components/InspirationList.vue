<template>
  <div class="list-group">
    <div
      v-for="(item, index) in inspiration"
      v-bind:key="index"
      class="list-group-item"
    >
      <div class="row">
        <div class="col-12 col-sm-6">
          <img
            v-if="item.image_id"
            v-bind:src="imageURL(item.image_id)"
            v-bind:alt="item.title"
            class="aicImage"
          />
        </div>
        <div class="col-12 col-sm-6">
          <h5 class="mt-2">{{ item.title }}</h5>
          <p v-if="item.artist_title" class="text-muted">
            By {{ item.artist_title }}
          </p>
          <p v-if="item.date_display" class="text-muted">
            {{ item.date_display }}
          </p>
          <p v-if="item.medium_display" class="text-muted">
            Medium: {{ item.medium_display }}
          </p>
          <p>
            <a v-bind:href="aicLink(item.id)" target="_blank">
              View on Art Institute of Chicago's website
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InspirationList",
  computed: {
    ...mapState("art", ["inspiration"]),
  },
  methods: {
    imageURL(image_id) {
      return `https://www.artic.edu/iiif/2/${image_id}/full/600,/0/default.jpg`;
    },
    aicLink(id) {
      return `https://www.artic.edu/artworks/${id}`;
    },
  },
};
</script>

<style scoped>
.aicImage {
  width: 100%;
  height: auto;
}
</style>
