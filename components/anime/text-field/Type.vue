<template>
  <v-autocomplete
    v-model="types"
    :items="dataTypes"
    chips
    label="Types"
    item-text="name"
    item-value="name"
  >
    <template v-slot:selection="data">
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        @input="remove"
      >{{ data.item.name }}{{ selected(types) }}</v-chip>
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
import Types from "@/items/type.json";
export default {
  props: ["data"],
  data() {
    return {
      types: "",
      dataTypes: Types
    };
  },
  async mounted() {},
  methods: {
    remove() {
      this.types = [];
    },
    selected(data) {
      this.$emit("typeEmit", data);
    }
  },
  watch: {
    data() {
      this.types = this.data;
    }
  }
};
</script>
