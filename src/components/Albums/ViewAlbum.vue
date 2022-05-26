<template>
    <h2>Album View</h2>
    <h4>{{ message }}</h4>
    <h3> {{album.title}}</h3>
    <img  :src="album.imgURL" class="img-thumbnail album-image" id="img" alt="Album Image" width="350" height="350"> 
    <p>Artist : <strong>{{album.artist}}</strong></p>
    <h5> Description</h5>
    <p> {{album.description}}</p>
    <button color="success" @click="goEditTutorial()"
    >Edit</button>
     <button color="success" @click="goAddLesson(id)"
    >Add Songs</button>

    <h3>Playlist</h3>
    <TracksDisplay 
        v-for="track in tracks"
        :key="track.id"
        :track="track"
    />


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
      tracks : [],
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
            var blobObj = resData.data;
            var bufferBase64 = new Buffer(blobObj.data, 'binary').toString('base64');
            var imgBase64 = "data:image/jpeg;base64," + bufferBase64;
            arr[0]["imgURL"] = imgBase64;

            this.album = arr[0];   

          TracksDataService.getAllTracks(this.id)
            .then(response=> {
              this.tracks = response.data
              console.log("Tracks...",this.tracks);
              })
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    //  goEditTutorial() {
    //   this.$router.push({ name: 'edit', params: { id: this.id } });
    // },
    // goEditLesson(lesson) {
    //   this.$router.push({ name: 'editLesson', params: { tutorialId: this.id,lessonId: lesson.id} });
    // },
    // goAddLesson() {
    //   this.$router.push({ name: 'addLesson', params: { tutorialId: this.id } });
    // },

    // goDeleteLesson(lesson) {
    //   LessonDataService.deleteLesson(lesson.tutorialId,lesson.id)
    //     .then( () => {
    //       this.retrieveLessons()
    //     })
    //     .catch(e => {
    //       this.message = e.response.data.message;
    //     });
    // },
    cancel(){
        this.$router.push({ name: 'Home' });
    }
  },
    mounted() {
    this.retrieveTracks();
  }
}
</script>

<style>

/* #img{
  height: 200px;
    width: 20%;
} */
</style>