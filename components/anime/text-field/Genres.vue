<template>
  <v-autocomplete
    v-model="genres"
    :items="dataGenres"
    chips
    label="Genres"
    item-text="key"
    item-value="term_id"
    multiple
  >
    <template v-slot:selection="data">
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        @input="remove(data.item)"
      >{{ data.item.key }}{{ selected(genres) }}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.key"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
import TermServices from "@/services/Term";
export default {
  props: ["data"],
  data() {
    return {
      genres: [],
      dataGenres: []
    };
  },
  async created() {
    var type = "genre";
    var genres = (await TermServices.get(type)).data;
    this.dataGenres = genres;
  },
  methods: {
    async remove(item) {
      const index = this.genres.indexOf(item.term_id);
      if (index >= 0) this.genres.splice(index, 1);
    },
    selected(data) {
      this.$emit("genresEmit", data);
    }
  },
  watch: {
    data() {
      this.genres = this.data;
    }
  }
};
</script>
