<template>
  <h2 class="text-center">Add New Album</h2>
  <br>

  <div class="row">
    <div class="col-sm-2">
      <label for="albumTitle"> Title</label>
    </div>
    <div class="col-sm-8">
      <input type="text" class="form-control" v-model="album.title" id="album-title" placeholder="Enter Album Title"
        name="title">
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

  <div class="row">
    <div class="col-sm-2">
      <label for="albumArtist"> Select Artist</label>
    </div>
    <div class="col-sm-8">
      <!-- <input type="text" class="form-control" v-model="album.artist" id="album-artist" placeholder="Enter Artist Name"
        name="title"> -->
         <select v-on:change="onChange($event)" class="form-select" aria-label="Default select example">
                  <option selected></option>
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

  <div class="row">
    <div class="col-sm-2">
      <label for="albumDesc" class="form-label">Add Tracks</label>
    </div>

    <div class="col-sm-6">
      <div class="form-group d-flex flex-row align-items-center trackInput" v-for="(input, k) in inputs" :key="k">
       <input type="text" class="form-control" v-model="input.name" placeholder="Enter Song Title">
        <input type="text" class="form-control" v-model="input.url" placeholder="Enter Song URL">
        <span id="add-delete-icons">
          <i class="fas fa-minus-circle" @click="remove(k)" v-show="k || (!k && inputs.length > 1)"></i>
          <i class="fas fa-plus-circle" @click="add(k)" v-show="k == inputs.length - 1"></i>
        </span>
      </div>
    </div>

  </div>


  <button type="button" class="btn btn-success" @click="saveAlbum()">Save</button>
  <button type="button" class="btn btn-secondary" @click="cancel()">Cancel</button>

</template>
<script>
import AlbumDataService from "../../services/AlbumDataService";
import TracksDataService from "../../services/TracksDataService";
import ArtistDataService from "../../services/ArtistDataService";

export default {
  name: "add-album",
  data() {
    return {
      album: {
        id: null,
        title: "",
        coverImg: "",
        description: "",
        published: false,
        artistId: "",
        artist:""
      },
      inputs: [
        {
          id: null,
          name: "",
          description: "",
          albumId: ""
        }
      ],
      message: "Enter data and click save",
      selectedFile: null,
      currentFile: undefined,
      progress: 0, 
      fileInfos: [],
      artists:[]
    };
  },
  methods: {
     onChange(e) {
      console.log("eeeeeee", e.target.value);
      console.log("trackkkkk11", this.$props.track)
      this.album.artistId  = e.target.value;
       this.album.artist = e.target.options[e.target.options.selectedIndex].text;
    },
    selectFile(event) {
      this.selectedFile = event.target.files[0];
      
      console.log("test image...", this.selectedFile);
    },
    getAllArtists() {
      console.log("artisttt", this.$props)
      ArtistDataService.getAll()
        .then(response => {
          this.artists = response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    saveAlbum() {
      // this.currentFile = this.selectedFiles.item(0);

      this.currentImage = this.$refs.file.files.item(0);

      // console.log("Imggg...",this.selectedFile);

      // this.previewImage = URL.createObjectURL(this.currentImage);

      console.log("Imggg 2222...",this.album.artist );

      var data = {
        title: this.album.title,
        artistId: this.album.artistId,
         artist:this.album.artist,
        description: this.album.description,
        
      };

      // console.log("Data..", data);
      AlbumDataService.createAlbum(data, this.selectedFile)
        .then(response => {
          this.album.id = response.data.id;
          // console.log("add album " + response.data);
          // console.log("inputs..", this.inputs);
          for(var i in this.inputs) {
            var trackdata = {
              title:this.inputs[i].name,
              url: this.inputs[i].url
            };
             TracksDataService.createTrack(this.album.id, trackdata)
            .then(response => {
              this.tracks = response.data
              // console.log("Tracks...", this.tracks);
              
            })
            .catch(e => {
              this.message = e.response.data.message;
            });
          }
          this.$router.push({ name: 'viewAlbum', params: { id: this.album.id, album: this.album.title } });        

        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'Home' });
    },
    add(index) {
      console.log("index..", index);
      this.inputs.push({ name: '', url:"" });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    }
  },
   mounted() {
    this.getAllArtists();
  }
}

</script>
<style>
.row {
  padding: 15px;
}

.trackInput{
  padding-bottom: 10px;
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