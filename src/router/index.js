import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: HomeView
  },
  {
    path: '/page/:id',
    name: 'pageView',
    component: () => import(/* webpackChunkName: "edit" */ '../views/PageView.vue'),
  },
  {
    path: '/page/:pageId/note/:noteId',
    name: 'editNoteView',
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditNoteView.vue'),
  },
  {
    // If user will try to go to the route that not exist
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
