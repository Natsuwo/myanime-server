<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ titleHead }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <div class="before-submit" v-if="!isSubmit">
              <Anime :data="form.anime_id" @episodeAnimeEmit="data => form.anime_id = data" />
              <v-text-field
                :rules="[rules.isValid, rules.required]"
                v-model="form.source"
                label="Source (Folder)"
              ></v-text-field>
              <Type :data="form.type" @episodeTypeEmit="data => form.type = data" />
              <Audio :data="form.audio" @episodeAudioEmit="data => form.audio = data" />
              <Subtitle :data="form.subtitle" @episodeSubtitleEmit="data => form.subtitle = data" />
              <Fansub :data="form.fansub" @episodeFansubEmit="data => form.fansub = data" />
              <v-btn @click="preSubmit" color="green">PreSubmit</v-btn>
            </div>
            <div class="submit" v-else>
              <div class="form-submit" v-for="item in lists" :key="item.id">
                <v-text-field filled v-model="item.title" label="Title"></v-text-field>
                <v-text-field filled :rules="[rules.number]" v-model="item.ep" label="Number"></v-text-field>
                <v-text-field filled v-model="item.id" disabled :label="item.title"></v-text-field>
                <v-divider class="py-4" />
              </div>
              <v-btn @click="isSubmit = !isSubmit" color="warning">Check prev fields</v-btn>
              <v-btn @click="submit" :loading="loading" :disabled="loading" color="primary">Submit</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Type from "@/components/episode/Type";
import Audio from "@/components/episode/Audio";
import Subtitle from "@/components/episode/Subtitle";
import Fansub from "@/components/episode/Fansub";
import Anime from "@/components/episode/Anime";
import { addMulti } from "@/services/Episode";
import { isValid, getDriveId, getList, getNumber } from "@/plugins/valid";
export default {
  components: {
    Type,
    Audio,
    Subtitle,
    Fansub,
    Anime
  },
  head() {
    return {
      title: this.titleHead
    };
  },
  data() {
    return {
      titleHead: "Add Multi (Episode)",
      form: {},
      lists: [],
      isSubmit: false,
      valid: true,
      loading: false,
      rules: {
        number: v => /^[0-9]+$/.test(v) || "Number Only",
        required: v => !!v || "source is required",
        isValid: v => !v || isValid(v) || "Source not valid"
      }
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var response = await addMulti(headers, {
        form: this.form,
        lists: this.lists
      });
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
      this.loading = false;
      if (response.data.success) {
        return this.$router.push({ path: "/admin/episode/edit" });
      }
    },
    async preSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.lists.length) {
        return (this.isSubmit = !this.isSubmit);
      }
      var source = getDriveId(this.form.source);
      var lists = await getList(source);
      this.lists = lists.data.items;
      this.isSubmit = !this.isSubmit;
    }
  }
};
</script>
