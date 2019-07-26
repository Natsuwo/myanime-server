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
          <img
            @click="editImage = !editImage"
            :src="imageUrl"
            height="150"
            title="abc"
            v-if="imageUrl"
          />
          <v-text-field
            label="Thumbnail"
            @click="pickFile"
            v-model="imageName"
            prepend-icon="attach_file"
            :disabled="editImage"
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
          <Type :data="type" @typeEmit="(data) => type = data" />
          <Status :data="status" @statusEmit="(data) => status = data" />
          <Genres :data="genres" @genresEmit="(data) => genres = data" />
          <Studios :data="studios" @studioEmit="(data) => studios = data" />
          <Ratings :data="rating" @ratingEmit="(data) => rating = data" />
          <Seasons :data="season" @seasonEmit="(data) => season = data" />
          <v-textarea v-model="description" name="input-7-1" label="Descriptions"></v-textarea>
          <v-divider></v-divider>
        </v-card-text>
        <v-layout row wrap px-3>
          <v-switch
            v-model="autoUpdate"
            :disabled="isUpdating"
            class="mt-0"
            color="green lighten-2"
            hide-details
            label="Auto Update"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-btn :disabled="autoUpdate" :loading="isUpdating" color="primary" @click="sumbit(true)">
            <span v-if="autoUpdate">{{ countDown }}</span>
            <v-icon left>update</v-icon>Update now
          </v-btn>
          <v-btn color="error" @click="deletePost()">Delete</v-btn>
        </v-layout>
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
      genres: [],
      studios: [],
      rating: [],
      season: [],
      description: "",
      title: `Edit ${this.ro_title}`,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      editImage: false,
      snackbar: false,
      messages: "",
      autoUpdate: true,
      isUpdating: false,
      countDown: 30,
      blabalba: null
    };
  },
  async created() {
    var anime_id = this.$route.params.id;
    var data = (await AnimeServices.getUpdate(anime_id)).data[0];
    this.type = data.type;
    this.status = data.status;
    this.rating = data.rating;
    this.ro_title = data.title;
    this.imageUrl = data.thumbnail;
    this.imageName = data.thumbnail
      .split("/upload/thumbnail/")
      .splice(1)
      .join();
    this.premiered = data.premiered;
    this.description = data.description;

    this.en_title =
      data.animemeta
        .filter(x => x.meta_key === "en_title")
        .map(x => x.meta_value) || "";
    this.jp_title =
      data.animemeta
        .filter(x => x.meta_key === "jp_title")
        .map(x => x.meta_value) || "";
    this.genres = data.terms
      .filter(x => x.type === "genre")
      .map(x => x.term_id);
    this.studios = data.terms
      .filter(x => x.type === "studio")
      .map(x => x.term_id);
    this.season = data.terms
      .filter(x => x.type === "season")
      .map(x => x.term_id)
      .join();
  },
  mounted() {
    this.autoupdate()
  },
  methods: {
    async sumbit(cb) {
      var formData = new FormData();
      var terms = this.genres.concat(this.studios, this.season);
      var anime_id = this.$route.params.id;

      formData.append("anime_id", anime_id);
      formData.append("terms", terms);
      formData.append("thumbnail", this.imageFile);
      formData.append("title", this.ro_title);
      formData.append("en", this.en_title);
      formData.append("jp", this.jp_title);
      formData.append("type", this.type);
      formData.append("status", this.status);
      formData.append("premiered", this.premiered);
      formData.append("rating", this.rating);
      formData.append("description", this.description);
      this.messages = await AnimeServices.postUpdate(formData);
      this.isUpdating = true;
      this.snackbar = cb;

      if (this.messages) {
        setTimeout(() => {
          this.isUpdating = false;
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
    },
    async deletePost() {
      var form = {
        anime_id: this.$route.params.id
      };
      this.messages = await AnimeServices.removeAnime(form);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/anime/edit" });
        }, 2000);
      }
    },
    autoupdate() {
      var timerId = setInterval(() => {
        if (!this.autoUpdate) {
          clearTimeout(timerId);
        }
        if (this.countDown === 0) {
          this.sumbit(false);
          this.countDown = 30;
        } else {
          this.countDown--;
        }
      }, 1000);
    }
  },
  watch: {
    imageUrl() {
      this.editImage = true;
    },
    autoUpdate(val) {
      if (val) this.autoupdate();
    },
    ro_title(val) {
      this.title = `Edit anime (${val})`
    }
  }
};
</script>