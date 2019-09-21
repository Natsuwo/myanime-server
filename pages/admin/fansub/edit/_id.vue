<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md10 md8>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-avatar class="term-flag">
            <v-img :src="imageUrl" width="42px" v-if="imageUrl"></v-img>
          </v-avatar>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="dataEdit.key" label="Name" prepend-icon="mdi-format-title"></v-text-field>
          <v-file-input v-model="avatar" type="file" accept="image/*" label="Avatar"></v-file-input>
          <v-textarea
            v-model="dataEdit.description"
            name="input-7-1"
            label="Descriptions"
            prepend-icon="mdi-file-document-edit"
          ></v-textarea>
          <v-btn :loading="loading" :disabled="loading" @click="submit" color="primary">Update</v-btn>
          <v-btn @click="deleteTerm(term)" color="error">Delete</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { update } from "@/services/Term";
import { mapMutations } from "vuex";
export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      dataEdit: {},
      avatar: [],
      imageUrl: "",
      loading: false,
      title: "Edit fansub",
      headers: { "X-User-Session": this.$store.state.auth.userToken }
    };
  },
  computed: {
    term() {
      var term_id = this.$route.params.id;
      return this.$store.state.term.terms.find(
        x => x.term_id === parseInt(term_id)
      );
    }
  },
  async created() {
    this.dataEdit = JSON.parse(JSON.stringify(this.term));
    this.imageUrl = this.dataEdit.value;
  },
  methods: {
    ...mapMutations("snackbar", ["snackBar"]),
    async submit() {
      this.loading = true;
      var formData = new FormData();
      formData.append("data", JSON.stringify(this.dataEdit));
      formData.append("value", this.avatar.size ? this.avatar : this.imageUrl);
      var resp = await this.$store.dispatch("term/update", {
        item: this.term,
        headers: this.headers,
        formData
      });
      this.snackBar({ active: true, message: resp });
      this.loading = false;
    },
    async deleteTerm(item) {
      var form = {
        type: "fansub",
        term_id: this.$route.params.id
      };
      var response = await this.$store.dispatch("term/deleteTerm", {
        item,
        headers: this.headers,
        form
      });
      if (response.success) {
        setTimeout(() => {
          this.$router.push({ path: "/admin/fansub/edit" });
        }, 1000);
      }
    }
  },
  watch: {
    key(val) {
      this.title = `Edit fansub (${val})`;
    },
    avatar(file) {
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
    }
  }
};
</script>
<style scoped>
.term-flag {
  position: absolute;
  right: 10px;
}
</style>
