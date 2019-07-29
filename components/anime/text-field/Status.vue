<template>
  <v-autocomplete
    v-model="status"
    :items="dataStatus"
    chips
    label="Status"
    item-text="name"
    item-value="name"
  >
    <template v-slot:selection="data">
      <v-chip
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove"
      >{{ data.item.name }}{{ selected(status) }}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>
<script>
import Status from "@/items/status.json";
export default {
  props: ["data"],
  data() {
    return {
      status: [],
      dataStatus: Status
    };
  },
  async created() {},
  methods: {
    remove() {
      this.status = [];
    },
    selected(data) {
      this.$emit("statusEmit", data);
    }
  },
  watch: {
    data() {
      this.status = this.data;
    }
  }
};
</script>
