<template>
  <div>
    <h1>{{title}} ({{count}})</h1>
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
      :items="episodes"
      :headers="headers"
      class="elevation-1 my-table"
      hide-default-footer
    >
      <template v-slot:item.updated_at="{ item }">{{ getTime(item.updated_at) }}</template>
      <template v-slot:item.control="{ item }">
        <v-icon @click="editEpisode(item.episode_id)">mdi-pencil</v-icon>
        <v-icon @click="removeEpisode(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-4">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
    </div>
  </div>
</template>

<script>
import EpisodeServices from "@/services/Episode";
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
      count: 0,
      headers: [
        { text: "Anime", value: "anime_title", sortable: true, align: "left" },
        { text: "Episode", value: "number", sortable: false, align: "left" },
        { text: "Title", value: "title", sortable: false, align: "left" },
        { text: "Type", value: "type", sortable: false, align: "left" },
        { text: "Audio", value: "audio", sortable: false, align: "left" },
        { text: "Subtitle", value: "subtitle", sortable: false, align: "left" },
        { text: "Fansub", value: "fansub", sortable: false, align: "left" },
        {
          text: "Last Update",
          value: "updated_at",
          sortable: true,
          align: "left"
        },
        { text: "Views", value: "views", sortable: true, align: "right" },
        { text: "Controls", value: "control", sortable: false, align: "right" }
      ]
    };
  },
  async created() {
    var episodes = await EpisodeServices.get();
    this.episodes = episodes.data;
    this.count = episodes.count;
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
    async removeEpisode(item) {
      const index = this.episodes.indexOf(item);
      if (index >= 0) this.episodes.splice(index, 1);
      var form = {
        anime_id: item.anime_id,
        episode_id: item.episode_id
      };
      await EpisodeServices.removeEpisode(form);
    },
    editEpisode(id) {
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
