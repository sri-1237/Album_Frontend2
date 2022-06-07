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
          <li class="nav-item me-3" @click="returnHome()">
            <a class="nav-link active" aria-current="page" href="#">Albums</a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Artists
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Add New Artist</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>

        </ul>
        <!--Search Input -->
        <div class="search-container">
          <input class="form-control me-2 searchInput" type="search" v-model="searchText" 
            placeholder="Search by Album title">
           <select v-model="selected" class="selector" :initial="startingType" >
      <option v-for="element in elements" :key="element.value" :value="element.value">{{ element.name }}</option>
    </select>
          <button class="btn btn-primary" type="button" @click="searchRes">Search</button>
          
        </div>
      </div>
    </div>
  </nav>

  <!--Page Content -->
  <div class="container-fluid pageContent">
    <router-view />
  </div>
</template>

<script>

import logo from './assets/OC-Logo.png'
import AlbumDataService from "./services/AlbumDataService";


export default {
  name: "app",
   components: {  },
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
      ]
  }),
   computed: {
    isActive () {
      return this.search !== undefined && this.search !== null && this.search !== '';
    },
    startingType () {
      return this.elements[0].value;
    }
  },

  methods: {
      setSearch: function (search) {
        
      this.search = search;
    },
    changeType: function (type) {
      
      this.type = type;
      console.log("changed",this.type)
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

    searchRes()
    {
       console.log("ssss",this.selected);
       var params = {
         text : this.searchText,
         type : this.selected
       }
       this.$emit('searchClicked', params);
      this.$router.push({ name: 'ss', params: { type: this.selected } , query: { q: this.searchText } })

    },
    returnHome(){
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
  height:1500px;
  background-image: linear-gradient(to bottom right, #ff7e3d, #dc3545);
}

.pageContent {
  margin-top: 6%;
}

.search-container {
  margin-left: 10%;
  width: 80%;
}

.searchInput {
  width: 60% !important;
  display: inline !important;
}


  .type-wrapper {
    display: inline-block;
    margin: 0 5px;
  }

</style>
