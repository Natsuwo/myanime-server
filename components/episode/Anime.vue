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
      <v-chip
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove(data.item)"
      >
        <v-avatar left>
          <v-img :src="data.item.thumbnail"></v-img>
        </v-avatar>
        {{ data.item.title }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img :src="data.item.thumbnail" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.title"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
import { getAnime } from "@/services/Episode";
export default {
  props: ["data"],
  data() {
    return {
      anime: [],
      dataAnime: []
    };
  },
  async created() {
    if (this.data) this.anime = this.data;
    this.dataAnime = (await getAnime()).data.data;
  },
  methods: {
    remove(item) {
      this.anime = [];
    }
  },
  watch: {
    anime(val) {
      this.$emit("episodeAnimeEmit", val);
    }
  }
};
</script>