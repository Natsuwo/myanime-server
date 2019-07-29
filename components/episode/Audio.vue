<template>
  <v-autocomplete
    v-model="audio"
    :items="dataAudio"
    chips
    label="Audio"
    item-text="key"
    item-value="key"
    hide-selected
  >
    <template v-slot:selection="data">
      <v-chip :input-value="data.selected" close class="chip--select-multi" @click:close="remove(data.item)">
        <v-avatar left>
          <v-img :src="data.item.value"></v-img>
        </v-avatar>
        {{ data.item.key }}{{ selected(audio) }}
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
import TermServices from "@/services/Term";
export default {
  props: ["data"],
  data() {
    return {
      audio: [],
      dataAudio: []
    };
  },
  async created() {
    var type = "language";
    this.dataAudio = (await TermServices.get(type)).data;
  },
  methods: {
    remove(item) {
      this.audio = [];
    },
    selected(data) {
      this.$emit("episodeAudioEmit", data);
    }
  },
  watch: {
    data() {
      this.audio = this.data;
    }
  }
};
</script>