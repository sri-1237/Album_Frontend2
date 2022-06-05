<template>

  <div class="row">
    <div class="col-sm-10">
      <h1>Albums</h1>
    </div>
    <div class="col-sm-2">
      <button type="button" class="btn btn-success" @click="addAlbum()"><i class="fa fa-plus" aria-hidden="true"></i>
        Add Album</button>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-md-6 g-4">

<h4 id="notFound" v-if="!albums.length">No Albums Found!!</h4>
    <div class="col" v-for="(album, index) in albums" :key="index">
      <div class="card h-100">
        <div class="card-header h-100">{{ album.title }}

          <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">Dropdown</a>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">Action</a>
            <a href="#" class="dropdown-item">Another action</a>

          </div>
        </div>


        <div class="card-body">
          <img :src="album.imgURL"  class="card-img-top cardImg rounded-circle" alt="...">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
        </div>

      </div>
    </div>

  </div>


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
  height:150px;
}

/* &:hover {
    transform: scale3d(1.05, 1.05, 1);
  } */
</style>
