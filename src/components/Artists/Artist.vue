<template>
  <!-- <component :is="tagName" class="album-wrapper" :class="[extraClass]"> -->
  <!-- <router-link :to="{ name: 'Album', params: { name: album.artist, album: album.name } }" :class="'album'"> -->
  <!-- <img :src="album.image" class="album-image"> -->
  <!-- <h2 class="album-name">{{ album.title }}</h2> -->
  <!-- </router-link> -->
  <!-- </component> -->
  <!-- <div class="col-sm-3">
    <div class="card">
      <img :src="album.imgURL"
        alt="" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{ album.title }}</h5>
        <p class="card-text"> </p>
        <button class="btn btn-outline-success btn-sm readMore" @click="viewAlbum">Read More</button>
        <p class="btn btn-outline-primary btn-sm"><i class="far fa-edit" @click="editAlbum"></i></p>
        <p class="btn btn-outline-danger btn-sm"><i class="far fa-trash-can"
            @click="deleteAlbum"></i></p>
      </div>
    </div>
  </div> -->

   <div class="profile-card-2">
      <div @click="viewArtist(artist)">
        <img :src="artist.imgURL" class="img img-responsive">
        <div class="profile-name">{{ artist.name }}</div>
      </div>


      <!-- <div class="profile-username">@johndoesurname</div> -->
      <div class="profile-icons">

        <i class="fa fa-edit" @click="editArtist(artist)"></i>
        <i class="fa fa-trash" @click="deleteArtist(artist)"></i>

      </div>
    </div>

</template>

<script>
export default {
  name: 'Single-Artist',
  props: {
    artist: Object
  },
  methods: {
     viewArtist() {
      this.$emit("viewArtist");
    },
    deleteArtist() {
      this.$emit("deleteArtist");
    },
    editArtist() {
      this.$emit("editArtist");
    }
  }
}
</script>

<style>

.fa-edit{
  color:blue
}

.fa-trash{
  color:red
}

</style>