<template>
  <!-- Vertically centered modal -->
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal fade" id="staticBackdrop" :class="{ show: active, 'd-block': active }" data-bs-backdrop="static"
      data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add New Track</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              v-on:click="$emit('closeModal')"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Track Title</label>
                <input type="text" v-model="title" class="form-control" id="recipient-name">
              </div>
              <div v-if="!albumId" class="form-group">
                <label for="album-name" class="col-form-label">Select Album</label>
                <select v-on:change="onChange($event)" class="form-select" aria-label="Default select example">
                  <option selected>{{albumid}}</option>
                  <option :value="album.id" v-for="album in albums" :key="album.id" :album="album">{{ album.title }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="message-text" class="col-form-label">Tracks URL</label>
                <input type="text" v-model="url" class="form-control" id="recipient-name">
              </div>
            </form>
          </div>
          <div class="modal-footer">

            <button type="button" v-if="trackData==null" class="btn btn-primary" @click="createTracks">Save Track</button>
            <button type="button" v-if="trackData" class="btn btn-primary" @click="updateTrack">Update Track</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              v-on:click="$emit('closeModal')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import TracksDataService from "../../services/TracksDataService";
import AlbumsDataService from "../../services/AlbumDataService";

export default {
  name: "BootstrapModal",
  emits: ["closeModal"],
  props: {
    showModal: Boolean,
    albumId: Number,
    trackData: Object
  },
  data() {
    return {
      active: this.showModal,
      id:"",
      title: "",
      url: "",
      albumid: "",
      albums: [],
    };
  },
  watch: {
    showModal: {
      handler(newVal) {
        this.active = newVal;
        const body = document.querySelector("body");
        this.showModal ? body.classList.add("modal-open") : body.classList.remove("modal-open")
      },
      immediate: true,
      deep: true,
    },
    trackData: {
      handler(data) {
        if (data != null) {
          console.log("newwww", data);
          this.id=data.id;
          this.title = data.title;
          this.url = data.url;
          this.albumid = data.albumId;
        }
        else {
          console.log("nullll", data);
          this.id="";
          this.title = "";
          this.url = "";
          this.albumid = "";
        }


      }

    }
  },
  
  methods: {
    close_modal() {

      this.$emit("close")
    },
    onChange(e) {
      console.log("eeeeeee", e.target.value);
      console.log("trackkkkk11", this.$props.track)
      this.albumid = e.target.value;
    },
    getAllAlbums() {
      console.log("trackkkkk", this.$props)
      AlbumsDataService.getAll()
        .then(response => {
          this.albums = response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    createTracks() {
      var data = {
        title: this.title,
        url: this.url
      };

      TracksDataService.createTrack(this.albumid, data)
        .then(response => {
          this.tracks = response.data;
          this.title = "";
          this.url = "";
          this.getAllAlbums();
          this.$emit("closeModal");


        })
        .catch(e => {
          this.message = e.response.data.message;
        });


    },
    updateTrack(){
      var data = {
        title: this.title,
        url:this.url,
      };
      TracksDataService.updateTrack(this.albumid,this.id, data)
        .then(response => {

          console.log("resp...",response.data);
          this.$emit("closeModal");
       
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.getAllAlbums();
  }
};
</script>

<style >
.modal-dialog {
  top: 20%
}
</style>