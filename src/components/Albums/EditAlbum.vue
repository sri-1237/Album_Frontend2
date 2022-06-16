<template>
  <h1>Update Album</h1>

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
      <label for="albumTitle"> Title</label>
    </div>
    <div class="col-sm-8">
        
      <input type="text" class="form-control" v-model="album.title" id="album-title" placeholder="Enter Album Title"
        name="title">
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

  <!-- <div class="row">
    <div class="col-sm-2">
      <label for="albumArtist"> Artist</label>
    </div>
    <div class="col-sm-8">
      <input type="text" class="form-control" v-model="album.artist" id="album-artist" placeholder="Enter Artist Name"
        name="title">
    </div>
  </div> -->

   <div class="row">
    <div class="col-sm-2">
      <label for="albumArtist"> Select Artist</label>
    </div>
    <div class="col-sm-8">
      <!-- <input type="text" class="form-control" v-model="album.artist" id="album-artist" placeholder="Enter Artist Name"
        name="title"> -->
         <select v-on:change="onChange($event)" class="form-select" aria-label="Default select example">
                <option v-if="album.artistId" selected>{{album.artist}}</option>
  <option v-else selected></option>
                  <option :value="artist.id" v-for="artist in artists" :key="artist.id" :artist="artist">{{ artist.name }}
                  </option>
                </select>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-2">
      <label for="albumDesc" class="form-label">Description</label>
    </div>
    <div class="col-sm-8">
      <textarea class="form-control" v-model="album.description" id="album-desc" rows="3"></textarea>
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


  <button type="button" class="btn btn-success" @click="updateAlbum()">Save</button>
  <button type="button" class="btn btn-secondary" @click="cancel()">Cancel</button>

</template>

<script>
import AlbumDataService from "../../services/AlbumDataService";
import ArtistDataService from "../../services/ArtistDataService";
// import TracksDataService from "../../services/TracksDataService";
import { Buffer } from 'buffer';

export default {
  name: "edit-album",
  props: ['id'],
  data() {
    return {
      album: {},
      message: "Enter data and click save",
      previewImage: null,
      selectedFile: null,
      artists:[]
    };
  },
  methods: {
     onChange(e){
            console.log("eeeeeee",e.target.value);
            console.log("nameee",e.target.options[e.target.options.selectedIndex].text)
            this.album.artist = e.target.options[e.target.options.selectedIndex].text;
            this.album.artistId = e.target.value;
        },
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
      getArtists() {
             ArtistDataService.getAll()
                .then(response => {
                    this.artists = response.data;
                    console.log("Artists:::",this.artists)
                })
                .catch(e => {
                    this.message = e.response.data.message;
                });
        },
    retrieveAlbum() {
      AlbumDataService.get(this.id)
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
          this.album = arr[0];
          console.log("alb",this.album)
          this.previewImage=this.album.imgURL;

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

    updateAlbum() {
      var data = {
        title: this.album.title,
        artist:this.album.artist,
        description: this.album.description,
        artistId: this.album.artistId

      };
      
      AlbumDataService.update(this.album.id,data, this.selectedFile)
        .then(response => {
          this.album.id = response.data.id;

          // console.log("resp...",response.data.);
       
          // this.$router.push({ name: 'viewAlbum', params: { id: this.album.id, album: this.album.title } });   
          this.$router.push({ name: 'Home' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'viewAlbum', params: { id: this.album.id, album: this.album.title } });   
    }
  },
    mounted() {
    this.retrieveAlbum();
     this.getArtists();
  }
}

</script>

<style>

#albumImg2 {
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