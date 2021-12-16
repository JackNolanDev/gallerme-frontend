<template>
  <div class="container">
    <h1 class="display-2 text-center mt-2">Privacy Policy</h1>
    <p>GallerMe is primarily a service for creating and sharing pixel art.</p>
    <h3>Information Collection and Use</h3>
    <p>
      When signing up, you must provide some required information, like your
      email, so we can contact you. Providing additional information, like your
      name or birthdate is optional. Note that your name will be publicly
      visible, but your birthdate is not.
    </p>
    <p>
      Anything you enter as the name of a piece of art or a saved color is
      publically visible to all other users of the site.
    </p>
    <h3>Cookies</h3>
    <p>
      GallerMe uses cookies purely for functional / techical reasons, like
      session management and saving unpublished work locally. If you do not have
      cookies enabled, you may not be able to log into the website properly.
    </p>
    <h3>Security</h3>
    <p>
      While GallerMe tries to follow good security practices, like not storing
      passwords in plain text, this website is still a proof of concept and may
      have security flaws that could leak information. As such, you should
      follow regular security practices, like generating a new password for this
      website.
    </p>
    <h3>Links to other sites</h3>
    <p>
      GallerMe occasionally contains links to outside websites. Please note that
      GallerMe does not run these sites and that their privacy policies may
      differ from GallerMe's privacy policy.
    </p>
    <p>
      Also, currently on the details page for an artwork, we get data from the
      Art Institue of Chicago as possible "inspiration" related to the artwork
      you are viewing. GallerMe does not directly control what data is being
      shown here.
    </p>
    <h3>Chages to this Privacy Policy</h3>
    <p>
      Note that chages may be made to this privacy policy in the future. Users
      will be notified, either by email or on the website itself, of any
      changes.
    </p>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  mounted() {
    localStorage.setItem("viewedPrivacyPolicy", true);
  },
};
</script>
