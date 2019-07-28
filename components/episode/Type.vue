<template>
  <v-autocomplete
    v-model="type"
    :items="dataType"
    chips
    label="Type"
    item-text="name"
    item-value="name"
    hide-selected
  >
    <template v-slot:selection="data">
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        @input="remove(data.item)"
      >{{ data.item.name }}{{ selected(type) }}</v-chip>
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
import Type from "@/items/episode-type.json";
export default {
  props: ["data"],
  data() {
    return {
      type: [],
      dataType: Type
    };
  },
  async created() {},
  methods: {
    remove(item) {
      this.type = [];
    },
    selected(data) {
      this.$emit("episodeTypeEmit", data);
    }
  },
  watch: {
    data() {
      this.type = this.data;
    }
  }
};
</script>