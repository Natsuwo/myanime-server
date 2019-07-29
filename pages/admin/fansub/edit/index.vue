<template>
  <div>
    <h1>{{ title }} ({{ count }})</h1>
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
      <template v-slot:item.name="{ item }">
        <b>{{ item.name }}</b>
        <v-tooltip v-if="item.trusted" top color="#1d850e">
          <template v-slot:activator="{ on }">
            <v-icon class="trusted-flag" v-on="on">mdi-check-circle</v-icon>
          </template>
          <span>Trusted</span>
        </v-tooltip>
      </template>
      <template v-slot:item.cover="{ item }">
        <v-avatar>
          <v-img width="50" height="50" :src="item.cover"></v-img>
        </v-avatar>
      </template>
      <template v-slot:item.banner="{ item }">
        <v-img class="my-1" width="175px" :src="item.banner"></v-img>
      </template>
      <template v-slot:item.control="{ item }">
        <v-icon @click="editFansub(item.fansub_id)">mdi-pencil</v-icon>
        <v-icon @click="removeFansub(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-4">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
    </div>
  </div>
</template>

<script>
import FansubServices from "@/services/Fansub";
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
        { text: "Name", value: "name", sortable: true, align: "left" },
        { text: "cover", value: "cover", sortable: false, align: "left" },
        { text: "banner", value: "banner", sortable: false, align: "left" },
        {
          text: "followers",
          value: "followers",
          sortable: true,
          align: "right"
        },
        {
          text: "Animes Translated",
          value: "count",
          sortable: true,
          align: "right"
        },
        { text: "Controls", value: "control", sortable: false, align: "right" }
      ]
    };
  },
  async created() {
    var fansub = await FansubServices.get();
    this.terms = fansub.data;
    this.count = fansub.count;
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
    async removeFansub(item) {
      const index = this.terms.indexOf(item);
      if (index >= 0) this.terms.splice(index, 1);
      var form = {
        fansub_id: item.fansub_id
      };
      await FansubServices.removeFansub(form);
      this.count--;
    },
    async editFansub(id) {
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
