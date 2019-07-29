<template>
  <div>
    <img @click="editImage = !editImage" :src="imageUrl" height="150" v-if="imageUrl" />
    <v-file-input
      :disabled="editImage"
      v-model="banner"
      type="file"
      accept="image/*"
      label="Banner"
    ></v-file-input>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      banner: [],
      editImage: false,
      imageUrl: ""
    };
  },
  watch: {
    data(val) {
      if (typeof val === "string") {
        this.imageUrl = val;
        this.banner = [
          {
            name: val
              .split("/upload/fansub/banner/")
              .splice(1)
              .join()
          }
        ];
      }
    },
    banner(file) {
      if (file && file.length === undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.$emit("fansubBannerEmit", file || this.imageUrl);
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
