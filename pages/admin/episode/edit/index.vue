<template>
  <div>
    <h1>{{title}} ({{count}})</h1>
    <v-btn :to="'add-new'" color="primary">Add New</v-btn>
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
        <td>{{ props.item.anime_title }}</td>
        <td>{{ props.item.number }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.type }}</td>
        <td>{{ props.item.audio }}</td>
        <td>{{ props.item.subtitle }}</td>
        <td>{{ props.item.fansub }}</td>
        <td>{{ getTime(props.item.updated_at) }}</td>
        <td class="text-xs-right">{{props.item.views}}</td>
        <td class="text-xs-right">
          <nuxt-link class="text-control" :to="`/admin/episode/edit/${props.item.episode_id}`">Edit</nuxt-link>
          <div class="delete-post" @click="removeEpisode(props.item)">Delete</div>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-4">
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
        { text: "Episode", sortable: false, align: "left" },
        { text: "Title", value: "title", sortable: false, align: "left" },
        { text: "Type", sortable: false, align: "left" },
        { text: "Audio", sortable: false, align: "left" },
        { text: "Subtitle", sortable: false, align: "left" },
        { text: "Fansub", sortable: false, align: "left" },
        {
          text: "Last Update",
          value: "updated_at",
          sortable: true,
          align: "left"
        },
        { text: "Views", value: "views", sortable: true, align: "right" },
        { text: "Controls", sortable: false, align: "right" }
      ]
    };
  },
  async created() {
    var episodes = await EpisodeServices.get();
    this.episodes = episodes.data;
    this.count = episodes.count
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
      }
      await EpisodeServices.removeEpisode(form)
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
