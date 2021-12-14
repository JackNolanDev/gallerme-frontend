<template>
  <div class="container">
    <h1 class="display-3 text-center mt-2">Explore</h1>
    <div class="row mt-5">
      <div class="col-0 col-lg-1 col-xl-2 col-xxl-3"></div>
      <div class="col-12 col-lg-10 col-xl-8 col-xxl-6">
        <label for="searchArtForm" class="form-label">Search for art</label>
        <form class="row">
          <div class="form-group mb-2 col-8">
            <input
              type="text"
              id="searchArtForm"
              v-model="searchArtField"
              class="form-control"
              placeholder="Search term"
            />
          </div>
          <div class="mb-2 col-4">
            <button
              type="button"
              v-bind:disabled="searchArtButtonDisabled"
              v-on:click="searchArtButton()"
              class="btn btn-primary col-12"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div class="col-0 col-lg-1 col-xl-2 col-xxl-3"></div>
    </div>
    <div v-if="searched" class="mt-3">
      <h5 class="text-center">Results</h5>
      <art-list class="mt-3" />
    </div>
  </div>
</template>

<script>
import ArtList from "../components/ArtList.vue";
export default {
  components: { ArtList },
  name: "Home",
  data() {
    return {
      searchArtField: "",
      previousSearch: "",
      searched: false,
    };
  },
  beforeMount() {
    if (this.$route.query.term) {
      this.searchArtField = this.$route.query.term;
      // automatically search
      this.searchArtButton();
    }
  },
  computed: {
    searchArtButtonDisabled() {
      return (
        this.searchArtField === "" ||
        this.searchArtField === this.previousSearch
      );
    },
  },
  methods: {
    searchArtButton() {
      if (this.$route.query.term !== this.searchArtField) {
        this.$router.push({
          name: "Explore",
          query: { term: this.searchArtField },
        });
      }
      this.searched = true;
      this.previousSearch = this.searchArtField;
      this.$store.dispatch("art/searchForArt", this.searchArtField);
    },
  },
};
</script>
