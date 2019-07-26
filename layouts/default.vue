<template>
  <v-app dark>
    <v-layout v-if="$store.state.loading === true" row wrap justify-center align-center>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>
    <template v-if="$store.state.loading === false">
      <NavBar />
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </template>
  </v-app>
</template>

<script>
import NavBar from "@/components/main/default/NavBar";
import Authentication from "@/services/Authentication";
export default {
  components: {
    NavBar
  },
  async mounted() {
    try {
      var checkUser = await Authentication.checkUserToken();
      if (checkUser.success === false) {
        this.$store.commit("logout", true);
        return this.$router.push({ path: "/" });
      }
      this.$store.dispatch("loginActions", true);
    } catch (err) {
      console.log(err.message);
    }
  }
};
</script>
<style>
.text-control {
  text-decoration: none;
  color: white;
}
.text-control:hover {
  text-decoration: underline;
  color: lightblue;
}

.delete-post:hover {
  cursor: pointer;
  color: lightblue;
  text-decoration: underline;
}
.term-flag {
  width: 21px;
}
</style>
