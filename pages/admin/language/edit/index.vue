<template>
  <div>
    <h1 class="py-3">{{ title }} ({{ count }})</h1>
    <v-btn :to="'add-new'" color="primary">Add New</v-btn>
    <no-ssr>
      <v-data-table :items="terms" :headers="headers" class="elevation-1 my-table mt-3">
        <template v-slot:item.value="{ item }">
          <v-img width="45" :src="item.value"></v-img>
        </template>
        <template v-slot:item.control="{ item }">
          <v-icon @click="editTerm(item.term_id)">mdi-pencil</v-icon>
          <v-icon @click="deleteTerm(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </no-ssr>
  </div>
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
      title: "Languages",
      headers: [
        { text: "Name", value: "key", sortable: true, align: "left" },
        { text: "Flag", value: "value", sortable: true, align: "left" },
        { text: "Controls", value: "control", sortable: false, align: "right" }
      ]
    };
  },
  computed: {
    terms() {
      return this.$store.state.term.terms.filter(x => x.type === "language");
    }
  },
  created() {
    this.count = this.terms.length;
  },
  methods: {
    getTime(time) {
      var date = new Date(time);
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = date.getFullYear();
      var expired = mm + "/" + dd + "/" + yyyy;
      if (isNaN(mm, dd, yyyy)) {
        expired = "Never";
      }
      return expired;
    },
    async deleteTerm(item) {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var form = {
        type: "language",
        term_id: item.term_id
      };
      var response = await this.$store.dispatch("term/deleteTerm", {
        item,
        headers,
        form
      });
      if (response.success) {
        this.count--;
      }
    },
    editTerm(id) {
      this.$router.push({ path: `edit/${id}` });
    }
  }
};
</script>


<style scoped>
.text-control {
  text-decoration: none;
  color: white;
}
.text-control:hover {
  text-decoration: underline;
  color: lightblue;
}
</style>
