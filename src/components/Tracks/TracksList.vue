<template>

  <div class="row">

    <h2 class="text-center contentHeader">
      <button type="button" class="btn btn-success addBtn" @click="toggleModal"><i class="fa fa-plus"
          aria-hidden="true"></i>
        Add Tracks</button> <strong style="
    margin-left: -180px;">Tracks</strong>
    </h2>
    <hr>
  </div>
  <AddTrack :showModal="showModalNow" @closeModal="closeMyModal" :trackData="singleTrackData"> </AddTrack>
  <TracksDisplay v-for="track in tracks" :key="track.id" :track="track" @getTracks="getAllTracks"
    @editTracks="editThisTracks" />
</template>

<script>
import TracksDisplay from '../Tracks/TracksDisplay.vue';
import AlbumDataService from "../../services/AlbumDataService";
import TracksDataService from "../../services/TracksDataService";
import AddTrack from "./AddTrack.vue"

export default {
  name: "view-tracks",
  props: ['id'],
  components: {
    TracksDisplay, AddTrack
  },
  data() {
    return {
      showModalNow: false,
      album: {},
      singleTrackData: {},
      tracks: [],
      message: ""
    };
  },
  methods: {
    getAllTracks() {
      this.showModal = false;

      TracksDataService.getAllTracks(this.id)
        .then(response => {
          this.tracks = response.data
          // console.log("Tracks...", this.tracks);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
    goEditAlbum() {
      //  console.log("id.....",this.id);
      this.$router.push({ name: 'editAlbum', params: { id: this.id } });
    },
    // goEditLesson(lesson) {
    //   this.$router.push({ name: 'editLesson', params: { tutorialId: this.id,lessonId: lesson.id} });
    // },
    // goAddLesson() {
    //   this.$router.push({ name: 'addLesson', params: { tutorialId: this.id } });
    // },


    closeMyModal() {
      this.showModalNow = false;
      this.getAllTracks();
    },
    toggleModal() {
      this.singleTrackData = null;
      this.showModalNow = !this.showModalNow;
    },

    editThisTracks(event) {
      console.log("edittttttt", event);
      this.singleTrackData = event;
      this.showModalNow = true;
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
    this.getAllTracks();
  }
}
</script>