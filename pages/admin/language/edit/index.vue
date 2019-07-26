<template>
  <div>
    <h1 class="py-3">{{ title }} ({{ count }})</h1>
    <v-btn :to="'add-new'" color="primary">Add New</v-btn>
    <!-- <div class="text-xs-center">
      <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination>
      <div class="layout">
        <v-spacer></v-spacer>
        <v-flex xs6 pt-3>
          <v-text-field
            @input="searchTimeOut(onPageChange)"
            v-model="search"
            solo-inverted
            clearable
            label="Search drive ID or file name (you can search a multi value)"
            append-icon="search"
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
      </div>
    </div>-->
    <v-data-table :items="terms" :headers="headers" class="elevation-1 my-table" hide-actions>
      <template v-slot:items="props">
        <td>{{ props.item.key }}</td>
        <td>
          <v-img class="term-flag" :src="props.item.value"></v-img>
        </td>
        <td class="text-xs-right">{{ props.item.count }}</td>
        <td class="text-xs-right">
          <nuxt-link class="text-control" :to="`/admin/language/edit/${props.item.term_id}`">Edit</nuxt-link>|
          <span class="delete-post" @click="deleteTerm(props.item)">Delete</span>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-4">
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
      title: "Languages",
      terms: [],
      count: 0,
      headers: [
        { text: "Name", value: "key", sortable: true, align: "left" },
        { text: "Flag", value: "value", sortable: true, align: "left" },
        { text: "Counts", value: "count", sortable: true, align: "right" },
        { text: "Controls", sortable: false, align: "right" }
      ]
    };
  },
  async created() {
    var type = "language";
    this.terms = (await TermServices.get(type)).data;
  },
  methods: {
    async onPageChange() {},
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
        type: "language",
        term_id: item.term_id
      };
      await TermServices.deleteTerm(form);
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
