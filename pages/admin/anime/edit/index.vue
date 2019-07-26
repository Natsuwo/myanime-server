<template>
  <div>
    <h1 class="py-3">{{title}} ({{count}})</h1>
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
    <v-data-table
      :items="animes"
      :headers="headers"
      multi-sort
      class="elevation-1 my-table"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td>
          <v-img width="75" :src="props.item.thumbnail"></v-img>
        </td>
        <td>{{ getTerms(props.item, 'genre') }}</td>
        <td>{{ getTerms(props.item, 'season') }}</td>
        <td>{{ getTerms(props.item, 'studio') }}</td>
        <td>{{ props.item.rating }}</td>
        <td>{{ getTime(props.item.update_at) }}</td>
        <td class="text-xs-right">
          <nuxt-link class="text-control" :to="`/admin/anime/edit/${props.item.anime_id}`">Edit</nuxt-link>
          <div class="delete-post" @click="deletePost(props.item)">Delete</div>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-4">
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
      headers: AnimeItems
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
    async deletePost(item) {
      const index = this.animes.indexOf(item);
      if (index >= 0) this.animes.splice(index, 1);
      var form = {
        anime_id: item.anime_id
      };
      await AnimeServices.removeAnime(form);
      this.count--
    }
  }
};
</script>