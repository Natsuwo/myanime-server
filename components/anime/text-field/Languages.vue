<template>
  <v-autocomplete
    v-model="languages"
    :items="dataLanguages"
    chips
    label="Languages"
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
      >{{ data.item.key }}{{ selected(languages) }}</v-chip>
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
import TermServices from "@/serives/Term";
export default {
  data() {
    return {
      languages: [],
      dataLanguages: []
    };
  },
  async created() {
    var type = "language";
    this.dataLanguages = (await TermServices.get(type)).data;
  },
  methods: {
    remove(item) {
      const index = this.languages.indexOf(item.name);
      if (index >= 0) this.languages.splice(index, 1);
    },
    selected(data) {
      this.$emit("languageEmit", data);
    }
  }
};
</script>