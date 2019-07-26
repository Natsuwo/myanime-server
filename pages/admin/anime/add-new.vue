<template>
  <v-layout row wrap justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="messages.success ? 'green' : 'red'">
      <span>{{messages.success ? messages.message : messages.error}}</span>
      <v-btn flat @click="snackbar = false" color="white">Close</v-btn>
    </v-snackbar>
    <v-flex xs12 md8 md6>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <img :src="imageUrl" height="150" v-if="imageUrl" />
          <v-text-field
            label="Thumbnail"
            @click="pickFile"
            v-model="imageName"
            prepend-icon="attach_file"
          ></v-text-field>
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          />
          <v-text-field v-model="ro_title" label="Romaji Title"></v-text-field>
          <v-text-field v-model="en_title" label="English Title"></v-text-field>
          <v-text-field v-model="jp_title" label="Japan Title"></v-text-field>
          <v-text-field v-model="premiered" label="Premiered"></v-text-field>
          <Type @typeEmit="(data) => type = data" />
          <Status @statusEmit="(data) => status = data" />
          <!-- Genres -->
          <Genres @genresEmit="(data) => genres = data" />
          <!-- Studios -->
          <Studios @studioEmit="(data) => studios = data" />
          <!-- Rating -->
          <Ratings @ratingEmit="(data) => rating = data" />
          <!-- Season -->
          <Seasons @seasonEmit="(data) => season = data" />
          <v-textarea v-model="description" name="input-7-1" label="Descriptions"></v-textarea>
          <v-btn color="primary" @click="sumbit">Submit</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import AnimeServices from "@/services/Anime";
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
      ro_title: "",
      en_title: "",
      jp_title: "",
      premiered: "",
      type: "",
      status: "",
      rating: "",
      genres: [],
      studios: [],
      season: [],
      description: "",
      title: "Add new (Anime)",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      snackbar: false,
      messages: ""
    };
  },
  async created() {},
  methods: {
    async sumbit() {
      var formData = new FormData();
      var terms = this.genres.concat(this.studios, this.season);

      formData.append("thumbnail", this.imageFile);
      formData.append("title", this.ro_title);
      formData.append("en", this.en_title);
      formData.append("jp", this.jp_title);
      formData.append("type", this.type);
      formData.append("status", this.status);
      formData.append("premiered", this.premiered);
      formData.append("rating", this.rating);
      formData.append("terms", terms);
      formData.append("description", this.description);
      this.messages = await AnimeServices.post(formData);
      this.snackbar = true;

      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({
            path: `/admin/anime/edit/${this.messages.anime_id}`
          });
        }, 1000);
      }
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  }
};
</script>