<template>
  <div>
    <h1 class="py-3">{{ title }} ({{ count }})</h1>
    <v-btn :to="'add-new'" color="primary">Add New</v-btn>
    <div class="text-center">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
      <div class="layout">
        <v-spacer></v-spacer>
        <v-flex xs6 pt-3>
          <!-- <v-text-field
            @input="searchTimeOut(onPageChange)"
            v-model="search"
            solo-inverted
            clearable
            label="Search drive ID or file name (you can search a multi value)"
            append-icon="search"
          ></v-text-field>-->
        </v-flex>
        <v-spacer></v-spacer>
      </div>
    </div>
    <v-data-table
      :items="terms"
      :headers="headers"
      class="elevation-1 my-table"
      hide-default-footer
    >
      <template v-slot:item.value="{ item }">
        <v-avatar>
          <v-img width="45" :src="item.value"></v-img>
        </v-avatar>
      </template>
      <template v-slot:item.control="{ item }">
        <v-icon @click="editTerm(item.term_id)">mdi-pencil</v-icon>
        <v-icon @click="deleteTerm(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-4">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
    </div>
  </div>
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
      title: "Fansubs",
      terms: [],
      count: 0,
      headers: [
        { text: "Name", value: "key", sortable: true, align: "left" },
        { text: "Avatar", value: "value", sortable: true, align: "left" },
        {
          text: "Description",
          value: "description",
          sortable: true,
          align: "left"
        },
        { text: "Controls", value: "control", sortable: false, align: "right" }
      ]
    };
  },
  async created() {
    var type = "fansub";
    var data = await TermServices.get(type);
    this.terms = data.data;
    this.count = data.count;
  },
  methods: {
    async searchTimeOut(cb) {},
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
      const index = this.terms.indexOf(item);
      if (index >= 0) this.terms.splice(index, 1);
      var form = {
        type: "fansub",
        term_id: item.term_id
      };
      await TermServices.deleteTerm(form);
      this.count--;
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
