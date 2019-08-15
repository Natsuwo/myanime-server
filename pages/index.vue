<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs6>
      <h1>Backend Myanime</h1>
      <v-form @keyup.native.enter="submit">
        <v-text-field v-model="email" label="email" prepend-icon="mdi-account"></v-text-field>
        <v-text-field v-model="password" type="password" label="Password" prepend-icon="mdi-lock"></v-text-field>
        <v-text-field v-model="pin" type="password" label="Pin" prepend-icon="mdi-lock"></v-text-field>
        <v-btn color="green" @click="submit">Login</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { signIn } from "@/services/Authentication";
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
      pin: ""
    };
  },
  created() {
    if (this.$store.state.auth.isLogin) {
      return this.$router.push({ path: "/admin" });
    }
  },
  methods: {
    async submit() {
      var form = {
        email: this.email,
        password: this.password
      };
      var login = (await signIn(form)).data;

      if (login.success) {
        this.$cookies.set("USER_ACCESS_TOKEN", login.access, {
          path: "/",
          maxAge: 60 * 60 * 24 * 1
        });
        this.$store.commit("setAuth", {
          isLogin: true,
          token: login.access,
          user_id: login.user.user_id
        });
        return this.$router.push({ path: "/admin" });
      }
    }
  },
  layout: "index"
};
</script>
