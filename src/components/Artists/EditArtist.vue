<template>
  <h1>Update Artist</h1>

  <div>
    <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage">
    </div>

    <label for="files" id="imgLabel" class="btn btn-primary">Change Image</label>
 
    <input
      ref="fileInput"
      id="files"
      type="file"
      style="visibility:hidden;" 
      @input="pickFile">
  </div>

  <div class="row">
    <div class="col-sm-2">
      <label for="artistName"> Name</label>
    </div>
    <div class="col-sm-8">
        
      <input type="text" class="form-control" v-model="artist.name" id="artist-name" placeholder="Enter Artist Name"
        name="name">
    </div>
  </div>

  <!-- <div class="row">
    <div class="col-sm-2">
      <label for="formFile" class="form-label"> Cover Image</label>
    </div>
    <div class="col-sm-8">
        <img :src="album.imgURL" class="img-thumbnail" id="albumImg2" alt="Album Image" />
      <input class="form-control" type="file" ref="file" @change="selectFile" id="formFile">
    </div>
  </div> -->

<!--  <div class="row">
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
      <label for="artistInfo" class="form-label">Info</label>
    </div>
    <div class="col-sm-8">
      <textarea class="form-control" v-model="artist.description" id="artist-desc" rows="3"></textarea>
    </div>
  </div>

  <!-- <div class="row">
    <div class="col-sm-2">
      <label for="albumDesc" class="form-label">Add Tracks</label>
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

  </div> -->


  <button type="button" class="btn btn-success" @click="updateArtist()">Save</button>
  <button type="button" class="btn btn-secondary" @click="cancel()">Cancel</button>

</template>

<script>
import ArtistDataService from "../../services/ArtistDataService";
import { Buffer } from 'buffer';

export default {
  name: "edit-artist",
  props: ['id'],
  data() {
    return {
      artist: {},
      message: "Enter data and click save",
      previewImage: null,
      selectedFile: null,
    };
  },
  methods: {
      selectImage () {
        this.$refs.fileInput.click();
         
      },
      pickFile () {
        let input = this.$refs.fileInput
       
        let file = input.files

       this.selectedFile = file[0];
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          // console.log("input....",this.previewImage);
          this.$emit('input', file[0])
        }
      },
    retrieveArtist() {
      console.log("a id...",this.id);
      ArtistDataService.get(this.id)
        .then(response => {
          // this.album = response.data;
          var arr = new Array(response.data);

          let resData = arr[0];
          if (resData.data != null) {
            var blobObj = resData.data;
            var bufferBase64 = new Buffer(blobObj.data, 'binary').toString('base64');
            var imgBase64 = "data:image/jpeg;base64," + bufferBase64;
            arr[0]["imgURL"] = imgBase64;
          }
          this.artist = arr[0];
          console.log("a idaaaa...", this.artist);
          this.previewImage=this.artist.imgURL;

        //   TracksDataService.getAllTracks(this.id)
        //     .then(response => {
        //       this.tracks = response.data
        //       console.log("Tracks...", this.tracks);
        //     })
        //     .catch(e => {
        //       this.message = e.response.data.message;
        //     });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },

    updateArtist() {
      var data = {
        name: this.artist.name,
        description: this.artist.description

      };
      ArtistDataService.update(this.artist.id,data, this.selectedFile)
        .then(response => {
          this.artist.id = response.data.id;

          // console.log("resp...",response.data.);
       
          // this.$router.push({ name: 'viewAlbum', params: { id: this.album.id, album: this.album.title } });   
          this.$router.push({ name: 'artists' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'viewArtist', params: { id: this.artist.id, artist: this.artist.name } });   
    }
  },
    mounted() {
    this.retrieveArtist();
  }
}

</script>

<style>

#artistImg2 {
  width: 120px;
  height: 150px;
}

.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}

#imgLabel{
        margin: 0 auto 10px;
    display: block;
    width: 200px;
}
</style>