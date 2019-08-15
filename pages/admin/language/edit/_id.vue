<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-img class="term-flag" :src="imageUrl" width="42px" v-if="imageUrl"></v-img>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="dataEdit.key" label="Name" prepend-icon="mdi-format-title"></v-text-field>
          <v-file-input v-model="flag" type="file" accept="image/*" label="Flag"></v-file-input>
          <v-textarea
            v-model="dataEdit.description"
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
export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      dataEdit: {},
      flag: [],
      imageUrl: "",
      title: "Edit language",
      headers: { "X-User-Session": this.$store.state.auth.userToken }
    };
  },
  computed: {
    term() {
      var term_id = this.$route.params.id;
      return this.$store.state.term.terms.find(
        x => x.term_id === parseInt(term_id)
      );
    }
  },
  async created() {
    this.dataEdit = JSON.parse(JSON.stringify(this.term));
    this.imageUrl = this.dataEdit.value;
  },
  methods: {
    async submit() {
      var formData = new FormData();
      formData.append("value", this.flag.size ? this.flag : this.imageUrl);
      formData.append("data", JSON.stringify(this.dataEdit));

      await this.$store.dispatch("term/update", {
        item: this.term,
        headers: this.headers,
        formData
      });
    },
    async deleteTerm() {
      var form = { type: "language", term_id: this.$route.params.id };
      var response = await this.$store.dispatch("term/deleteTerm", {
        item: this.term,
        headers: this.headers,
        form
      });

      if (response.success) {
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
