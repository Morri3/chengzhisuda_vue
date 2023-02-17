import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
          title: '关于'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/UserView.vue'),
        meta: {
          title: '用户'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router
