<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Edit season {{dataEdit.key}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="dataEdit.key" label="Name"></v-text-field>
          <v-textarea v-model="dataEdit.description" name="input-7-1" label="Descriptions"></v-textarea>
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
      dataEdit: "",
      title: "Edit season"
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
      var formData = { data: JSON.stringify(this.dataEdit) };
      await this.$store.dispatch("term/update", {
        item: this.term,
        headers: this.headers,
        formData
      });
    },
    async deleteTerm() {
      var form = { type: "season", term_id: this.$route.params.id };
      var response = await this.$store.dispatch("term/deleteTerm", {
        item: this.term,
        headers: this.headers,
        form
      });

      if (response.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/season/edit" });
        }, 1000);
      }
    }
  }
};
</script>