<template>
  <v-autocomplete
    v-model="subtitle"
    :items="dataSubtitle"
    chips
    label="Subtitle"
    item-text="key"
    item-value="key"
    hide-selected
  >
    <template v-slot:selection="data">
      <v-chip :selected="data.selected" close class="chip--select-multi" @input="remove(data.item)">
        <v-avatar>
          <v-img :src="data.item.value"></v-img>
        </v-avatar>
        {{ data.item.key }}{{ selected(subtitle) }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-avatar tile>
          <img :src="data.item.value" />
        </v-list-tile-avatar>
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
      subtitle: [],
      dataSubtitle: []
    };
  },
  async created() {
    var type = "language";
    this.dataSubtitle = (await TermServices.get(type)).data;
  },
  methods: {
    remove(item) {
      this.subtitle = [];
    },
    selected(data) {
      this.$emit("episodeSubtitleEmit", data);
    }
  },
  watch: {
    data() {
      this.subtitle = this.data;
    }
  }
};
</script>