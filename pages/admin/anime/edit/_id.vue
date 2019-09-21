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
          <img :src="coverUrl" height="150" v-if="anime.cover" />
          <v-file-input v-model="cover" type="file" accept="image/*" label="Cover"></v-file-input>
          <v-text-field filled v-model="editData.title" label="Romaji Title"></v-text-field>
          <v-text-field filled v-model="editData.en" label="English Title"></v-text-field>
          <v-text-field filled v-model="editData.jp" label="Japan Title"></v-text-field>
          <v-text-field filled v-model="editData.premiered" label="Premiered"></v-text-field>
          <v-text-field filled v-model="editData.studios" label="Studios"></v-text-field>
          <v-text-field filled v-model="editData.season" label="Season"></v-text-field>
          <Type :data="editData.type" @typeEmit="(data) => editData.type = data" />
          <Status :data="editData.status" @statusEmit="(data) => editData.status = data" />
          <Genres :data="genres" @genresEmit="(data) => editData.genres = data" />
          <Ratings :data="editData.rating" @ratingEmit="(data) => editData.rating = data" />
          <v-textarea filled v-model="editData.description" name="input-7-1" label="Descriptions"></v-textarea>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="isUpdating" color="primary" @click="sumbit(true)">
            <v-icon left>mdi-update</v-icon>Update now
          </v-btn>
          <v-btn color="error" @click="deletePost()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { postUpdate, getUpdate, removeAnime } from "@/services/Anime";
import Genres from "@/components/anime/text-field/Genres";
import Ratings from "@/components/anime/text-field/Ratings";
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
    },
    genres() {
      return this.animemeta
        ? this.animemeta
            .filter(x => x.meta_key === "genre")
            .map(x => x.meta_value)[0]
        : "";
    }
  },
  components: {
    Genres,
    Ratings,
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
      isUpdating: false,
      countDown: 30,
      headers: {
        "X-User-Session": this.$store.state.auth.userToken
      }
    };
  },
  created() {
    if (this.anime) {
      this.imageUrl = this.anime.thumbnail;
      this.coverUrl = this.anime.cover || "";
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
  methods: {
    async sumbit() {
      this.isUpdating = true;
      var formData = new FormData();
      var anime_id = this.$route.params.id;
      formData.append(
        "thumbnail",
        this.thumbnail.size ? this.thumbnail : this.imageUrl
      );
      formData.append("cover", this.cover.size ? this.cover : this.coverUrl);
      formData.append("data", JSON.stringify(this.editData));
      var response = await postUpdate(this.headers, formData);
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });

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
      var response = await removeAnime(this.headers, form);
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
      if (response.data.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/anime/edit" });
        }, 1000);
      }
    }
  },
  watch: {
    imageUrl() {
      this.editImage = true;
    },
    coverUrl() {
      this.editCover = true;
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