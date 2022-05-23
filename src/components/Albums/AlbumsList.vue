<template>

<div class="card card__big margin-top-xxl">
    
<ul class="album-list flex-list">
    <li  class="album-wrapper" :class="{ active: index == currentIndex }"
          v-for="(album, index) in albums"
          :key="index"
          @click="setActiveTutorial(album, index)"
        >
        <router-link :to="{ name: 'Album', params: { album: album.title } }" :class="'album'">
        <img src="../../assets/beatles.png" class="img-thumbnail album-image" alt="Cinque Terre" width="250" height="150"> 
          <p>{{ album.title }}</p>
          </router-link> 
      
    </li>
    </ul>
  </div>
</template>

<script>
import AlbumDataService from "../../services/AlbumDataService";

export default {
  name: "albums-list",
  data() {
    return {
        albums: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
     
    };
  }, 
  
  methods: {
      retrieveAlbums() {
      AlbumDataService.getAll()
        .then(response => {
          this.albums = response.data;
          console.log(this.albums)          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },  
  mounted() {
    this.retrieveAlbums();
  }
};
</script>

<style>

/* @album-width: 180px;
@image-size: 156px;
@border-radius: 4px; */

.album-wrapper {
  margin: 12px;
  display: inline-block;
}

.album {
  width: 180px;
  padding: 5px;
  margin: 10px 0 5px 0;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
}
  .album-image {
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

  .album-name {
    display: block;
    width: 156px;
    font-size: 16px;
    max-height: 40px;
    overflow: hidden;
    margin: 0 auto;
  }

  /* &:hover {
    transform: scale3d(1.05, 1.05, 1);
  } */

</style>
