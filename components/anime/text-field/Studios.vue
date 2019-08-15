<template>
  <v-autocomplete
    v-model="studios"
    :items="dataStudios"
    chips
    label="Studios"
    item-text="key"
    item-value="key"
  >
    <template v-slot:selection="data">
      <v-chip
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove()"
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
      studios: []
    };
  },
  computed: {
    dataStudios() {
      return this.$store.state.term.terms.filter(x => x.type === "studio");
    }
  },
  created() {
    if (this.data) this.studios = this.data;
  },
  methods: {
    async remove(item) {
      this.studios = ""
    }
  },
  watch: {
    studios(val) {
      this.$emit("studioEmit", val);
    }
  }
};
</script>
