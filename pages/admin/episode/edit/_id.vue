<template>
  <v-layout row wrap justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="messages.success ? 'green' : 'red'">
      <span>{{messages.success ? messages.message : messages.error}}</span>
      <v-btn flat @click="snackbar = false" color="white">Close</v-btn>
    </v-snackbar>
    <v-flex xs12 md8 md6>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ titleHead }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <Anime :data="anime" @episodeAnimeEmit="(data) => anime = data" />
          <v-text-field v-model="source" label="Source"></v-text-field>
          <v-text-field v-model="number" label="Number"></v-text-field>
          <Type :data="type" @episodeTypeEmit="(data) => type = data" />
          <Audio :data="audio" @episodeAudioEmit="(data) => audio = data" />
          <Subtitle :data="subtitle" @episodeSubtitleEmit="(data) => subtitle = data" />
          <Fansub :data="fansub" @episodeFansubEmit="(data) => fansub = data" />
          <v-text-field v-model="title" label="Title"></v-text-field>
          <v-textarea v-model="description" name="input-7-1" label="Description"></v-textarea>
          <v-btn @click="submit" color="primary">Submit</v-btn>
          <v-btn @click="removeEpisode" color="red">Remove</v-btn>
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
import Anime from "@/components/episode/AnimeEdit";
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
      titleHead: "Edit episode",
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
  async created() {
    var episode_id = this.$route.params.id;
    var data = (await EpisodeServices.getUpdate(episode_id)).data;
    this.anime = data.anime_id;
    this.source = data.source;
    this.number = data.number;
    this.title = data.title;
    this.type = data.type;
    this.audio = data.audio;
    this.subtitle = data.subtitle;
    this.fansub = data.fansub;
    this.description = data.description;
  },
  methods: {
    async submit() {
      var form = {
        episode_id: this.$route.params.id,
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
      this.messages = await EpisodeServices.update(form);
      this.snackbar = true;
    },
    async removeEpisode(item) {
      var form = {
        anime_id: this.anime,
        episode_id: this.$route.params.id
      };
      this.messages = await EpisodeServices.removeEpisode(form);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/episode/edit" });
        }, 1000);
      }
    }
  },
  watch: {
    number() {
      this.titleHead = `Edit episode (${this.number})`;
    }
  }
};
</script>
