import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginUser from '../auth/LoginUser.vue'
import SignupUser from '../auth/SignupUser.vue'
import CategoryManage from '../components/CategoryManage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginUser
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupUser
  },
  {
    path: '/manage_category',
    name: 'Manage Category',
    component: CategoryManage,
    meta: { isAdmin:true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) =>{
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.isAdmin && user.role !=='admin'){
    next({path:'/login',query:{unauthorized:true}});
  } else {
    next();
  }
})


export default router
