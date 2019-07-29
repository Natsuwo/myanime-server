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
            <v-text-field
              label="Select Image"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="mdi-attachment"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
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
      description: "",
      messages: "",
      snackbar: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      title: "Add new (Languages)"
    };
  },
  methods: {
    async submit() {
      var formData = new FormData();
      formData.append("term_id", this.$route.params.id);
      formData.append("type", "language");
      formData.append("key", this.key);
      formData.append("value", this.imageFile);
      formData.append("description", this.description);

      this.messages = await TermServices.post(formData);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/language/edit/${this.messages.term_id}`
          });
        }, 1000);
      }
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  }
};
</script>