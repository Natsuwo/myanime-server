<template>
  <v-layout row wrap justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="messages.success ? 'green' : 'red'">
      <span>{{messages.success ? messages.message : messages.error}}</span>
      <v-btn text @click="snackbar = false" color="white">Close</v-btn>
    </v-snackbar>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="key" label="Name"></v-text-field>
          <v-textarea v-model="description" name="input-7-1" label="Descriptions"></v-textarea>
          <v-btn @click="submit" color="primary">Submit</v-btn>
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
      title: "Add new (Season)"
    };
  },
  methods: {
    async submit() {
      var form = {
        type: "season",
        key: this.key,
        description: this.description
      };
      this.messages = await TermServices.post(form);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/season/edit/${this.messages.term_id}`
          });
        }, 1000);
      }
    }
  }
};
</script>