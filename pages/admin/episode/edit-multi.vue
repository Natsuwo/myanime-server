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
              <Type :data="form.type" @episodeTypeEmit="data => form.type = data" />
              <Audio :data="form.audio" @episodeAudioEmit="data => form.audio = data" />
              <Subtitle :data="form.subtitle" @episodeSubtitleEmit="data => form.subtitle = data" />
              <Fansub :data="form.fansub" @episodeFansubEmit="data => form.fansub = data" />
              <v-btn @click="findEpisodes(false)" color="purple">Find (only edit source)</v-btn>
              <v-btn @click="findEpisodes(true)" color="purple">Find (edit all)</v-btn>
            </div>
            <div class="submit" v-else>
              <div class="form-submit" v-for="(item, index) in lists" :key="item.id">
                <div v-if="isEditAll">
                  <Anime :data="item.anime_id" @episodeAnimeEmit="data => item.anime_id = data" />
                  <Type :data="item.type" @episodeTypeEmit="data => item.type = data" />
                  <Audio :data="item.audio" @episodeAudioEmit="data => item.audio = data" />
                  <Subtitle
                    :data="item.subtitle"
                    @episodeSubtitleEmit="data => item.subtitle = data"
                  />
                  <Fansub :data="item.fansub" @episodeFansubEmit="data => item.fansub = data" />
                </div>
                <v-text-field filled v-model="item.title" label="Title"></v-text-field>
                <v-text-field filled :rules="[rules.number]" v-model="item.number" label="Number"></v-text-field>
                <v-text-field
                  @change="checkSource(index)"
                  :rules="[rules.isValid]"
                  filled
                  v-model="item.source"
                  :label="item.title"
                ></v-text-field>
                <v-divider class="py-4" />
              </div>
              <v-btn @click="isSubmit = !isSubmit" color="error">Go Back</v-btn>
              <v-btn @click="submit" color="primary">Submit</v-btn>
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
import { getEditMulti, editMulti } from "@/services/Episode";
import { getDriveId } from "@/plugins/valid";
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
      titleHead: "Edit Multi (Episode)",
      form: {},
      lists: [],
      isSubmit: false,
      isEditAll: false,
      isSource: true,
      valid: true,
      rules: {
        number: v => /^[0-9]+$/.test(v) || "Number Only",
        required: v => !!v || "source is required",
        isValid: v => !v || this.isSource || "Source not valid"
      },
      headers: {
        "X-User-Session": this.$store.state.auth.userToken
      }
    };
  },
  methods: {
    checkSource(index) {
      var id = getDriveId(this.lists[index].source);
      if (!id) return (this.isSource = false);
      this.isSource = true;
      return (this.lists[index].source = id);
    },
    async submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      var response = await editMulti(this.headers, {
        lists: this.lists
      });
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
      if (response.data.success) {
        return this.$router.push({ path: "/admin/episode/edit" });
      }
    },
    async findEpisodes(val) {
      this.isEditAll = val;
      var { anime_id, type, audio, subtitle, fansub } = this.form;
      var response = (await getEditMulti(
        this.headers,
        anime_id,
        type,
        audio,
        subtitle,
        fansub
      )).data;
      if (response.success) {
        this.lists = response.results;
        this.isSubmit = !this.isSubmit;
      }
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response
      });
    }
  }
};
</script>
