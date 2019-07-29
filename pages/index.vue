<template>
  <v-layout row wrap justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="red">
      <span>{{message}}</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-flex xs6>
      <h1>Backend Myanime</h1>
      <v-form @keyup.native.enter="submit">
        <v-text-field v-model="email" label="email" prepend-icon="mdi-account"></v-text-field>
        <v-text-field v-model="password" type="password" label="Password" prepend-icon="mdi-lock"></v-text-field>
        <v-btn color="green" @click="submit">Login</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import Authentication from "@/services/Authentication";
export default {
  head() {
    return {
      title: "Backend MyAnime"
    };
  },
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      message: ""
    };
  },
  async mounted() {
    if (this.$store.getters.authStatus) {
      return this.$router.push({ path: "/admin" });
    }
  },
  methods: {
    async submit() {
      var form = {
        email: this.email,
        password: this.password
      };
      var login = await Authentication.Login(form);
      if (login.success === true) {
        this.$store.dispatch("loginActions", true);
        return this.$router.push({ path: "/admin" });
      }
      this.snackbar = true;
      this.message = login.error;
    }
  },
  layout: "index"
};
</script>
