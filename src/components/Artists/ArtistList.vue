<template>

  <form class="d-flex">
    <input class="form-control me-2 searchBar" type="text" v-model="title" placeholder="Search by Artist title">
    <button class="btn btn-primary" type="button" @click="searchTitle">Search</button>
  </form>

  <div class="row">+
    <div class="col-sm-10">
      <h1>Artists</h1>
    </div>
    <div class="col-sm-2">
      <button type="button" class="btn btn-success" @click="addArtist()"><i class="fa fa-plus" aria-hidden="true"></i>
        Add Artist</button>
    </div>
  </div>



  <div class="card card__big margin-top-xxl">

    <h4 id="notFound" v-if="!artists.length">No Artists Found!</h4>

    <ul class="artist-list flex-list">
      <li class="artist-wrapper" :class="{ active: index == currentIndex }" v-for="(artist, index) in artists" :key="index"
        @click="setActiveTutorial(artist, index)">
        
        <router-link :to="{ name: 'viewArtist', params: { id: artist.id, artist: artist.name } }" :class="'artist'">

          <img :src="artist.imgURL" class="img-thumbnail artist-image" id="img" alt="Artist Image">
          <!-- <a :href="album.data">{{ album.title }}</a> -->
          <p id="artistName">{{ artist.name }}</p>
        </router-link>

      </li>
    </ul>
  </div>
</template>

<script>
import ArtistDataService from "../../services/ArtistDataService";
import { Buffer } from 'buffer';

export default {
  name: "artists-list",
  data() {
    return {
      artists: [],
      // currentTutorial: null,
      currentImage: undefined,
      currentIndex: -1,
      title: "",

    };
  },

  methods: {
    retrieveArtists() {
      ArtistDataService.getAll()
        .then(response => {
          // this.albums = response.data;

          var arr = new Array(response.data);

          for (var i in arr[0]) {
             
            let resData = arr[0][i];
            if(resData.data != null)
          {
            var blobObj = resData.data;
            var bufferBase64 = new Buffer(blobObj.data, 'binary').toString('base64');
            this.currentImage = "data:image/jpeg;base64," + bufferBase64;
            arr[0][i]["imgURL"] = this.currentImage;
          }
            

          }
          this.artists = arr[0];

        })
        .catch(e => {
          console.log("err..", e);
          this.message = e.response.data.message;
        });
    },
    addArtist() {
      this.$router.push({ name: 'addArtist' });
    },
    searchTitle() {
      ArtistDataService.findByTitle(this.title)
        .then(response => {
           var arr = new Array(response.data);

          for (var i in arr[0]) {
             
            let resData = arr[0][i];
            if(resData.data != null)
          {
            var blobObj = resData.data;
            var bufferBase64 = new Buffer(blobObj.data, 'binary').toString('base64');
            this.currentImage = "data:image/jpeg;base64," + bufferBase64;
            arr[0][i]["imgURL"] = this.currentImage;
          }
            

          }
          this.artists = arr[0];

        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveArtists();
  }
};
</script>

<style>
/* @album-width: 180px;
@image-size: 156px;
@border-radius: 4px; */

#img
{
  height: 190px;
}

.artist-wrapper {
  margin: 12px;
  display: inline-block;
}

.artist {
  width: 180px;
  padding: 5px;
  margin: 10px 0 5px 0;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  text-decoration: none;
}

.artist-image {
  display: inline-block;
  width: 156px;
  height: 156px;
  margin: 0 auto;
  border-radius: 4px;
  object-fit: cover;

  /* &[src=""] {
      background-color: @color-background-transparent;
    } */
}

.artist-name {
  display: block;
  width: 156px;
  font-size: 16px;
  max-height: 40px;
  overflow: hidden;
  margin: 0 auto;
}

#artistTitle {
  color: white;
}

.card {
  background-color: #212529 !important;
}

.searchBar {
  width: 60% !important;
}

#notFound{
  color:white;
  margin-top: 30px;
}

/* &:hover {
    transform: scale3d(1.05, 1.05, 1);
  } */
</style>
