<template>

  <h4>{{ message }}</h4>

  <div class="row">
    <div class="col-4">
      <img :src="artist.imgURL" class="img-thumbnail" id="artistImg" alt="Artist Image" />
    </div>
    <div class="col">
      <br />
       <h2 > {{ artist.name }}</h2>
      <br /><br />
      <h4> BIOGRAPHY</h4>
      <p> {{ artist.description }}</p>
    </div>

  </div>


<div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" @click="goEditArtist()">Edit</button>
  <button type="button" @click="goDeleteArtist(artist)" class="btn btn-danger">Delete</button>
  <!-- <button type="button" @click="goAddLesson(id)" class="btn btn-success">Add Tracks</button> -->
</div>
  

 <h4 class="albumListHeader"> POPULAR ALBUMS</h4>
 <hr>

   <div class="row row-cols-2 row-cols-lg-6">
     <!-- <h1>Albums Results</h1> -->
    
      <Album v-for="album in albums" :key="album.id" :album="album"  BtnOptions="noShow" @viewAlbum="viewAlbum(album)" />
      
    </div>
    <!-- <div class="col-md-6">



                       <div class="p-3 card">

                        <div class="d-flex justify-content-between align-items-center p-3 music">

                            <div class="d-flex flex-row align-items-center">

                               
                                <small class="ml-2" id="albumTitle"> Title </small>
                               
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <small class="ml-3" id="albumDescription"> Description </small>  
                            </div>
                             <div class="d-flex flex-row align-items-center">
                                <small class="ml-4" id="albumReleasedYear"> Released Year </small>  
                            </div>
                            <i class="fa fa-check color"></i>
                        </div>                  
                                    
                       </div>  
                        
                    </div> -->
  <!-- <AlbumsDisplay v-for="album in albums" :key="album.id" :album="album" /> -->


  <!-- <LessonDisplay
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        @deleteLesson="goDeleteLesson(lesson)"
        @updateLesson="goEditLesson(lesson)"
    /> -->


</template>

<script>
import ArtistDataService from "../../services/ArtistDataService";

// import AlbumsDisplay from '../Albums/AlbumsDisplay.vue';
import Album from '../Albums/Album.vue';
import { Buffer } from 'buffer';

export default {
  name: "view-artist",
  props: ['id'],
  components: {
     Album
  },
  data() {
    return {
      artist: {},
      albums: [],
      message: ""
    };
  },
  methods: {
    retrieveAlbums() {
      ArtistDataService.get(this.id)
        .then(response => {
          // this.album = response.data;
          var arr = new Array(response.data);

          let resData = arr[0];
          if (resData.data != null) {
            var blobObj = resData.data;
            var bufferBase64 = new Buffer(blobObj.data, 'binary').toString('base64');
            var imgBase64 = "data:image/jpeg;base64," + bufferBase64;
            arr[0]["imgURL"] = imgBase64;
          }

          this.artist = arr[0];

          ArtistDataService.getAlbumsFromArtist(this.id)
            .then(response => {
              this.albums = response.data
              console.log("Albums...", this.albums);
            })
            .catch(e => {
              this.message = e.response.data.message;
            });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     goEditArtist() {
       console.log("id.....",this.id);
      this.$router.push({ name: 'editArtist', params: { id: this.id } });
    },
    viewAlbum(album){
 this.$router.push({ name: 'viewAlbum', params: { id: album.id, album: album.title } });
    },
   
    goDeleteArtist(artist) {
      ArtistDataService.delete(artist.id)
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'Home' });
    }
  },
  mounted() {
    this.retrieveAlbums();
  }
}
</script>

<style>
#albumImg {
  width: 600px;
  height: 400px;
}

.albumListHeader{
  text-align: center;
}
</style>