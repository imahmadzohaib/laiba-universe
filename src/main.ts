import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './routes'
import './style.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach(() => {
  // Scroll to top on route change (CSS smooth-scrolling handled globally).
  window.scrollTo(0, 0)
})

createApp(App).use(router).mount('#app')
