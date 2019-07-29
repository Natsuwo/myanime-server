<template>
  <v-layout row wrap>
    <v-flex xs6 md3 v-for="item in items" pr-2 pb-2 :key="item.title">
      <v-card>
        <v-layout row wrap pa-3>
          <v-icon v-if="$vuetify.breakpoint.xsOnly" class="dashboard-icon" size="30">{{item.icon}}</v-icon>
          <v-icon v-else class="dashboard-icon" size="60">{{item.icon}}</v-icon>
          <v-flex>
            <div class="right">
              <h2 class="dashboard-title">{{item.title}}</h2>
              <h2 class="dashboard-count">{{item.count}}</h2>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  head() {
    return {
      title: "Admin"
    };
  },
  data() {
    return {
      items: [
        {
          icon: "mdi-movie",
          title: "Animes",
          count: 1000
        },
        {
          icon: "mdi-library-video",
          title: "Episodes",
          count: 2000
        },
        {
            icon: "mdi-account",
            title: "Users",
            count: 200
        },
        {
            icon: "mdi-comment",
            title: "Comments",
            count: 1000
        }
      ]
    };
  }
};
</script>
<style scoped>
.dashboard-title {
  color: #aaa;
}
.dashboard-count {
  color: #2196f3;
}
.dashboard-icon {
    user-select: none;
}
</style>
