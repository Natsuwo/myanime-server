<template>
  <v-layout row wrap justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="messages.success ? 'green' : 'red'">
      <span>{{messages.success ? messages.message : messages.error}}</span>
      <v-btn flat @click="snackbar = false" color="white">Close</v-btn>
    </v-snackbar>
    <v-flex xs12 md8 md6>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="key" label="Name"></v-text-field>
          <v-textarea v-model="description" name="input-7-1" label="Descriptions"></v-textarea>
          <v-btn @click="submit" color="primary">Update</v-btn>
          <v-btn @click="deleteTerm" color="error">Delete</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import TermServices from "@/services/Term";
export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      key: "",
      description: "",
      messages: "",
      snackbar: false,
      title: "Edit genre"
    };
  },
  async created() {
    try {
      var term_id = this.$route.params.id;
      var form = {
        type: "genre",
        term_id
      };
      var data = (await TermServices.getSingle(form)).data;
      this.key = data.key;
      this.description = data.description;
    } catch (err) {
      this.$router.push({ path: "/admin/genre/edit" });
    }
  },
  methods: {
    async submit() {
      var term_id = this.$route.params.id;
      var form = {
        type: "genre",
        term_id,
        key: this.key,
        description: this.description
      };
      var data = await TermServices.update(form);
      this.snackbar = true;
      this.messages = data;
    },
    async deleteTerm() {
      var form = {
        type: "genre",
        term_id: this.$route.params.id
      };
      this.messages = await TermServices.deleteTerm(form);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/genre/edit" });
        }, 1000);
      }
    }
  },
  watch: {
    key(val) {
      this.title = `Edit genre (${val})`;
    }
  }
};
</script>