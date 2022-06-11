<template>
<!-- <div class="container"> -->
    

                    <div class="col-md-6">

                       <div class="p-3 card">

                        <div class="d-flex justify-content-between align-items-center p-3 music">

                            <div class="d-flex flex-row align-items-center">

                                <i class="fa fa-music color"></i>
                                <small class="ml-2" id="trackTitle"> {{ track.title }} </small>
                                
                            </div>
                            <i class="fa-solid fa-play" v-if="!isPlaying" @click="play(track)"></i>
                            <i class="fa-solid fa-pause" v-else @click="pause"></i>

                              <a href="#" data-bs-toggle="dropdown"> <i class="fa-solid fa-angle-down"></i></a>
          <div class="dropdown-menu">
             <i class="editIcon dropdown-item fa-solid fa-pen-to-square"  @click="goEditTrack(track)">  Edit</i>
             <i class="deleteIcon dropdown-item fa-solid fa-trash-can ml-3"  @click="goDeleteTrack(track)">  Delete</i>         

          </div>
                        </div>                  
                                    
                       </div>  
                        
                    </div>
              <!-- </div> -->
</template>

<script>

import TracksDataService from "../../services/TracksDataService";

export default {
  props: {
    track: Object
  },
  data() {
    return {
        index: 0,
      isPlaying: false,
       player: new Audio()
      
    };
  },
  methods: {
      play (song) {
        //   console.log("song...",song);
    //   if (typeof song.src != "undefined") {
    //     this.current = song;
        this.player.src = song.description;
        
    //   }
      this.player.play();
      this.isPlaying = true;
    },
    pause () {
      this.player.pause();
      this.isPlaying = false;
    },

     goEditTrack(track) {
       console.log("id.....",track.id);
        this.$emit("editTracks",track);
       
      // this.$router.push({ name: 'editAlbum', params: { id: album.id } });
    },

     goDeleteTrack(track) {
      TracksDataService.deleteTrack(track.albumId,track.id)
        .then(() => {
            this.$emit("getTracks");
          // this.$router.push({ name: 'Home' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },

    // deleteLesson() {
    //   this.$emit("deleteLesson");
    // },
    // updateLesson() {
    //   this.$emit("updateLesson");
    // }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body{

    background-color: #f3f3f3;
    font-family: "Poppins", sans-serif
}

.container{

    height: 100vh;
}

.card{
    background-color: #212529;
    border:none;
}

#trackTitle{
    color: white;
    padding-left: 10px;
}


.cant{

    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

}

.music{

    margin-bottom: 10px;
}


.music:hover{

    background-color: #f7f7f7;
    border-radius: 3px;
    cursor: pointer;
}


.color{

    color: #ff7e3d;
}

.playlist{
        height: 51px;
}


.btn-danger {
    color: #fff;
    background-color: #ff7e3d;
    border-color: #ff7e3d;
}


.btn-danger:hover , 
.btn-danger:active  {
    color: #fff;
    background-color: #ff7e3d;
    border-color: #ff7e3d;
}



.btn-danger:focus{
    box-shadow: none;
}
</style>