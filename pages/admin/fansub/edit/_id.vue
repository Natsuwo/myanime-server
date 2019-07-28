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
          <v-text-field v-model="name" label="Name" prepend-icon="title"></v-text-field>
          <Cover :data="cover" @fansubCoverEmit="(data) => cover = data" />
          <Banner :data="banner" @fansubBannerEmit="(data) => banner = data" />
          <v-textarea
            v-model="description"
            name="input-7-1"
            label="Descriptions"
            prepend-icon="description"
          ></v-textarea>
          <v-switch color="primary" v-model="trusted" label="Trusted?"></v-switch>
          <v-btn @click="submit" color="primary">Edit</v-btn>
          <v-btn @click="removeFansub" color="red">Remove</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Cover from "@/components/fansub/Cover";
import Banner from "@/components/fansub/Banner";
import FansubServices from "@/services/Fansub";
export default {
  components: {
    Cover,
    Banner
  },
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      name: "",
      cover: "",
      banner: "",
      description: "",
      trusted: false,
      messages: "",
      snackbar: false,
      title: "Edit fansub"
    };
  },
  async created() {
    var fansub_id = this.$route.params.id;
    var data = (await FansubServices.getUpdate(fansub_id)).data;
    this.name = data.name;
    this.cover = data.cover;
    this.banner = data.banner;
    this.description = data.description;
    this.trusted = data.trusted;
  },
  methods: {
    async submit() {
      var formData = new FormData();
      var fansub_id = this.$route.params.id;

      formData.append("fansub_id", fansub_id);
      formData.append("name", this.name);
      formData.append("cover", this.cover);
      formData.append("banner", this.banner);
      formData.append("trusted", this.trusted);
      formData.append("description", this.description);

      this.messages = await FansubServices.update(formData);
      this.snackbar = true;
    },
    async removeFansub() {
      var form = {
        fansub_id: this.$route.params.id
      };
      this.messages = await FansubServices.removeFansub(form);
      this.snackbar = true;
      if (this.messages.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/fansub/edit" });
        }, 1000);
      }
    }
  }
};
</script>