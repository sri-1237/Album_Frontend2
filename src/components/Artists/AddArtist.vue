<template>
  <h2 class="text-center">Add New Artist</h2>
  <br>

  <div class="row">
    <div class="col-sm-2">
      <label for="artistName"> Name</label>
    </div>
    <div class="col-sm-8">
      <input type="text" class="form-control" v-model="artist.name" id="artist-name" placeholder="Enter Artist Name"
        name="name">
    </div>
  </div>

  <div class="row">
    <div class="col-sm-2">
      <label for="formFile" class="form-label"> Cover Image</label>
    </div>
    <div class="col-sm-8">
      <input class="form-control" type="file" ref="file" @change="selectFile" id="formFile">
    </div>
  </div>
<!--
  <div class="row">
    <div class="col-sm-2">
      <label for="albumArtist"> Artist</label>
    </div>
    <div class="col-sm-8">
      <input type="text" class="form-control" v-model="album.artist" id="album-artist" placeholder="Enter Artist Name"
        name="title">
    </div>
  </div>
-->
  <div class="row">
    <div class="col-sm-2">
      <label for="artistDesc" class="form-label">Description</label>
    </div>
    <div class="col-sm-8">
      <textarea class="form-control" v-model="artist.description" id="artist-desc" rows="3"></textarea>
    </div>
  </div>
<!--
  <div class="row">
    <div class="col-sm-2">
      <label for="artistDesc" class="form-label">Add Tracks</label>
    </div>

    <div class="col-sm-6">
      <div class="form-group d-flex flex-row align-items-center trackInput" v-for="(input, k) in inputs" :key="k">
        <input type="text" class="form-control" v-model="input.name" placeholder="Enter Song URL">
        <span id="add-delete-icons">
          <i class="fas fa-minus-circle" @click="remove(k)" v-show="k || (!k && inputs.length > 1)"></i>
          <i class="fas fa-plus-circle" @click="add(k)" v-show="k == inputs.length - 1"></i>
        </span>
      </div>
    </div>

  </div>
-->

  <button type="button" class="btn btn-success" @click="saveArtist()">Save</button>
  <button type="button" class="btn btn-secondary" @click="cancel()">Cancel</button>

</template>
<script>
import ArtistDataService from "../../services/ArtistDataService";

export default {
  name: "add-artist",
  data() {
    return {
      artist: {
        id: null,
        name: "",
        coverImg: "",
        description: "",
      
      },
      
      message: "Enter data and click save",
      selectedFile: null,
      currentFile: undefined,
      progress: 0, 
      fileInfos: []
    };
  },
  methods: {
    selectFile(event) {
      this.selectedFile = event.target.files[0];
      
      console.log("test image...", this.selectedFile);
    },
    saveArtist() {
      // this.currentFile = this.selectedFiles.item(0);

      this.currentImage = this.$refs.file.files.item(0);

      console.log("Imggg...",this.selectedFile);

      // this.previewImage = URL.createObjectURL(this.currentImage);

      // console.log("Imggg 2222...",this.previewImage);

      var data = {
        name: this.artist.name,
        description: this.artist.description
      };

      console.log("Data..", data);
      ArtistDataService.createArtist(data, this.selectedFile)
        .then(response => {
          this.artist.id = response.data.id;
          console.log("add artist " + response.data);
         
          this.$router.push({ name: 'viewArtist', params: { id: this.artist.id, artist: this.artist.name } });        

        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'artists' });
    }
 
  }
}

</script>
<style>
.row {
  padding: 15px;
}



#add-delete-icons
{
  font-size: 25px;
    margin-left: 10px;
    color: #ffffff;
  display: flex;
}

button {
  padding: 5px 20px;
  margin: 20px !important;
}
</style>