<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ titleHead }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <Anime @episodeAnimeEmit="(data) => form.anime = data" />
          <v-text-field :rules="[rules.isValid]" v-model="form.source" label="Source"></v-text-field>
          <v-text-field v-model="form.number" label="Number"></v-text-field>
          <Type @episodeTypeEmit="(data) => form.type = data" />
          <Audio @episodeAudioEmit="(data) => form.audio = data" />
          <Subtitle @episodeSubtitleEmit="(data) => form.subtitle = data" />
          <Fansub @episodeFansubEmit="(data) => form.fansub = data" />
          <v-text-field v-model="form.title" label="Title"></v-text-field>
          <v-textarea v-model="form.description" name="input-7-1" label="Description"></v-textarea>
          <v-btn @click="submit" color="primary">Submit</v-btn>
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
import { addNew } from "@/services/Episode";
import { isValid } from "@/plugins/valid";
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
      titleHead: "Add new (Episode)",
      form: {},
      rules: {
        isValid: v => !v || isValid(v) || "Source not valid"
      }
    };
  },
  methods: {
    async submit() {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var form = {
        anime_id: this.form.anime,
        audio: this.form.audio,
        description: this.form.description,
        fansub: this.form.fansub,
        number: this.form.number,
        source: this.form.source,
        subtitle: this.form.subtitle,
        title: this.form.title,
        type: this.form.type
      };
      var response = await addNew(headers, form);
      if (response.data.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/episode/edit/${response.data.episode_id}`
          });
        }, 1000);
      }
    }
  }
};
</script>
