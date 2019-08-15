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
      title: "Add new (Studio)"
    };
  },
  methods: {
    async submit() {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var formData = {
        type: "studio",
        key: this.key,
        description: this.description
      };
      var response = await this.$store.dispatch("term/addNew", {
        headers,
        formData
      });
      if (response.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/studio/edit/${response.data.term_id}`
          });
        }, 1000);
      }
    }
  }
};
</script>