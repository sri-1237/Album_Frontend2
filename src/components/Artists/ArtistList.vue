<template>

  <div class="container">
    <div class="row">

      <h2 class="text-center contentHeader">
        <button type="button" class="btn btn-success addBtn" @click="addArtist()"><i class="fa fa-plus"
            aria-hidden="true"></i>
          Add Artist</button> <strong style="
    margin-left: -180px;">Artists</strong>
      </h2>
      <hr>
    </div>

    <div class="profile-card-2" v-for="(artist, index) in artists" :key="index">
      <div @click="viewArtistInfo(artist)">
        <img :src="artist.imgURL" class="img img-responsive">
        <div class="profile-name">{{ artist.name }}</div>
      </div>


      <!-- <div class="profile-username">@johndoesurname</div> -->
      <div class="profile-icons">

        <a href="#"><i class="fa fa-edit" @click.self="editArtist(artist)"></i></a>
        <a href="#"><i class="fa fa-trash" @click="deleteArtist(artist)"></i></a>

      </div>
    </div>
  </div>
  <!-- </div>
		
	</div> -->
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
            if (resData.data != null) {
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
    viewArtistInfo(artist) {
      this.$router.push({ name: 'viewArtist', params: { id: artist.id, artist: artist.name } });
    },
    editArtist(artist) {
      console.log("id.....", artist.id);

      this.$router.push({ name: 'editArtist', params: { id: artist.id } });
    },

    deleteArtist(artist) {
      //  e.stopPropagation();
      ArtistDataService.delete(artist.id)
        .then(() => {
          this.retrieveArtists();
          // this.$router.push({ name: 'Home' });
        })
        .catch(e => {
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
            if (resData.data != null) {
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

#img {
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

#notFound {
  color: white;
  margin-top: 30px;
}

/* &:hover {
    transform: scale3d(1.05, 1.05, 1);
  } */




/* @charset "utf-8"; */
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900|Open Sans:400,600,800');

h1,
h2,
h3,
h4,
h5,
h6,
div,
input,
p,
a {
  font-family: "Open Sans";
  margin: 0px;
}

a,
a:hover,
a:focus {
  color: inherit;
}

/* body {
    background-color: #F1F2F3;
} */

/* .container-fluid,
.container {
    max-width: 1200px;
} */

/* .card-container {
    padding: 100px 0px;
    -webkit-perspective: 1000;
    perspective: 1000;
} */



.profile-card-2 {
  display: inline-flex;
  width: 180px;
  height: 250px;
  max-width: 300px;
  background-color: #FFF;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
  background-position: center;
  overflow: hidden;
  position: relative;
  margin: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
}

.profile-card-2 img {
  width: 180px;
  height: 250px;
  transition: all linear 0.25s;
}

.profile-card-2 .profile-name {
  position: absolute;
  left: 20px;
  bottom: 30px;
  font-size: 25px;
  color: #FFF;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  transition: all linear 0.25s;
}

.profile-card-2 .profile-icons {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #FFF;
  transition: all linear 0.25s;
}

.profile-card-2 .profile-username {
  position: absolute;
  bottom: 50px;
  left: 30px;
  color: #FFF;
  font-size: 13px;
  transition: all linear 0.25s;
}

.profile-card-2 .profile-icons .fa {
  margin: 5px;
}

.profile-card-2:hover img {
  filter: grayscale(100%);
}

.profile-card-2:hover .profile-name {
  bottom: 80px;
}

.profile-card-2:hover .profile-username {
  bottom: 60px;
}

.profile-card-2:hover .profile-icons {
  right: 40px;
}

.addBtn {
  float: left;
}

.contentHeader {
  margin-top: 4% !important;
}
</style>
