<template>
  <div>
    <h1 class="py-3">{{title}}</h1>
    <div class="text-xs-center">
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
    <v-data-table :items="comments" :headers="headers" class="elevation-1 my-table" hide-actions>
      <template v-slot:items="props">
        <td>{{ props.item.user_id }}</td>
        <td>{{ props.item.comment }}</td>
        <td>{{ props.item.episode_id }}</td>
        <td>{{ getTime(props.item.create_at) }}</td>
        <td>
          <nuxt-link class="text-control" :to="`/admin/users/${props.item.user_id}/edit`">Edit</nuxt-link>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-4">
      <!-- <v-pagination @input="onPageChange" v-model="page" :length="length" :total-visible="7"></v-pagination> -->
    </div>
  </div>
</template>

<script>
import CommentService from "@/services/Comment";
export default {
  data() {
    return {
      title: "Comments",
      comments: [],
      headers: [
        { text: "Author", value: 'user_id', sortable: true, align: "left" },
        { text: "Comment", value: 'comment',sortable: true, align: "left" },
        { text: "In Episode", value: 'episode_id', sortable: true, align: "left" },
        { text: "On", sortable: true, value:'create_at', align: "left" },
        { text: "Control", sortable: false, align: "left" }
      ]
    };
  },
  async created() {
    var comments = await CommentService.get();
    if (comments.success !== false) {
      return (this.comments = comments.data);
    }
  },
  methods: {
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
