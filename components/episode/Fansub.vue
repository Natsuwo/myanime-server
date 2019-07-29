<template>
  <v-autocomplete
    v-model="fansub"
    :items="dataFansub"
    chips
    label="Fansub"
    item-text="name"
    item-value="name"
    hide-selected
  >
    <template v-slot:selection="data">
      <v-chip :input-value="data.selected" close class="chip--select-multi" @click:close="remove(data.item)">
        <v-avatar left>
          <v-img :src="data.item.cover"></v-img>
        </v-avatar>
        {{ data.item.name }}{{ selected(fansub) }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar tile>
          <img :src="data.item.cover" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
import FansubServices from "@/services/Fansub";
export default {
  props: ["data"],
  data() {
    return {
      fansub: [],
      dataFansub: []
    };
  },
  async created() {
    this.dataFansub = (await FansubServices.get()).data;
  },
  methods: {
    remove(item) {
      this.fansub = [];
    },
    selected(data) {
      this.$emit("episodeFansubEmit", data);
    }
  },
  watch: {
    data() {
      this.fansub = this.data;
    }
  }
};
</script>