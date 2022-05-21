<template>
    <h1>Add New Album</h1>

    <div class="mb-3 mt-3">
      <label for="albumTitle">Email:</label>
      <input type="text" class="form-control" v-model="album.title" id="album-title" placeholder="Enter Album Title" name="title">
    </div>
    <div class="mb-3">
  <label for="formFile" class="form-label">Default file input example</label>
  <input class="form-control" type="file" v-on="album.coverImg" id="formFile">
</div>
   
<div class="mb-3">
  <label for="albumDesc" class="form-label">Description</label>
  <textarea class="form-control" v-model="album.description" id="album-desc" rows="3"></textarea>
</div>

<button type="button" class="btn btn-success" @click="saveAlbum()">Save</button>
<button type="button" class="btn btn-secondary" @click="cancel()">Cancel</button>

</template>
<script>
import AlbumDataService from "../../services/AlbumDataService";
export default {
  name: "add-album",
  data() {
    return {
      album: {
        id: null,
        title: "",
        coverImg: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveAlbum() {
        alert("Img..",this.album.coverImg);
      var data = {
        title: this.album.title,
        description: this.album.description
      };
      AlbumDataService.create(data)
        .then(response => {
          this.album.id = response.data.id;
          console.log("add album "+response.data);
          this.$router.push({ name: 'Album', params: { album: this.album.title } });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'albums' });
    }
  }
}

</script>
<style>

</style>