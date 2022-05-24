<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">

   
    <router-link to="/" class="navbar-brand">
<img :src="logo" width="100" height="80" />
    Music Info
    </router-link>

    <!-- <form class="d-flex">
        <input class="form-control me-2 searchBar" type="text" v-model="title" placeholder="Search by Album title">
        <button class="btn btn-primary" type="button" @click="searchTitle">Search</button>
      </form> -->
   </div>
  </nav>
  <div class="container mt-3">
    <router-view />
  </div>
</template>

<script>

import logo from './assets/OC-Logo.png'
import AlbumDataService from "./services/AlbumDataService";

export default {
  name: "app",
  data: () => ({
    logo,
     title: "",
      albums: [],
  }),

   methods: {
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
    }
   }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background-image: linear-gradient(to bottom right, #ff7e3d, #dc3545);
}

.searchBar{
  width: 450px;
    height: 40px;
    margin-top: 20px;
}
</style>
