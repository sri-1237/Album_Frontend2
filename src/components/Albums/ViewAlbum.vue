<template>

  <h4>{{ message }}</h4>

  <div class="row">
    <div class="col-4">
      <img :src="album.imgURL" class="img-thumbnail" id="albumImg" alt="Album Image" />
    </div>
    <div class="col">
      <br />
      <h2> Title : {{ album.title }}</h2>
      <br /><br />
      <h5>Artist : <strong>{{ album.artist }}</strong></h5>
      <h5> Description</h5>
      <p> {{ album.description }}</p>
    </div>

  </div>


<div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" @click="goEditAlbum()">Edit</button>
  <button type="button" @click="goDeleteAlbum(album)" class="btn btn-danger">Delete</button>
  <!-- <button type="button" @click="goAddLesson(id)" class="btn btn-success">Add Tracks</button> -->
</div>
  

  <h3>Playlist</h3>
  <TracksDisplay v-for="track in tracks" :key="track.id" :track="track" />


  <!-- <LessonDisplay
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        @deleteLesson="goDeleteLesson(lesson)"
        @updateLesson="goEditLesson(lesson)"
    /> -->


</template>

<script>
import AlbumDataService from "../../services/AlbumDataService";
import TracksDataService from "../../services/TracksDataService";
import TracksDisplay from '../Tracks/TracksDisplay.vue';
import { Buffer } from 'buffer';

export default {
  name: "view-album",
  props: ['id'],
  components: {
    TracksDisplay
  },
  data() {
    return {
      album: {},
      tracks: [],
      message: ""
    };
  },
  methods: {
    retrieveTracks() {
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

          TracksDataService.getAllTracks(this.id)
            .then(response => {
              this.tracks = response.data
              console.log("Tracks...", this.tracks);
            })
            .catch(e => {
              this.message = e.response.data.message;
            });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     goEditAlbum() {
      this.$router.push({ name: 'editAlbum', params: { id: this.id } });
    },
    // goEditLesson(lesson) {
    //   this.$router.push({ name: 'editLesson', params: { tutorialId: this.id,lessonId: lesson.id} });
    // },
    // goAddLesson() {
    //   this.$router.push({ name: 'addLesson', params: { tutorialId: this.id } });
    // },

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
</style>