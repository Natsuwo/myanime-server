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
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove(data.item)"
      >{{ data.item.key }}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.key"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  data() {
    return {
      genres: []
    };
  },
  computed: {
    animemeta() {
      return this.$store.state.anime.anime.animemeta || "";
    },
    data() {
      return this.animemeta
        ? this.animemeta
            .filter(x => x.meta_key === "genre")
            .map(x => x.meta_value)[0]
        : "";
    },
    dataGenres() {
      return this.$store.state.term.terms.filter(x => x.type === "genre");
    }
  },
  created() {
    if (this.data) this.genres = [...this.data];
  },
  methods: {
    async remove(item) {
      const index = this.genres.indexOf(item.term_id);
      if (index >= 0) this.genres.splice(index, 1);
    }
  },
  watch: {
    genres(val) {
      this.$emit("genresEmit", val);
    }
  }
};
</script>
