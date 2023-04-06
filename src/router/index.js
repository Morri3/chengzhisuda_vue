import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/LogAndReg/LoginView.vue'),
        meta: {
          title: '登录页',
          level: 1
        }
      }
      // {
      //   path: '/reg',
      //   name: 'reg',
      //   component: () => import('../views/AboutView.vue'),
      //   meta: {
      //     title: '注册页',
      //     level: 1
      //   }
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('../views/UserView.vue'),
      //   meta: {
      //     title: '用户',
      //     level: 1
      //   },
      //   children: [
      //     {
      //       path: '/user/signup',
      //       name: 'signup',
      //       component: () => import('../views/SignupView.vue'),
      //       meta: {
      //         title: '报名',
      //         level: 2
      //       }
      //     }
      //   ]
      // }
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
