<template>
  <v-autocomplete
    v-model="studios"
    :items="dataStudios"
    chips
    label="Studios"
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
      >{{ data.item.key }}{{ selected(studios) }}</v-chip>
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
      studios: [],
      dataStudios: []
    };
  },
  async created() {
    var type = "studio"
    var studios = (await TermServices.get(type)).data;
    this.dataStudios = studios;
  },
  methods: {
    async remove(item) {
      const index = this.studios.indexOf(item.term_id);
      if (index >= 0) this.studios.splice(index, 1);
    },
    selected(data) {
      this.$emit("studioEmit", data);
    }
  },
  watch: {
    data() {
      this.studios = this.data;
    }
  }
};
</script>
