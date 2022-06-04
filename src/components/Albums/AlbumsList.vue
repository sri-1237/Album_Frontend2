<template>

  <form class="d-flex">
    <input class="form-control me-2 searchBar" type="text" v-model="title" placeholder="Search by Album title">
    <button class="btn btn-primary" type="button" @click="searchTitle">Search</button>
  </form>

  <div class="row">
    <div class="col-sm-10">
      <h1>Albums</h1>
    </div>
    <div class="col-sm-2">
      <button type="button" class="btn btn-success" @click="addAlbum()"><i class="fa fa-plus" aria-hidden="true"></i>
        Add Album</button>
    </div>

  </div>

  <div class="row row-cols-1 row-cols-md-5 g-4">
    <h4 id="notFound" v-if="!albums.length">No Albums Found!!</h4>
    <div class="col" v-for="(album, index) in albums" :key="index">
      <div class="card h-100">
        <!-- <router-link :to="{ name: 'viewAlbum', params: { id: album.id, album: album.title } }"> -->
        <img :src="album.imgURL" class="card-img-top h-100" alt="...">
        <!-- </router-link> -->
        <div class="card-body album-details" @click="viewAlbum(album)">
          <h5 class="card-title text-light">{{ album.title }}</h5>
          <p class=" text-white-50">{{ album.artist }}</p>
          <p class="text-white-50">1992{{ album.year }}</p>  
          </div> 

        <div class="ctrl-icons card-footer ">
          <i class="addToFav fa-regular fa-star"></i>
          <i class="editIcon fa-solid fa-pen-to-square"></i>
          <i class="deleteIcon fa-solid fa-trash-can ml-3"></i>  
        </div>
      </div>
    </div>
  </div>



  <!-- <div class="card card__big margin-top-xxl">

    <h4 id="notFound" v-if="!albums.length">No Albums Found!</h4>

    <ul class="album-list flex-list">
      <li class="album-wrapper" :class="{ active: index == currentIndex }" v-for="(album, index) in albums" :key="index"
        @click="setActiveTutorial(album, index)">
        
        <router-link :to="{ name: 'viewAlbum', params: { id: album.id, album: album.title } }" :class="'album'">

          <img :src="album.imgURL" class="img-thumbnail album-image" id="img" alt="Album Image">
           <a :href="album.data">{{ album.title }}</a> -->
  <!-- <p id="albumTitle">{{ album.title }}</p>
        </router-link> -->

  <!-- </li>
    </ul>
  </div> -->
</template>

<script>
import AlbumDataService from "../../services/AlbumDataService";
import { Buffer } from 'buffer';

export default {
  name: "albums-list",
  data() {
    return {
      albums: [],
      // currentTutorial: null,
      currentImage: undefined,
      currentIndex: -1,
      title: "",

    };
  },

  methods: {
    retrieveAlbums() {
      AlbumDataService.getAll()
        .then(response => {
          // this.albums = response.data;

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

        })
        .catch(e => {
          console.log("err..", e);
          this.message = e.response.data.message;
        });
    },
    addAlbum() {
      this.$router.push({ name: 'addAlbum' });
    },
    viewAlbum(album) {
      this.$router.push({ name: 'viewAlbum', params: { id: album.id, album: album.title } });
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

#img {
  height: 190px;
}

.album-wrapper {
  margin: 12px;
  display: inline-block;
}

.album-details {
  cursor: pointer;
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
  text-decoration: none;
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

#albumTitle {
  color: white;
}

.card {
  background-color: #212529 !important;
}

.searchBar {
  width: 60% !important;
}

#notFound {
  color: white;
  margin-top: 30px;
}

.ctrl-icons
{
  /* margin-left: 50%; */
  float: right;
}

.addToFav{
  color:#e1aa45
}

.editIcon{
  color:#7eb3dd;
  margin-left: 10px;
}

.deleteIcon{
  margin-left: 10px;
  color:#bf3535
}

/* &:hover {
    transform: scale3d(1.05, 1.05, 1);
  } */
</style>
