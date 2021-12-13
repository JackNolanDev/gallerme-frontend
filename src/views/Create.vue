<template>
  <div class="container">
    <h1>Make</h1>
    <create-art @published="createButton" />
    <login-modal ref="LoginModal" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CreateArt from "../components/CreateArt.vue";
import LoginModal from "../components/loginModal.vue";

export default {
  name: "Create",
  components: {
    CreateArt,
    LoginModal,
  },
  beforeMount() {
    if (!this.currentUserChecked || this.isLoggedIn) {
      // only fetch if logged in or status unknown
      this.$store.dispatch("colors/fetchColorsForCurrentUser");
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["currentUser", "currentUserChecked"]),
  },
  methods: {
    createButton(art) {
      if (!this.isLoggedIn) {
        this.$refs.LoginModal.toggleVisible();
        return;
      }
      art.user_id = this.currentUser.id;
      this.$store.dispatch("art/createArt", { art, redirectLink: false });
    },
  },
};
</script>
