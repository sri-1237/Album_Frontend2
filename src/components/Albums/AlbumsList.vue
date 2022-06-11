<template>

<div class="container">

   <div class="row">

      <h2 class="text-center contentHeader">
        <button type="button" class="btn btn-success addBtn" @click="addAlbum()"><i class="fa fa-plus"
            aria-hidden="true"></i>
          Add Album</button> <strong style="
    margin-left: -180px;">Albums</strong>
      </h2>
      <hr>
    </div>

    


  <div class="row row-cols-1 row-cols-md-5 g-4">

<h4 id="notFound" v-if="!albums.length">No Albums Found!!</h4>
    <!-- <div class="col" v-for="(album, index) in albums" :key="index">
      <div class="card h-100">
        <div class="card-header h-100">
         
          <h5 class="albumTitle">{{ album.title }}</h5>         

          <a href="#" data-bs-toggle="dropdown"> <i class="fa-solid fa-angle-down"></i></a>
          <div class="dropdown-menu">
             <i class="editIcon dropdown-item fa-solid fa-pen-to-square"  @click="goEditAlbum(album)">  Edit</i>
             <i class="deleteIcon dropdown-item fa-solid fa-trash-can ml-3"  @click="goDeleteAlbum(album)">  Delete</i>         

          </div>
        </div>


        <div class="card-body" @click="viewAlbum(album)">
          <img :src="album.imgURL"  class="card-img-top cardImg rounded-circle" alt="...">
          <h6 class="card-title">{{ album.artist }}</h6>
          <p class="card-text">{{album.releasedYear}}</p>
        </div>

      </div>
    </div> -->

    <!-- <div class="row row-cols-2 row-cols-lg-6"> -->
     <!-- <h1>Albums Results</h1> -->
    
      <Album v-for="album in albums" :key="album.id" :album="album"  @viewAlbum="viewAlbum(album)" @deleteAlbum="goDeleteAlbum(album)"
        @editAlbum="goEditAlbum(album)" />
      
    </div>
    </div>
<!-- 
  </div> -->


</template>

<script>
import AlbumDataService from "../../services/AlbumDataService";
import Album from './Album.vue';
import { Buffer } from 'buffer';

export default {
  name: "albums-list",
  components: { Album},
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
     goEditAlbum(album) {
      //  console.log("id.....",album.id);
      this.$router.push({ name: 'editAlbum', params: { id: album.id } });
    },

     goDeleteAlbum(album) {
      AlbumDataService.delete(album.id)
        .then(() => {
           this.retrieveAlbums();
          // this.$router.push({ name: 'Home' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    searchTitle() {
      AlbumDataService.findByTitle(this.title)
        .then(response => {
          this.albums = response.data;
          // console.log("results.", this.albums);
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

.cardImg{
  width:100%;
  height:170px;
}

.card-header{
  display: inline-flex;
}

.albumTitle{
  color: #ffffffe0;
  width:90%;
  margin-right: 2px;
}

.card-body, .editIcon, .deleteIcon{
  cursor: pointer;
}

.card-title{
  color:#ffffffe0
}

.card-text{
  color:#ffffffe0
}

/* &:hover {
    transform: scale3d(1.05, 1.05, 1);
  } */
</style>
