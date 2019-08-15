<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{`Edit anime (${anime.title})`}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <img @click="editImage = !editImage" :src="imageUrl" height="150" v-if="anime.thumbnail" />
          <v-file-input
            :disabled="editImage"
            v-model="thumbnail"
            type="file"
            accept="image/*"
            label="Thumbnail"
          ></v-file-input>
          <img @click="editCover = !editCover" :src="coverUrl" height="150" v-if="anime.cover" />
          <v-file-input
            :disabled="editCover"
            v-model="cover"
            type="file"
            accept="image/*"
            label="Cover"
          ></v-file-input>
          <v-text-field v-model="editData.title" label="Romaji Title"></v-text-field>
          <v-text-field v-model="editData.en" label="English Title"></v-text-field>
          <v-text-field v-model="editData.jp" label="Japan Title"></v-text-field>
          <v-text-field v-model="editData.premiered" label="Premiered"></v-text-field>
          <Type :data="editData.type" @typeEmit="(data) => editData.type = data" />
          <Status :data="editData.status" @statusEmit="(data) => editData.status = data" />
          <Genres @genresEmit="(data) => editData.genres = data" />
          <Studios :data="editData.studios" @studioEmit="(data) => editData.studios = data" />
          <Ratings :data="editData.rating" @ratingEmit="(data) => editData.rating = data" />
          <Seasons :data="editData.season" @seasonEmit="(data) => editData.season = data" />
          <v-textarea v-model="editData.description" name="input-7-1" label="Descriptions"></v-textarea>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
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
            <span class="pr-1" v-if="autoUpdate">{{ countDown }}</span>
            <v-icon left>mdi-update</v-icon>Update now
          </v-btn>
          <v-btn color="error" @click="deletePost()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { postUpdate, getUpdate } from "@/services/Anime";
import Genres from "@/components/anime/text-field/Genres";
import Studios from "@/components/anime/text-field/Studios";
import Ratings from "@/components/anime/text-field/Ratings";
import Seasons from "@/components/anime/text-field/Seasons";
import Type from "@/components/anime/text-field/Type";
import Status from "@/components/anime/text-field/Status";
export default {
  async fetch({ store, params }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var id = params.id;
    var response = (await getUpdate(headers, id)).data;
    store.dispatch("anime/animeData", response.data);
  },
  computed: {
    data() {
      return this.$store.state.anime.anime;
    },
    anime() {
      return this.data.anime || "";
    },
    animemeta() {
      return this.data.animemeta;
    }
  },
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
      title: this.anime.title
    };
  },
  data() {
    return {
      title: "",
      editData: {},
      thumbnail: [],
      imageUrl: "",
      cover: [],
      coverUrl: "",
      editImage: false,
      editCover: false,
      autoUpdate: false,
      isUpdating: false,
      countDown: 30
    };
  },
  created() {
    if (this.anime) {
      this.imageUrl = this.anime.thumbnail;
      this.coverUrl = this.anime.cover;
      this.editData = JSON.parse(JSON.stringify(this.anime));
      this.editData.jp =
        this.animemeta
          .filter(x => x.meta_key === "jp_title")
          .map(x => x.meta_value)
          .join() || "";
      this.editData.en =
        this.animemeta
          .filter(x => x.meta_key === "en_title")
          .map(x => x.meta_value)
          .join() || "";
    } else {
      return this.$router.push({ path: "/admin" });
    }
  },
  mounted() {
    this.autoupdate();
  },
  methods: {
    async sumbit() {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var formData = new FormData();
      var anime_id = this.$route.params.id;

      formData.append(
        "thumbnail",
        this.thumbnail.size ? this.thumbnail : this.imageUrl
      );
      formData.append("cover", this.cover.size ? this.cover : this.coverUrl);
      formData.append("data", JSON.stringify(this.editData));
      var response = postUpdate(headers, formData);
      this.isUpdating = true;

      if (response) {
        setTimeout(() => {
          this.isUpdating = false;
        }, 1000);
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
        }, 1000);
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
    coverUrl() {
      this.editCover = true;
    },
    autoUpdate(val) {
      if (val) this.autoupdate();
    },
    thumbnail(file) {
      if (file && file.length === undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
        });
      }
      if (!file) {
        this.imageUrl = "";
      }
    },
    cover(file) {
      if (file && file.length === undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.coverUrl = fr.result;
        });
      }
      if (!file) {
        this.coverUrl = "";
      }
    }
  }
};
</script>