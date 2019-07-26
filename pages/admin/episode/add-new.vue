<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 md8 md6>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field label="Source"></v-text-field>
          <!-- Types -->
          <v-autocomplete
            v-model="friends"
            :items="people"
            chips
            label="Types"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="remove(data.item)"
              >
                <v-avatar>
                  <img :src="data.item.avatar" />
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-avatar>
                  <img :src="data.item.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
          <!-- Audio -->
          <v-autocomplete
            v-model="friends"
            :items="people"
            chips
            label="Audio"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="remove(data.item)"
              >
                <v-avatar>
                  <img :src="data.item.avatar" />
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-avatar>
                  <img :src="data.item.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
          <!-- Subtitle -->
          <v-autocomplete
            v-model="friends"
            :items="people"
            chips
            label="Subtitle"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="remove(data.item)"
              >
                <v-avatar>
                  <img :src="data.item.avatar" />
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-avatar>
                  <img :src="data.item.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
          <!-- Fansub -->
          <v-autocomplete
            v-model="friends"
            :items="people"
            chips
            label="Fansub"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                @input="remove(data.item)"
              >
                <v-avatar>
                  <img :src="data.item.avatar" />
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-avatar>
                  <img :src="data.item.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
          <v-textarea name="input-7-1" label="Descriptions"></v-textarea>
          <v-btn @click="submit" color="primary">Submit</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };
    return {
      title: "Add new (Episode)",
      friends: [],
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] }
      ]
    };
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>
