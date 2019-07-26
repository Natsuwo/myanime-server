<template>
  <v-app dark style="background: #2d3a4b;">
    <v-layout v-if="$store.state.loading === true" row wrap justify-center align-center>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-if="$store.state.loading === false" row wrap justify-center align-center>
      <v-content class="text-xs-center">
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </v-layout>
  </v-app>
</template>

<script>
import Authentication from "@/services/Authentication";
export default {
  async mounted() {
    try {
      var checkUser = await Authentication.checkUserToken();
      if (checkUser.success === false) {
        return this.$store.commit("loading", false);
      }
      this.$store.dispatch("loginActions", true);
    } catch (err) {
      console.log(err.message);
    }
  }
};
</script>
