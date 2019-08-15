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
            label="Search anime name or season"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
      </div>
    </div>
    <no-ssr>
      <v-data-table
        hide-default-footer
        :items="animes"
        sort-by="updated_at"
        sort-desc
        :headers="headers"
        class="elevation-1 my-table"
      >
        <template v-slot:item.thumbnail="{ item }">
          <v-img width="75" :src="item.thumbnail"></v-img>
        </template>
        <template v-slot:item.genre="{ item }">{{ getTerms(item) }}</template>
        <template v-slot:item.updated_at="{ item }">{{ getTime(item.updated_at) }}</template>
        <template v-slot:item.control="{ item }">
          <v-icon @click="editAnime(item.anime_id)">mdi-pencil</v-icon>
          <v-icon @click="deleteAnime(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </no-ssr>
    <div class="text-center pt-4">
      <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination>
    </div>
  </div>
</template>

<script>
import { get } from "@/services/Anime";
import AnimeItems from "@/items/animetab.json";
export default {
  async fetch({ store }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var response = (await get(headers)).data;
    store.dispatch("anime/animesData", response);
  },
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: "Animes",
      headers: AnimeItems,
      search: "",
      page: 1,
      limit: null
    };
  },
  computed: {
    animes() {
      return this.$store.state.anime.animes.animes;
    },
    animemetas() {
      return this.$store.state.anime.animes.meta;
    },
    terms() {
      return this.$store.state.term.terms;
    },
    count() {
      return this.$store.state.anime.count;
    },
    options() {
      return this.$store.state.anime.animes.options;
    },
    length() {
      return this.options.totalPage;
    }
  },
  methods: {
    async onPageChange() {
      var headers = { "X-User-Session": this.$store.state.auth.userToken };
      var response = await get(headers, this.limit, this.page, this.search);
      return this.$store.dispatch("anime/animesData", response.data);
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
    getTerms(item) {
      var index = this.animes.indexOf(item);
      var termid = this.animemetas[index]
        .filter(x => x.meta_key === "genre")
        .map(x => x.meta_value)
        .join()
        .split(",");
      var terms = [];
      for (var item of termid) {
        var term = this.terms
          .filter(x => x.term_id === parseInt(item))
          .map(x => x.key)
          .join();
        terms.push(term);
      }
      return terms.join(", ");
    },
    async deleteAnime(item) {
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          anime_id: item.anime_id
        }
      };
      this.$store.dispatch("anime/removeAnime", { item, data });
    },
    editAnime(item) {
      this.$router.push({ path: `edit/${item}` });
    }
  }
};
</script>