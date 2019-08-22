<template>
  <div>
    <h1 class="py-3">{{title}}</h1>
    <div class="text-center">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
      <div class="layout">
        <v-spacer></v-spacer>
        <v-flex xs6 pt-3>
          <!-- <v-text-field
            @input="searchTimeOut(onPageChange)"
            v-model="search"
            solo-inverted
            clearable
            label="Search drive ID or file name (you can search a multi value)"
            append-icon="search"
          ></v-text-field>-->
        </v-flex>
        <v-spacer></v-spacer>
      </div>
    </div>
    <no-ssr>
      <v-data-table
        :items="comments"
        :headers="headers"
        class="elevation-1 my-table"
        hide-default-footer
      >
        <template v-slot:item.user_id="{ item }">{{ getUser(item.user_id) }}</template>
        <template v-slot:item.created_at="{ item }">{{ getTime(item.created_at) }}</template>
        <template v-slot:item.control="{ item }">
          <!-- <v-icon @click="editAnime(item.anime_id)">mdi-pencil</v-icon> -->
          <v-icon @click="deleteComment(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </no-ssr>
    <div class="text-center pt-4">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
    </div>
  </div>
</template>

<script>
import { getComments, removeComment } from "@/services/Comment";
import { mapMutations } from "vuex";
export default {
  async fetch({ store }) {
    var headers = {
      "X-User-Session": store.state.auth.userToken
    };
    var response = (await getComments(headers)).data;
    store.dispatch("comment/commentsData", response.data);
  },
  computed: {
    comments() {
      return this.$store.state.comment.comments;
    },
    users() {
      return this.$store.state.comment.users;
    }
  },
  data() {
    return {
      title: "Comments",
      headers: [
        { text: "Author", value: "user_id", sortable: true, align: "left" },
        { text: "Comment", value: "comment", sortable: true, align: "left" },
        {
          text: "In Episode",
          value: "episode_id",
          sortable: true,
          align: "left"
        },
        { text: "On", sortable: true, value: "created_at", align: "left" },
        { text: "Control", value: "control", sortable: false, align: "left" }
      ]
    };
  },
  methods: {
    ...mapMutations("comment", ["removeComment"]),
    getUser(id) {
      var user = this.users.find(x => x.user_id === id);
      return user.username;
    },
    async onPageChange() {},
    async searchTimeOut(cb) {},
    getTime(time) {
      var date = new Date(time);
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = date.getFullYear();
      var expired = mm + "/" + dd + "/" + yyyy;
      if (isNaN(mm, dd, yyyy)) {
        expired = "Never";
      }
      return expired;
    },
    async deleteComment(item) {
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var response = await removeComment(headers, item);
      if (response.data.success) {
        this.removeComment(item);
      }
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
    }
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>


<style scoped>
.text-control {
  text-decoration: none;
  color: white;
}
.text-control:hover {
  text-decoration: underline;
  color: lightblue;
}
</style>
