<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-form enctype="multipart/form-data">
          <v-card-text>
            <v-text-field v-model="key" label="Name" prepend-icon="mdi-format-title"></v-text-field>
            <img :src="imageUrl" height="150" v-if="imageUrl" />
            <v-file-input v-model="value" type="file" accept="image/*" label="Flag"></v-file-input>
            <v-textarea
              v-model="description"
              prepend-icon="mdi-file-document-edit"
              name="input-7-1"
              label="Descriptions"
            ></v-textarea>
            <v-btn @click="submit" :loading="loading" :disabled="loading" color="primary">Submit</v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
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
      imageUrl: "",
      loading: false,
      title: "Add new (Language)"
    };
  },
  methods: {
    ...mapMutations("snackbar", ["snackBar"]),
    ...mapActions("term", ["addNew"]),
    async submit() {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      this.loading = true;
      var formData = new FormData();
      formData.append("type", "language");
      formData.append("key", this.key);
      formData.append("value", this.value);
      formData.append("description", this.description);
      var response = await this.addNew({ headers, formData });
      this.snackBar({ active: true, message: response });
      this.loading = false;
      if (response.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/language/edit/${response.data.term_id}`
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