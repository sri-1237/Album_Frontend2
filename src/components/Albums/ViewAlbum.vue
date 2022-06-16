<template>

  <h4>{{ message }}</h4>
  <section>

    <div class="card albumCard">




      <div class="row album-info">

        <div class="col-4">
          <img :src="album.imgURL" class="albumImage" alt="Album Image" />

        </div>
        <div class="col-8">
          <div class="btn-group albumCtrls" role="group" aria-label="Basic mixed styles example">
        <button type="button" @click="goEditAlbum()">Edit</button>
        <button type="button" @click="goDeleteAlbum(album)" class="btn btn-danger">Delete</button>
        <button type="button" @click="toggleModal" class="btn btn-success">Add Tracks</button>

          <div style="
    margin-left: -250px;">
         <h2 class="albumTitle"> {{ album.title }}</h2>
       <h5 class="artistDetails">Artist : <strong style="text-decoration: underline; cursor:pointer" @click="viewArtist(album)">{{ album.artist }}</strong></h5>
      </div>
        
      </div>
          
        </div>
     
          <div style="
    display: inline-block;">

    <h4 class="albumDesc"> Description</h4>
          <p> {{ album.description }}</p>

            <!-- <h2 class="albumTitle"> {{ album.title }}</h2>
          <br /><br />
          <h5 class="artistDetails">Artist : <strong>{{ album.artist }}</strong></h5> -->

          </div>
          
          
        <!-- </div> -->

      </div>


      <!-- <div class="btn-group albumCtrls" role="group" aria-label="Basic mixed styles example">
        <button type="button" @click="goEditAlbum()">Edit</button>
        <button type="button" @click="goDeleteAlbum(album)" class="btn btn-danger">Delete</button>
        <button type="button" @click="toggleModal" class="btn btn-success">Add Tracks</button>
      </div> -->

      <!-- <AddTrack :show="showModal" @close="getAlbum()" :id='album.id'> </AddTrack> -->
      <AddTrack :showModal="showModalNow" :albumId="this.id" @closeModal="closeMyModal" :trackData="singleTrackData">
      </AddTrack>

      <h4 class="albumDesc">Popular TRACKS</h4>
      <TracksDisplay v-for="track in tracks" :key="track.id" :track="track" @getTracks="getTracks"
        @editTracks="editThisTracks" />


      <!-- <LessonDisplay
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        @deleteLesson="goDeleteLesson(lesson)"
        @updateLesson="goEditLesson(lesson)"
    /> -->
    </div>
  </section>

</template>

<script>
import AlbumDataService from "../../services/AlbumDataService";
import TracksDataService from "../../services/TracksDataService";
import TracksDisplay from '../Tracks/TracksDisplay.vue';
import AddTrack from "../Tracks/AddTrack.vue"
import { Buffer } from 'buffer';

export default {
  name: "view-album",
  props: ['id'],
  components: {
    TracksDisplay, AddTrack
  },
  data() {
    return {
      showModalNow: false,
      album: {},
      tracks: [],
      message: "",
      singleTrackData: {},
    };
  },
  methods: {
    retrieveTracks() {
      this.showModal = false;
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
          this.getTracks();

        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    goEditAlbum() {
      //  console.log("id.....",this.id);
      this.$router.push({ name: 'editAlbum', params: { id: this.id } });
    },
    getTracks() {
      TracksDataService.getAllTracksWithAlbum(this.id)
        .then(response => {
          this.tracks = response.data
          // console.log("Tracks...", this.tracks);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    // goEditLesson(lesson) {
    //   this.$router.push({ name: 'editLesson', params: { tutorialId: this.id,lessonId: lesson.id} });
    // },
    // goAddLesson() {
    //   this.$router.push({ name: 'addLesson', params: { tutorialId: this.id } });
    // },

    editThisTracks(event) {
      console.log("edittttttt", event);
      this.singleTrackData = event;
      this.showModalNow = true;
    },

    closeMyModal() {
      this.showModalNow = false;
      this.getTracks();
    },
    toggleModal() {
      this.singleTrackData = null;
      this.showModalNow = !this.showModalNow;
    },

    viewArtist(album){
 this.$router.push({ name: 'viewArtist', params: { id: album.artistId, artist: album.artist } });
    },

    goDeleteAlbum(album) {
      AlbumDataService.delete(album.id)
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'Home' });
    }
  },
  mounted() {
    this.retrieveTracks();
  }
}
</script>

<style>
#albumImg {
  width: 600px;
  height: 400px;
}

section {
  padding: 6%;
}

.album-info{
  font-family: 'Roboto', sans-serif;
    position: relative;
    display: flow-root;
    text-align: left;
    margin-bottom: 20px
}

.album-info .albumImage{
  display: inline-block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    cursor: inherit;
    /* float: left; */
    box-sizing: border-box;
}

.album-info .albumTitle{
  font-size: 36px;
    /* display: inline-block; */
    width: auto;
    /* margin: 0; */
    /* padding: 55px 0 0 10px; */
    /* float: left; */
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.albumTitle{
  margin-top: 20px;
 margin-left: -150px;;
}

.albumDesc{
  color: whitesmoke;
  display: block;
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 0.75px;
    font-weight: 300;
    text-align: center;
}

.albumCard{
  padding: 25px;
}

.albumCtrls{
  margin-top: -40px;
  display: block !important;
  float: right;
}

.artistDetails{
  color: white;
    margin-top: 15px;
     margin-left: -150px;
    
}
</style>