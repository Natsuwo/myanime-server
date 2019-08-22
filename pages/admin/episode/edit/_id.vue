<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ titleHead }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <Anime :data="dataEdit.anime_id" @episodeAnimeEmit="data => dataEdit.anime_id = data" />
          <v-text-field
            @change="checkSource(dataEdit.source)"
            v-model="dataEdit.source"
            label="Source"
          ></v-text-field>
          <v-text-field v-model="dataEdit.number" label="Number"></v-text-field>
          <Type :data="dataEdit.type" @episodeTypeEmit="data => dataEdit.type = data" />
          <Audio :data="dataEdit.audio" @episodeAudioEmit="data => dataEdit.audio = data" />
          <Subtitle
            :data="dataEdit.subtitle"
            @episodeSubtitleEmit="data => dataEdit.subtitle = data"
          />
          <Fansub :data="dataEdit.fansub" @episodeFansubEmit="data => dataEdit.fansub = data" />
          <v-text-field v-model="dataEdit.title" label="Title"></v-text-field>
          <v-flex class="text-right">
            <v-btn @click="submit" color="primary">Submit</v-btn>
            <v-btn @click="removeEpisode" color="red">Remove</v-btn>
          </v-flex>
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
import { getUpdate, update, removeEpisode } from "@/services/Episode";
import { getDriveId } from "@/plugins/valid";
export default {
  async fetch({ store, params, redirect }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var id = params.id;
    var response = (await getUpdate(headers, id)).data;
    if (!response.data) return redirect("/admin/episode/edit");
    store.dispatch("episode/episodeData", response.data);
  },
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
      dataEdit: {},
      headers: {
        "X-User-Session": this.$store.state.auth.userToken
      }
    };
  },
  computed: {
    data() {
      return this.$store.state.episode.episode;
    }
  },
  async created() {
    this.dataEdit = JSON.parse(JSON.stringify(this.data));
  },
  methods: {
    checkSource(url) {
      var id = getDriveId(url);
      return (this.dataEdit.source = id);
    },
    async submit() {
      var response = await update(this.headers, this.dataEdit);
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
    },
    async removeEpisode() {
      var response = await removeEpisode(this.headers, this.dataEdit);
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
      if (response.data.success) {
        this.$router.push({ path: "/admin/episode/edit" });
        return this.$store.dispatch("episode/removeEpisode", this.data);
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
