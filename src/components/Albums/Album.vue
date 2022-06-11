<template>
 <!-- <component :is="tagName" class="album-wrapper" :class="[extraClass]"> -->
    <!-- <router-link :to="{ name: 'Album', params: { name: album.artist, album: album.name } }" :class="'album'"> -->
      <!-- <img :src="album.image" class="album-image"> -->
      <h2 class="album-name">{{ album.title }}</h2>
    <!-- </router-link> -->
  <!-- </component> -->
</template>

<script>
export default {
    name: 'Single-Album',
    props: {
        album:Object
    }
}
</script>