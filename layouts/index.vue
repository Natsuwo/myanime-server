<template>
  <v-app dark style="background: #2d3a4b;">
    <v-layout row wrap justify-center align-center>
      <v-content class="text-center">
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
  // async mounted() {
  //   try {
  //     var checkUser = await Authentication.checkUserToken();
  //     if (checkUser.success === false) {
  //       return this.$store.commit("loading", false);
  //     }
  //     this.$store.dispatch("loginActions", true);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
};
</script>
