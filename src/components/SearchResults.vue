<template>
  <div class="card card__big margin-top-xxl">
    <!-- <h2 v-if="!showDefaultSearch" class="search-title">{{ type }}s</h2> -->

    <ul v-if="searchCategory == 'artist'" class="artist-list flex-list">
      <h1>Artist</h1>
      <!-- <Artist v-for="artist in artists" :key="artist.mbid" :artist="artist" /> -->
    </ul>

    <ul v-if="searchCategory == 'album'" class="album-list flex-list">
      <h1>Albums</h1>
      <!-- <Album v-for="album in albums" :key="album.id" :album="album" /> -->
    </ul>

    <ul v-if="searchCategory == 'track'" class="track-list flex-list">
      <h1>Tracks</h1>
      <!-- <li v-for="track in tracks" :key="track.mbid" class="track-wrapper flex-no-borders">
        <Song :track="track" />
      </li> -->
    </ul>
  </div>
  <!-- <h2>Search Results -- {{searchCategory}} and {{searchText}}</h2> -->

  <App @searchClicked="searchResults" />

</template>

<script>
import App from '@/App.vue';
import AlbumDataService from "../services/AlbumDataService";

export default {
  name: "Search-results",
  props: ["type", "query"],
  data() {
    return {
      searchCategory: this.$route.params.type,
      searchText: this.$route.query.q
    };
  },
  methods: {
    searchResults(data) {
      this.searchText = data.text;
      this.searchCategory = data.type;

    },
    searchAlbum() {
      AlbumDataService.findByTitle(this.title)
        .then(response => {
          this.albums = response.data;
          console.log("results.", this.albums);
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
        this.searchArtist();
      }
      else if (this.searchCategory == 'track') {
        this.searchTrack();
      }
    }
  },
  components: { App },

  mounted() {
    this.retrieveAlbums();
  }
}
</script>

<style>
</style>