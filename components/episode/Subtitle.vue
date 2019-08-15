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
      <v-chip
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove(data.item)"
      >
        <v-avatar left>
          <v-img :src="data.item.value"></v-img>
        </v-avatar>
        {{ data.item.key }}{{ selected(subtitle) }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar tile>
          <img :src="data.item.value" />
        </v-list-item-avatar>
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
      subtitle: []
    };
  },
  computed: {
    dataSubtitle() {
      return this.$store.state.term.terms.filter(x => x.type === "language");
    }
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