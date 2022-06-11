<template>
  <!-- <div class="card card__big margin-top-xxl"> -->
    <!-- <h2 v-if="!showDefaultSearch" class="search-title">{{ type }}s</h2> -->
    <ul v-if="searchCategory == 'artist'" class="artist-list flex-list mt-5">
      <h1>Artist Results</h1>
      <!-- <Artist v-for="artist in artists" :key="artist.mbid" :artist="artist" /> -->
    </ul>

    <ul v-if="searchCategory == 'album'" class="album-list flex-list mt-5">
      <h1>Albums Results</h1>
      <Album v-for="album in albums" :key="album.id" :album="album" />
    </ul>

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
          this.albums = response.data;
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
    retrieveAlbums() {
      if (this.searchCategory == 'album') {
        this.searchAlbum();
      }
      else if (this.searchCategory == 'artist') {
        // this.searchArtist();
      }
      else if (this.searchCategory == 'track') {
        this.searchTrack();
      }
    }
  },

  mounted() {
    this.retrieveAlbums();
  }
}
</script>

<style>
</style>