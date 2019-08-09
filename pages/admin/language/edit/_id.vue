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
          <v-img class="term-flag" :src="imageUrl" width="42px" v-if="imageUrl"></v-img>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="key" label="Name" prepend-icon="mdi-format-title"></v-text-field>
          <v-file-input v-model="value" type="file" accept="image/*" label="Avatar"></v-file-input>
          <v-textarea
            v-model="description"
            name="input-7-1"
            label="Descriptions"
            prepend-icon="mdi-file-document-edit"
          ></v-textarea>
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
      value: [],
      description: "",
      messages: "",
      snackbar: false,
      imageUrl: "",
      title: "Edit language"
    };
  },
  async created() {
    try {
      var term_id = this.$route.params.id;
      var form = {
        type: "language",
        term_id
      };
      var data = (await TermServices.getSingle(form)).data;
      this.key = data.key;
      this.description = data.description;
      this.imageUrl = data.value;
      this.value = [
        {
          name: data.value
            .split("/upload/image/")
            .splice(1)
            .join()
        }
      ];
    } catch (err) {
      this.$router.push({ path: "/admin/language/edit" });
    }
  },
  methods: {
    async submit() {
      var formData = new FormData();
      formData.append("term_id", this.$route.params.id);
      formData.append("type", "language");
      formData.append("key", this.key);
      formData.append("value", this.value || this.imageUrl);
      formData.append("description", this.description);

      this.messages = await TermServices.update(formData);
      this.snackbar = true;
    },
    async deleteTerm() {
      var form = {
        type: "language",
        term_id: this.$route.params.id
      };
      this.messages = await TermServices.deleteTerm(form);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/language/edit" });
        }, 1000);
      }
    }
  },
  watch: {
    key(val) {
      this.title = `Edit language (${val})`;
    },
    value(file) {
      if (file && file.length === undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
        });
      }
      if (!file) {
        this.imageUrl = "";
      }
    }
  }
};
</script>
<style scoped>
.term-flag {
  position: absolute;
  right: 10px;
}
</style>
