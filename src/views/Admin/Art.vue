<template>
  <div>
    <h1>Admin art page</h1>
  </div>
</template>

<script>
export default {
  name: "AdminArt",
  beforeMount() {
    this.$store.dispatch("fetchAllArt");
  },
};
</script>
