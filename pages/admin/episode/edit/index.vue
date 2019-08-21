<template>
  <div>
    <h1>{{title}} ({{count}})</h1>
    <v-btn :to="'add-new'" color="primary">Add New</v-btn>
    <div class="text-center">
      <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination>
      <div class="layout">
        <v-spacer></v-spacer>
        <v-flex xs6 pt-3>
          <v-text-field
            @input="searchTimeOut(onPageChange)"
            v-model="search"
            solo-inverted
            clearable
            label="Search anime name"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
      </div>
    </div>
    <no-ssr>
      <v-data-table
        :items="episodes"
        :headers="headers"
        class="elevation-1 my-table"
        :items-per-page="20"
        hide-default-footer
      >
        <template v-slot:item.anime_title="{ item }">{{ getTitle(item.anime_id) }}</template>
        <template v-slot:item.updated_at="{ item }">{{ getTime(item.updated_at) }}</template>
        <template v-slot:item.control="{ item }">
          <v-icon @click="editEpisode(item.episode_id)">mdi-pencil</v-icon>
          <v-icon @click.ctrl="removeEpisode(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </no-ssr>
    <div class="text-center pt-4">
      <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination>
    </div>
  </div>
</template>

<script>
import { get, removeEpisode } from "@/services/Episode";
import headers from "@/items/episodetab.json";
export default {
  async fetch({ store }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var response = (await get(headers)).data;
    store.dispatch("episode/episodesData", response);
  },
  head() {
    return {
      title: this.title
    };
  },
  computed: {
    episodes() {
      return this.$store.state.episode.episodes;
    },
    count() {
      return this.$store.state.episode.count;
    },
    length() {
      return this.$store.state.episode.meta.totalPage;
    },
    animes() {
      return this.$store.state.episode.animes;
    }
  },
  data() {
    return {
      title: "Episodes",
      headers: headers,
      search: "",
      page: 1,
      limit: null
    };
  },
  methods: {
    getTitle(id) {
      return this.animes.filter(x => x.anime_id === id)[0].title || "";
    },
    async onPageChange() {
      var headers = { "X-User-Session": this.$store.state.auth.userToken };
      var response = await get(headers, this.limit, this.page, this.search);
      return this.$store.dispatch("episode/episodesData", response.data);
    },
    async searchTimeOut(cb) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        return cb();
      }, 500);
    },
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
      var headers = { "X-User-Session": this.$store.state.auth.userToken };
      var form = {
        episode_id: item.episode_id
      };
      var response = removeEpisode(headers, form);
      return this.$store.dispatch("episode/removeEpisode", item);
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
