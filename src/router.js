import { createWebHistory, createRouter } from "vue-router";
import homePage from './components/Albums/AlbumsList.vue';
import AlbumDetail from './components/Albums/ViewAlbum.vue';
import AddAlbum from './components/Albums/AddAlbum.vue';
import ViewAlbum from './components/Albums/ViewAlbum.vue';


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
    // { path: '/playlist', component: Playlist, name: 'Playlist', meta: { transitionName: 'zoom' }, beforeEnter: beforeCheckPlaylist },
    // { path: '/artist/:name', component: ArtistDetail, name: 'Artist', meta: { transitionName: 'slide' } },
    // { path: '/artist/:name/:album', component: AlbumDetail, name: 'Album', meta: { transitionName: 'slide' } }
  ];

  const router = createRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
export default router;