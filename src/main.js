import { createApp } from 'vue';
import App from './App.vue';

import store from './store';
store.subscribe((mutation, state) => {
  localStorage.setItem('todo-app-state', JSON.stringify(state)); // Saves data in localStorach after each mutation
})

import router from './router';
import style from '@/assets/main.scss';

createApp(App)
  .use(store)
  .use(router)
  .use(style)
  .mount('#app');
