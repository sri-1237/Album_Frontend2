<template>
  <!-- <div class="card card__big margin-top-xxl"> -->
    <!-- <h2 v-if="!showDefaultSearch" class="search-title">{{ type }}s</h2> -->
    <ul v-if="searchCategory == 'artist'" class="artist-list flex-list mt-5">
      <h1>Artist Results</h1>
      <!-- <Artist v-for="artist in artists" :key="artist.mbid" :artist="artist" /> -->
    </ul>

    <div v-if="searchCategory == 'album'" class="row row-cols-2 row-cols-lg-6">
     <!-- <h1>Albums Results</h1> -->
    
      <Album v-for="album in albums" :key="album.id" :album="album"  @viewAlbum="viewAlbum(album)" @deleteAlbum="deleteAlbum(album)"
        @editAlbum="editAlbum(album)" />
      
    </div>


    <ul v-if="searchCategory == 'track'" class="track-list flex-list mt-5">
      <h1>Tracks Results</h1>
      <TracksDisplay v-for="track in tracks" :key="track.id" :track="track" @getTracks="searchTrack" />
      <!-- @getTracks="getAllTracks"
    @editTracks="editThisTracks" />
        -->
      <!-- <li v-for="track in tracks" :key="track.mbid" class="track-wrapper flex-no-borders">
        <Song :track="track" />
      </li> -->
    </ul>
  <!-- </div> -->
  <!-- <h2>Search Results -- {{searchCategory}} and {{searchText}}</h2> -->

  <App @searchClicked="searchResults" />

</template>

<script>
import App from '@/App.vue';
import AlbumDataService from "../services/AlbumDataService";
import TracksDataService from "../services/TracksDataService";
import TracksDisplay from './Tracks/TracksDisplay.vue';
import Album from './Albums/Album.vue';

import { Buffer } from 'buffer';


export default {
  name: "Search-results",
  props: ["type", "query"],
  components: {App, Album, TracksDisplay},
  data() {
    return {
      albums: [],
      tracks:[],
      searchCategory: this.$route.params.type,
      searchText: this.$route.query.q
    };
  },
  methods: {
    searchResults(data) {
      this.searchText = data.text;
      this.searchCategory = data.type;
      if (this.searchCategory == 'album') {
        this.searchAlbum();
      }
      else if (this.searchCategory == 'artist') {
        // this.searchArtist();
      }
      else if (this.searchCategory == 'track') {
        this.searchTrack();
      }
    

    },
    searchAlbum() {
      console.log("textttt",this.searchText);
      AlbumDataService.findByTitle(this.searchText)
        .then(response => {
           var arr = new Array(response.data);

          for (var i in arr[0]) {

            let resData = arr[0][i];
            if (resData.data != null) {
              var blobObj = resData.data;
              var bufferBase64 = new Buffer(blobObj.data, 'binary').toString('base64');
              this.currentImage = "data:image/jpeg;base64," + bufferBase64;
              arr[0][i]["imgURL"] = this.currentImage;
            }


          }
          this.albums = arr[0];
          // this.albums = response.data;
          console.log("results.", this.albums);
          // this.setActiveTutorial(null);

        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    searchTrack() {
      console.log("textttt",this.searchText);
      TracksDataService.findByTitle(this.searchText)
        .then(response => {
          this.tracks = response.data;
          console.log("results.", this.tracks);
          // this.setActiveTutorial(null);

        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    searchNow() {

      if (this.searchCategory == 'album') {
        this.searchAlbum();
      }
      else if (this.searchCategory == 'artist') {
        // this.searchArtist();
      }
      else if (this.searchCategory == 'track') {
        this.searchTrack();
      }
    },
    viewAlbum(album){
      this.$router.push({ name: 'viewAlbum', params: { id: album.id, album: album.title } });
    },
    editAlbum(album) {
      //  console.log("id.....",album.id);
      this.$router.push({ name: 'editAlbum', params: { id: album.id } });
    },

     deleteAlbum(album) {
      AlbumDataService.delete(album.id)
        .then(() => {
           this.searchNow();
          // this.$router.push({ name: 'Home' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
  },

  mounted() {
    this.searchNow();
  }
}
</script>

<style>
</style>