<template>
  <v-autocomplete
    v-model="season"
    :items="dataSeasons"
    chips
    label="Season"
    item-text="key"
    item-value="term_id"
  >
    <template v-slot:selection="data">
      <v-chip
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove(data.item)"
      >{{ data.item.key }}{{ selected(season) }}</v-chip>
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
import TermServices from "@/services/Term";
export default {
  props: ["data"],
  data() {
    return {
      season: [],
      dataSeasons: []
    };
  },
  async created() {
    var type = "season"
    this.dataSeasons = (await TermServices.get(type)).data;
  },
  methods: {
    async remove(item) {
      this.season = [];
    },
    selected(data) {
      this.$emit("seasonEmit", data);
    }
  },
  watch: {
    data() {
      this.season = parseInt(this.data)
    }
  }
};
</script>