<template>
  <h1>Add New Album</h1>

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
      <input class="form-control" type="file" v-on="album.coverImg" id="formFile">
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
      <div class="form-group d-flex flex-row align-items-center" v-for="(input, k) in inputs" :key="k">
        <input type="text" class="form-control" v-model="input.name" placeholder="Enter Song URL">
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
      inputs: [
        {
          id: null,
          name: "",
          description: "",
          albumId: ""
        }
      ],
      message: "Enter data and click save"
    };
  },
  methods: {
    saveAlbum() {

      var data = {
        title: this.album.title,
        description: this.album.description
      };

      console.log("Data..", data);
      AlbumDataService.create(data)
        .then(response => {
          this.album.id = response.data.id;
          console.log("add album " + response.data);
          console.log("inputs..", this.inputs);
          for(var i in this.inputs) {
            var trackdata = {
              title: this.inputs[i].name
            };
             TracksDataService.createTrack(this.album.id, trackdata)
            .then(response => {
              this.tracks = response.data
              console.log("Tracks...", this.tracks);
              
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
      this.inputs.push({ name: '' });
    },
    remove(index) {
      this.inputs.splice(index, 1);
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
  display: flex;
}

button {
  padding: 5px 20px;
  margin: 10px;
}
</style>