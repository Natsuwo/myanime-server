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
        <td>
          <b>{{ props.item.name }}</b>
          <v-tooltip v-if="props.item.trusted" top color="#1d850e">
            <template v-slot:activator="{ on }">
              <v-icon class="trusted-flag" v-on="on">check_circle</v-icon>
            </template>
            <span>Trusted</span>
          </v-tooltip>
        </td>
        <td class="py-1">
          <v-avatar>
            <v-img width="50" height="50" :src="props.item.cover"></v-img>
          </v-avatar>
        </td>
        <td class="py-1">
          <v-img :src="props.item.banner"></v-img>
        </td>
        <td class="text-xs-right">{{props.item.followers}}</td>
        <td class="text-xs-right">{{props.item.count}}</td>
        <td class="text-xs-right">
          <nuxt-link class="text-control" :to="`/admin/fansub/edit/${props.item.fansub_id}`">Edit</nuxt-link>
          <div class="delete-post" @click="removeFansub(props.item)">Delete</div>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-4">
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
        { text: "Name", value: "key", sortable: true, align: "left" },
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
        { text: "Controls", sortable: false, align: "right" }
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
