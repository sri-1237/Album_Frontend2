import { createWebHistory, createRouter } from "vue-router";
import homePage from './components/Albums/AlbumsList.vue';
import AlbumDetail from './components/Albums/ViewAlbum.vue';
import AddAlbum from './components/Albums/AddAlbum.vue';
import ViewAlbum from './components/Albums/ViewAlbum.vue';
import EditAlbum from './components/Albums/EditAlbum.vue';


const routes = [
    { path: '/', component: homePage, name: 'Home', meta: { transitionName: 'slide' } },
    { path: '/:album', component: AlbumDetail, name: 'Album', meta: { transitionName: 'slide' } },
    { path: '/addAlbum', component: AddAlbum, name: 'addAlbum', meta: { transitionName: 'slide' } },
    {
        path: "/:id/:album",
        component: ViewAlbum,
        name: "viewAlbum",
        props: true
      },
      {
        path: "/edit/:id",
        name: "editAlbum",
        component: EditAlbum,
        props: true
      },
    // { path: '/playlist', component: Playlist, name: 'Playlist', meta: { transitionName: 'zoom' }, beforeEnter: beforeCheckPlaylist },
    // { path: '/artist/:name', component: ArtistDetail, name: 'Artist', meta: { transitionName: 'slide' } },
    // { path: '/artist/:name/:album', component: AlbumDetail, name: 'Album', meta: { transitionName: 'slide' } }
  ];

  const router = createRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/Album_Frontend2/',
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
export default router;