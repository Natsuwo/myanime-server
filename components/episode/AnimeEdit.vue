<template>
  <v-autocomplete
    v-model="anime"
    :items="dataAnime"
    chips
    label="Anime"
    item-text="title"
    item-value="anime_id"
    readonly
    disabled
  >
    <template v-slot:selection="data">
      <v-chip :selected="data.selected" class="chip--select-multi">
        <v-avatar>
          <v-img :src="data.item.thumbnail"></v-img>
        </v-avatar>
        {{ data.item.title }}{{ selected(anime) }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>
<script>
import EpisodeServices from "@/services/Episode";
export default {
  props: ["data"],
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
    selected(data) {
      this.$emit("episodeAnimeEmit", data);
    }
  },
  watch: {
    data() {
      this.anime = this.data;
    }
  }
};
</script>