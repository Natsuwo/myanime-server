<template>
  <v-autocomplete
    filled
    v-model="ratings"
    :items="dataRatings"
    chips
    label="Ratings"
    item-text="name"
    item-value="name"
  >
    <template v-slot:selection="data">
      <v-chip
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove(data.item)"
      >{{ data.item.name }}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
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
  async created() {
    if (this.data) this.ratings = this.data;
  },
  methods: {
    remove(item) {
      this.ratings = "";
    }
  },
  watch: {
    ratings(val) {
      this.$emit("ratingEmit", val);
    }
  }
};
</script>