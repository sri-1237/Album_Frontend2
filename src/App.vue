<template>

  <!--Page Nav Bar -->
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img :src="logo" width="100" height="80" />
        Music Info
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-lg-5 ms-5 ">
          <li class="nav-item me-3 "  @click="returnHome()">
            <p class="nav-link" :class="{ active: albumTab }" aria-current="page">Albums</p>
          </li>

          <li class="nav-item me-3 " @click="artistPage()">
            <p class="nav-link" :class="{ active: artistTab }" aria-current="page">Artists</p>
          </li>


          <li class="nav-item me-3" @click="tracksPage()">
             <p class="nav-link" :class="{ active: trackTab }" aria-current="page">Tracks</p>
          </li>

        </ul>


        <!--Search Input -->
        <div class="search-container">
          <input class="form-control me-2 searchInput" type="search" v-model="searchText"
            placeholder="Search by Album, Artist and Track title...">
          <select v-model="selected" class="form-select searchcategory" :initial="startingType">
            <option v-for="element in elements" :key="element.value" :value="element.value">{{ element.name }}</option>
          </select>
          <button class="btn btn-primary" type="button" @click="searchRes">Search</button>

        </div>
      </div>
    </div>
  </nav>

  <!--Page Content -->
  <div class="container-fluid pageContent">
    <div class="container">
<router-view />
    </div>
    
  </div>
</template>

<script>

import logo from './assets/OC-Logo.png'
import AlbumDataService from "./services/AlbumDataService";


export default {
  name: "app",
  components: {},
  data: () => ({
    logo,
    searchText: "",
    albums: [],
    search: '',
    selected: 'album',
    elements: [
      { name: 'Albums', value: 'album' },
      { name: 'Tracks', value: 'track' },
      { name: 'Artists', value: 'artist' }
    ],
    albumTab: false,
    artistTab:false,
    trackTab:false
  }),
  computed: {
    isActive() {
      return this.search !== undefined && this.search !== null && this.search !== '';
    },
    startingType() {
      return this.elements[0].value;
    }
  },

  methods: {
    setSearch: function (search) {

      this.search = search;
    },
    changeType: function (type) {

      this.type = type;
      console.log("changed", this.type)
    },
    searchTitle() {
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

    searchRes() {
      console.log("ssss", this.selected);
      var params = {
        text: this.searchText,
        type: this.selected
      }
      this.$emit('searchClicked', params);
      this.$router.push({ name: 'search', params: { type: this.selected }, query: { q: this.searchText } })

    },
    artistPage() {
       this.artistTab = true;
       this.albumTab = false;
       this.trackTab=false;
      this.$router.push({ name: 'artists' });
    },
    tracksPage() {
       this.artistTab = false;
       this.albumTab = false;
       this.trackTab=true;
      this.$router.push({ name: 'tracks' });
    },
    returnHome() {
      this.artistTab = false;
       this.albumTab = true;
       this.trackTab=false;
      this.$router.push({ name: 'Home' });
      
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 1500px;
  background-image: linear-gradient(to bottom right, #ff7e3d, #dc3545);
}

.pageContent {
  margin-top: 6%;
   padding-top: 40px;
  padding-bottom: 70px;
}

 /* .container-fluid {
  max-width: 1250px;
  padding-top: 70px;
  padding-bottom: 70px;
} */

.search-container {
  margin-left: 10%;
  width: 80%;
}

.searchInput {
  width: 60% !important;
  display: inline !important;
}

.searchcategory {
  display: inline !important;
  width: auto !important;
}

.nav-item {
  cursor: pointer;
}

.active{
  background-color: #9e9e9ec4;
  border-radius: 0.25rem;
}


.type-wrapper {
  display: inline-block;
  margin: 0 5px;
}
</style>
