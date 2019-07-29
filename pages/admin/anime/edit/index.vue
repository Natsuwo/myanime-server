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
      hide-default-footer
      :items="animes"
      sort-by="update_at"
      sort-desc
      :headers="headers"
      class="elevation-1 my-table"
    >
      <template v-slot:item.thumbnail="{ item }">
        <v-img width="75" :src="item.thumbnail"></v-img>
      </template>
      <template v-slot:item.genre="{ item }">{{ getTerms(item, 'genre') }}</template>
      <template v-slot:item.season="{ item }">{{ getTerms(item, 'season') }}</template>
      <template v-slot:item.studio="{ item }">{{ getTerms(item, 'studio') }}</template>
      <template v-slot:item.update_at="{ item }">{{ getTime(item.update_at) }}</template>
      <template v-slot:item.control="{ item }">
        <v-icon @click="editAnime(item.anime_id)">mdi-pencil</v-icon>
        <v-icon @click="deleteAnime(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-4">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
    </div>
  </div>
</template>

<script>
import AnimeServices from "@/services/Anime";
import AnimeItems from "@/items/animetab.json";
export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: "Animes",
      animes: [],
      genres: [],
      season: [],
      count: 0,
      headers: AnimeItems,
      search: ""
    };
  },
  async created() {
    var anime = await AnimeServices.get();
    this.animes = anime.data;
    this.count = anime.count;
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
    getTerms(item, term) {
      var index = this.animes.indexOf(item);
      return this.animes[index].terms
        .filter(x => x.type === term)
        .map(x => x.key)
        .join(", ");
    },
    async deleteAnime(item) {
      const index = this.animes.indexOf(item);
      if (index >= 0) this.animes.splice(index, 1);
      var form = {
        anime_id: item.anime_id
      };
      await AnimeServices.removeAnime(form);
      this.count--;
    },
    editAnime(item) {
      this.$router.push({ path: `edit/${item}` });
    }
  }
};
</script>