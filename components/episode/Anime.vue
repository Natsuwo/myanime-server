<template>
  <v-autocomplete
    v-model="anime"
    :items="dataAnime"
    chips
    label="Anime"
    item-text="title"
    item-value="anime_id"
    hide-selected
  >
    <template v-slot:selection="data">
      <v-chip :selected="data.selected" close class="chip--select-multi" @input="remove(data.item)">
        <v-avatar>
          <v-img :src="data.item.thumbnail"></v-img>
        </v-avatar>
        {{ data.item.title }}{{ selected(anime) }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-avatar>
          <img :src="data.item.thumbnail" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
import EpisodeServices from "@/services/Episode";
export default {
  data() {
    return {
      anime: [],
      dataAnime: []
    };
  },
  async created() {
    this.dataAnime = (await EpisodeServices.getAnime()).data;
  },
  methods: {
    remove(item) {
      this.anime = [];
    },
    selected(data) {
      this.$emit("episodeAnimeEmit", data);
    }
  }
};
</script>