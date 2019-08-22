<template>
  <v-layout row wrap justify-center align-center>
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
      title: "Add new (Season)"
    };
  },
  methods: {
    async submit() {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var formData = {
        type: "season",
        key: this.key,
        description: this.description
      };
      var response = await this.$store.dispatch("term/addNew", {
        headers,
        formData
      });
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response
      });
      if (response.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/season/edit/${response.data.term_id}`
          });
        }, 1000);
      }
    }
  }
};
</script>