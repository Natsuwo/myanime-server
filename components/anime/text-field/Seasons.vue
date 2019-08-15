<template>
  <v-autocomplete
    v-model="season"
    :items="dataSeasons"
    chips
    label="Season"
    item-text="key"
    item-value="key"
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
  props: ["data"],
  data() {
    return {
      season: []
    };
  },
  computed: {
    dataSeasons() {
      return this.$store.state.term.terms.filter(x => x.type === "season");
    }
  },
  async created() {
    if (this.data) this.season = this.data;
  },
  methods: {
    async remove(item) {
      this.season = "";
    }
  },
  watch: {
    season(val) {
      this.$emit("seasonEmit", val);
    }
  }
};
</script>