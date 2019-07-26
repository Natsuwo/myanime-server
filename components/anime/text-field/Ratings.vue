<template>
  <v-autocomplete
    v-model="ratings"
    :items="dataRatings"
    chips
    label="Ratings"
    item-text="name"
    item-value="name"
  >
    <template v-slot:selection="data">
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        @input="remove(data.item)"
      >{{ data.item.name }}{{ selected(ratings) }}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
import Ratings from "@/items/rating.json";
export default {
  props: ["data"],
  data() {
    return {
      ratings: [],
      dataRatings: Ratings
    };
  },
  async created() {},
  methods: {
    remove(item) {
      this.ratings = [];
    },
    selected(data) {
      this.$emit("ratingEmit", data);
    }
  },
  watch: {
    data() {
      this.ratings = this.data;
    }
  }
};
</script>