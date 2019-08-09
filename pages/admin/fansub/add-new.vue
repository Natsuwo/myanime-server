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
        <v-form enctype="multipart/form-data">
          <v-card-text>
            <v-text-field v-model="key" label="Name" prepend-icon="mdi-format-title"></v-text-field>
            <img :src="imageUrl" height="150" v-if="imageUrl" />
            <v-file-input v-model="value" type="file" accept="image/*" label="Avatar"></v-file-input>
            <v-textarea
              v-model="description"
              prepend-icon="mdi-file-document-edit"
              name="input-7-1"
              label="Descriptions"
            ></v-textarea>
            <v-btn @click="submit" color="primary">Submit</v-btn>
          </v-card-text>
        </v-form>
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
      value: [],
      description: "",
      messages: "",
      snackbar: false,
      imageUrl: "",
      title: "Add new (Fansub)"
    };
  },
  methods: {
    async submit() {
      var formData = new FormData();
      formData.append("type", "fansub");
      formData.append("key", this.key);
      formData.append("value", this.value);
      formData.append("description", this.description);

      this.messages = await TermServices.post(formData);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/fansub/edit/${this.messages.term_id}`
          });
        }, 1000);
      }
    }
  },
  watch: {
    value(file) {
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
        });
      }
      this.imageUrl = "";
    }
  }
};
</script>