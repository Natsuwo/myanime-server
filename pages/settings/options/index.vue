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
              <v-text-field filled v-model="form.site_title" label="Site Title"></v-text-field>
              <v-text-field
                filled
                v-model="form.descriptions"
                label="Descriptions"
                hint="watch anime online"
                persistent-hint
              ></v-text-field>
               <v-text-field
                filled
                v-model="form.noti"
                label="Noti"
                hint="Fuc' haters!"
                persistent-hint
              ></v-text-field>
              <AutoComplete
                :model="form.old_season"
                :items="season"
                :label="'Old Season'"
                @seasonEmit="data => form.old_season = data"
              />
              <AutoComplete
                :model="form.cur_season"
                :items="season"
                :label="'Current Season'"
                @seasonEmit="data => form.cur_season = data"
              />
              <AutoComplete
                :model="form.new_season"
                :items="season"
                :label="'New Season'"
                @seasonEmit="data => form.new_season = data"
              />
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
import AutoComplete from "@/components/modules/AutoComplete";
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
  },
  components: {
    AutoComplete
  }
};
</script>