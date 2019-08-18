<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs10>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ titleHead }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.site_title" label="Site Title"></v-text-field>
              <v-text-field
                v-model="form.descriptions"
                label="Descriptions"
                hint="watch anime online"
                persistent-hint
              ></v-text-field>
              <v-autocomplete
                v-model="form.season"
                :items="season"
                chips
                label="Current Season"
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
              <v-btn color="primary" @click="update">Update</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { getSetting, updateSetting } from "@/services/Settings";
export default {
  head() {
    return {
      title: this.titleHead
    };
  },
  data() {
    return {
      form: {},
      headers: {
        "X-User-Session": this.$store.state.auth.userToken
      },
      titleHead: "Options"
    };
  },
  computed: {
    settings() {
      return this.$store.state.setting.settings;
    },
    terms() {
      return this.$store.state.term.terms || null;
    },
    season() {
      if (this.terms) return this.terms.filter(x => x.type === "season");
      return null;
    }
  },
  async created() {
    var headers = {
      "X-User-Session": this.$store.state.auth.userToken
    };
    var response = (await getSetting(headers)).data;
    this.form = response.data;
  },
  methods: {
    async update() {
      var response = (await updateSetting(this.headers, this.form)).data;
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response
      });
    },
    remove(item) {
      this.form.season = "";
    }
  }
};
</script>