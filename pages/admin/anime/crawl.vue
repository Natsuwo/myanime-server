<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="form" v-if="isCrawl">
            <img :src="formData.thumbnail" height="150" v-if="formData.thumbnail" />
            <img :src="coverUrl" height="150" v-if="coverUrl" />
            <v-file-input v-model="cover" type="file" accept="image/*" label="Cover"></v-file-input>
            <v-text-field filled v-model="formData.title" label="Romaji Title"></v-text-field>
            <v-text-field filled v-model="formData.en" label="English Title"></v-text-field>
            <v-text-field filled v-model="formData.jp" label="Japan Title"></v-text-field>
            <v-text-field filled v-model="formData.premiered" label="Premiered"></v-text-field>
            <v-text-field filled v-model="formData.studios" label="Studios"></v-text-field>
            <v-text-field filled v-model="formData.season" label="Season"></v-text-field>
            <Type :data="formData.type" @typeEmit="(data) => formData.type = data" />
            <Status :data="formData.status" @statusEmit="(data) => formData.status = data" />
            <Genres :data="formData.genres" @genresEmit="(data) => formData.genres = data" />
            <Ratings :data="formData.rating" @ratingEmit="(data) => formData.rating = data" />
            <v-textarea filled v-model="formData.description" name="input-7-1" label="Descriptions"></v-textarea>
          </div>
          <v-text-field v-else v-model="link" label="Myanimelist link"></v-text-field>
          <v-btn v-if="!isCrawl" color="green" @click="check">Crawl</v-btn>
          <v-btn v-else color="primary" @click="sumbit">Submit</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { addNew, crawlAnime } from "@/services/Anime";
import { getId } from "@/plugins/crawl";
import Genres from "@/components/anime/text-field/Genres";
import Ratings from "@/components/anime/text-field/Ratings";
import Type from "@/components/anime/text-field/Type";
import Status from "@/components/anime/text-field/Status";
export default {
  components: {
    Genres,
    Ratings,
    Type,
    Status
  },
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      link: "",
      formData: {},
      isCrawl: false,
      cover: [],
      thumbUrl: "",
      coverUrl: "",
      title: "Crawl (Anime)",
      headers: {
        "X-User-Session": this.$store.state.auth.userToken
      }
    };
  },
  computed: {
    dataGenres() {
      return this.$store.state.term.terms.filter(x => x.type === "genre");
    }
  },
  methods: {
    async check() {
      var id = getId(this.link);
      var response = await crawlAnime(this.headers, { id });
      if (response.data.success) {
        var that = response.data.results;
        var genres = [];
        for (var item of that.genres) {
          var name = item.name;
          var genre = this.dataGenres.find(x => x.key === name);
          genres.push(genre.term_id);
        }
        that.genres = genres;
        if (that.type === "TV") that.type = "TV Series";
        if (that.status === "Currently Airing") that.status = "Ongoing";
        else that.status = "Completed";
        this.formData = {
          thumbnail: that.image_url,
          title: that.title,
          en: that.title_english,
          jp: that.title_japanese,
          premiered: that.premiered,
          season: that.premiered,
          genres: that.genres,
          type: that.type,
          status: that.status,
          studios: that.studios[0].name,
          rating: that.rating,
          description: that.synopsis
        };
        this.isCrawl = true;
      }
    },
    async sumbit() {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var formData = new FormData();
      formData.append("cover", this.cover);
      formData.append("data", JSON.stringify(this.formData));
      var response = await addNew(headers, formData);
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });

      if (response.data.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/anime/edit/${response.data.anime_id}`
          });
        }, 1000);
      }
    }
  },
  watch: {
    cover(file) {
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.coverUrl = fr.result;
        });
      }
      this.coverUrl = "";
    }
  }
};
</script>