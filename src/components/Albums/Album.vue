<template>
  <!-- <component :is="tagName" class="album-wrapper" :class="[extraClass]"> -->
  <!-- <router-link :to="{ name: 'Album', params: { name: album.artist, album: album.name } }" :class="'album'"> -->
  <!-- <img :src="album.image" class="album-image"> -->
  <!-- <h2 class="album-name">{{ album.title }}</h2> -->
  <!-- </router-link> -->
  <!-- </component> -->
  <div class="col-sm-3">
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
  </div>

</template>

<script>
export default {
  name: 'Single-Album',
  props: {
    album: Object
  },
  methods: {
     viewAlbum() {
      this.$emit("viewAlbum");
    },
    deleteAlbum() {
      this.$emit("deleteAlbum");
    },
    editAlbum() {
      this.$emit("editAlbum");
    }
  }
}
</script>

<style>
.readMore{
  margin-right: 40px;
}
</style>