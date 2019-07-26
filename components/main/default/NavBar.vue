<template>
  <no-ssr>
    <div class="toolbar">
      <v-toolbar app dark>
        <v-btn icon v-if="mini" @click="mini = !mini">
          <v-icon>chevron_right</v-icon>
        </v-btn>
        <v-btn icon v-else @click="mini = !mini">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-btn icon v-if="$vuetify.breakpoint.smAndDown" @click="drawer = !drawer">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-uppercase grey--text">
          <nuxt-link to="/">
            <span class="font-weight-light">{{title}}</span>
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu
          transition="slide-x-transition"
          offset-y
          bottom
          left
          :nudge-width="100"
          :nudge-bottom="10"
        >
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-btn flat block to="/user/profile">
                <v-icon class="pr-2">person</v-icon>Profile
              </v-btn>
            </v-list-tile>

            <v-list-tile>
              <v-btn @click="logout" flat block>
                <v-icon class="pr-2">exit_to_app</v-icon>Logout
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <!-- Navigation -->
      <v-navigation-drawer stateless app :mini-variant="mini" v-model="drawer" dark>
        <v-list class="pt-0" dense>
          <!-- Single Items -->
          <v-list-tile v-for="item in items" :key="item.title" :to="item.to" exact>
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- Multi Items -->
          <v-list-group
            :prepend-icon="multiItem.icon"
            v-for="multiItem in multiItems"
            :key="multiItem.title"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>{{multiItem.title}}</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile v-for="child in multiItem.items" :key="child.title" :to="child.to" exact>
              <v-list-tile-action>
                <v-icon>{{child.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{child.title}}</v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </no-ssr>
</template>
<script>
import Items from "@/items/navbar.json";
import Authentication from "@/services/Authentication";
export default {
  data() {
    return {
      title: "Backend Myanime",
      drawer: true,
      items: [],
      multiItems: [],
      mini: true
    };
  },
  async mounted() {
    this.items = Items.items;
    this.multiItems = Items.multiItems;
  },
  methods: {
    async logout() {
      var logout = await Authentication.logout();
      this.$store.commit("logout", true);
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
.nuxt-link-active {
  text-decoration: none;
  color: #fff;
}
</style>
