<template>
  <div>
    <h1 class="py-3">{{title}}</h1>
    <div class="text-xs-center">
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
    <v-data-table :items="episodes" :headers="headers" class="elevation-1 my-table" hide-actions>
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.number }}</td>
        <td>{{ getTime(props.item.update_at) }}</td>
        <td>{{ props.item.anime_id }}</td>
        <td>...</td>
        <td class="text-xs-right">{{props.item.views}}</td>
        <td class="text-xs-right">
          <nuxt-link class="text-control" :to="`/admin/users/${props.item.userId}/edit`">Edit</nuxt-link>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-4">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
    </div>
  </div>
</template>

<script>
import EpisodeSerivce from "@/services/Episode";
export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: "Episodes",
      episodes: [],
      headers: [
        { text: "Title", value: "title", sortable: true, align: "left" },
        { text: "Number", value: "number", sortable: false, align: "left" },
        { text: "Date", value: "update_at", sortable: false, align: "left" },
        {
          text: "In Anime",
          value: "episode_id",
          sortable: false,
          align: "left"
        },
        { text: "Type", sortable: false, align: "left" },
        { text: "Views", value: "views", sortable: true, align: "right" },
        { text: "Controls", sortable: false, align: "right" }
      ]
    };
  },
  async created() {
    var episodes = await EpisodeSerivce.get();
    this.episodes = episodes.data;
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
