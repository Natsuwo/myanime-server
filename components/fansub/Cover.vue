<template>
  <div>
    <img @click="editImage = !editImage" :src="imageUrl" height="150" v-if="imageUrl" />
    <v-file-input :disabled="editImage" v-model="cover" type="file" accept="image/*" label="Cover"></v-file-input>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      cover: [],
      editImage: false,
      imageUrl: ""
    };
  },
  watch: {
    data(val) {
      if (typeof val === "string") {
        this.imageUrl = val;
        this.cover = [
          {
            name: val
              .split("/upload/fansub/cover/")
              .splice(1)
              .join()
          }
        ];
      }
    },
    cover(file) {
      if (file && file.length === undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.$emit("fansubCoverEmit", file || this.imageUrl);
        });
      }
      if (!file) {
        this.imageUrl = "";
      }
    },
    imageUrl() {
      this.editImage = true;
    }
  }
};
</script>