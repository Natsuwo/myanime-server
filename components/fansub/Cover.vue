<template>
  <div>
    <img :src="imageUrl" height="150" v-if="imageUrl" />
    <v-text-field
      label="Select Cover"
      @click="pickFile"
      v-model="imageName"
      prepend-icon="attach_file"
    ></v-text-field>
    <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" />
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
          this.$emit("fansubCoverEmit", files[0] || this.imageUrl);
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  },
  watch: {
    data(val) {
      if (typeof val === "string") {
        this.imageUrl = this.data;
        this.imageName = this.data
          .split("/upload/fansub/cover/")
          .splice(1)
          .join();
      }
    }
  }
};
</script>
