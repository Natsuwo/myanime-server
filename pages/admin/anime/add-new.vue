<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <img :src="thumbUrl" height="150" v-if="thumbUrl" />
          <v-file-input v-model="thumbnail" type="file" accept="image/*" label="Thumbnail"></v-file-input>
          <img :src="coverUrl" height="150" v-if="coverUrl" />
          <v-file-input v-model="cover" type="file" accept="image/*" label="Cover"></v-file-input>
          <v-text-field v-model="formData.title" label="Romaji Title"></v-text-field>
          <v-text-field v-model="formData.en" label="English Title"></v-text-field>
          <v-text-field v-model="formData.jp" label="Japan Title"></v-text-field>
          <v-text-field v-model="formData.premiered" label="Premiered"></v-text-field>
          <Seasons @seasonEmit="(data) => formData.season = data" />
          <Type @typeEmit="(data) => formData.type = data" />
          <Status @statusEmit="(data) => formData.status = data" />
          <Genres @genresEmit="(data) => formData.genres = data" />
          <Studios @studioEmit="(data) => formData.studios = data" />
          <Ratings @ratingEmit="(data) => formData.rating = data" />
          <v-textarea v-model="formData.description" name="input-7-1" label="Descriptions"></v-textarea>
          <v-btn color="primary" @click="sumbit">Submit</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { addNew } from "@/services/Anime";
import Genres from "@/components/anime/text-field/Genres";
import Studios from "@/components/anime/text-field/Studios";
import Ratings from "@/components/anime/text-field/Ratings";
import Seasons from "@/components/anime/text-field/Seasons";
import Type from "@/components/anime/text-field/Type";
import Status from "@/components/anime/text-field/Status";
export default {
  components: {
    Genres,
    Studios,
    Ratings,
    Seasons,
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
      formData: {},
      thumbnail: [],
      cover: [],
      thumbUrl: "",
      coverUrl: "",
      title: "Add new (Anime)"
    };
  },
  methods: {
    async sumbit() {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var formData = new FormData();
      formData.append("thumbnail", this.thumbnail);
      formData.append("cover", this.cover);
      formData.append("data", JSON.stringify(this.formData));
      var response = await addNew(headers, formData);

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
    thumbnail(file) {
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.thumbUrl = fr.result;
        });
      }
      this.thumbUrl = "";
    },
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