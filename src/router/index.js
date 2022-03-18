import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue'
import Image from '../views/Image.vue';
import EditImage from '../views/EditImage.vue'
import Profile from '../views/Profile.vue';
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth: true},
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {requiresAuth: true},
  },
  {
    path: '/image/:id',
    name: 'Image',
    component: Image,
    meta: {requiresAuth: true},
    props: true,
  },
  {
    path: '/image/:id',
    name: 'EditImage',
    component: EditImage,
    meta: {requiresAuth: true},
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  
  //{
 //   path: '/about',
 //   name: 'about',
    // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
