<template>
  <v-layout row wrap justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="messages.success ? 'green' : 'red'">
      <span>{{messages.success ? messages.message : messages.error}}</span>
      <v-btn text @click="snackbar = false" color="white">Close</v-btn>
    </v-snackbar>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ titleHead }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <Anime @episodeAnimeEmit="(data) => anime = data" />
          <v-text-field v-model="source" label="Source"></v-text-field>
          <v-text-field v-model="number" label="Number"></v-text-field>
          <Type @episodeTypeEmit="(data) => type = data" />
          <Audio @episodeAudioEmit="(data) => audio = data" />
          <Subtitle @episodeSubtitleEmit="(data) => subtitle = data" />
          <Fansub @episodeFansubEmit="(data) => fansub = data" />
          <v-text-field v-model="title" label="Title"></v-text-field>
          <v-textarea v-model="description" name="input-7-1" label="Description"></v-textarea>
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
import EpisodeServices from "@/services/Episode";
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
      anime: "",
      source: "",
      number: 0,
      title: "",
      type: "",
      audio: "",
      subtitle: "",
      fansub: "",
      description: "",
      messages: "",
      snackbar: false
    };
  },
  methods: {
    async submit() {
      var form = {
        anime_id: this.anime,
        source: this.source,
        number: this.number,
        title: this.title,
        type: this.type,
        audio: this.audio,
        subtitle: this.subtitle,
        fansub: this.fansub,
        description: this.description
      };
      this.messages = await EpisodeServices.post(form);
      this.snackbar = true;
      if(this.messages.success) {
        setTimeout(() => {
          this.$router.push({path: `/admin/episode/edit/${this.messages.episode_id}`})
        }, 1000);
      }
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>
