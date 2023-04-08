import { createRouter, createWebHashHistory } from 'vue-router'

// const routes = [
//   {
//     path: '/',
//     redirect: '/home',
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         component: () => import('../views/Home/HomeView.vue'),
//         meta: {
//           title: '首页',
//           level: 1
//         }
//       },
//       {
//         path: '/login',
//         name: 'login',
//         component: () => import('../views/LogAndReg/LoginView.vue'),
//         meta: {
//           title: '登录页',
//           level: 1
//         }
//       },
//       {
//         path: '/reg',
//         name: 'reg',
//         component: () => import('../views/LogAndReg/RegView.vue'),
//         meta: {
//           title: '注册页',
//           level: 1
//         }
//       },
//       // {
//       //   path: '/parttime',
//       //   name: 'parttime',
//       //   redirect: '/parttime/list',
//       //   component: () => import('../views/Parttime/ParttimeView.vue'),
//       //   meta: {
//       //     title: '兼职管理',
//       //     level: 1
//       //   },
//       //   children: [
//       //     {
//       //       path: '/parttime/list',
//       //       name: 'parttimelist',
//       //       component: () => import('../views/Parttime/ParttimeView.vue'),
//       //       // component: {
//       //       //   render (c) {
//       //       //     return c('router-view')
//       //       //   }
//       //       // },
//       //       // redirect: '/parttime/list',
//       //       meta: {
//       //         title: '兼职列表',
//       //         level: 2
//       //       },
//       //       children: [
//       //         {
//       //           path: '/parttime/list/detail',
//       //           name: 'parttimelistdetail',
//       //           component: () => import('../views/Parttime/ParttimeDetail.vue'),
//       //           meta: {
//       //             title: '兼职详情',
//       //             level: 3
//       //           }
//       //         }
//       //       ]
//       //     }
//       //   ]
//       // }
//       {
//         path: '/parttime',
//         name: 'parttime',
//         redirect: '/parttime/list',
//         // component: () => import('../views/Parttime/ParttimeView.vue'),
//         meta: {
//           title: '兼职管理',
//           level: 1
//         }
//       },
//       {
//         path: '/parttime/list',
//         name: 'parttimelist',
//         component: () => import('../views/Parttime/ParttimeView.vue'),
//         meta: {
//           title: '兼职列表',
//           level: 1
//         },
//         children: [
//           {
//             path: '/parttime/detail',
//             name: 'parttimelistdetail',
//             component: () => import('../views/Parttime/ParttimeDetail.vue'),
//             meta: {
//               title: '兼职详情',
//               level: 2
//             }
//           }
//         ]
//       }
//     ]
//   }
// ]
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/HomeView.vue'),
    meta: {
      title: '首页',
      level: 1
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LogAndReg/LoginView.vue'),
    meta: {
      title: '登录页',
      level: 1
    }
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../views/LogAndReg/RegView.vue'),
    meta: {
      title: '注册页',
      level: 1
    }
  },
  {
    path: '/parttime',
    name: 'parttime',
    redirect: '/parttime/list', // 重定向
    meta: {
      title: '兼职管理',
      level: 1
    }
  },
  {
    path: '/parttime/list',
    name: 'parttimelist',
    component: () => import('../views/Parttime/ParttimeView.vue'),
    meta: {
      title: '兼职管理 · 兼职列表',
      level: 2
    },
    children: [
      {
        path: '/parttime/list/detail',
        name: 'parttimelistdetail',
        component: () => import('../views/Parttime/ParttimeDetail.vue'),
        meta: {
          title: '兼职详情',
          level: 3
        }
      },
      {
        path: '/parttime/list/detail2',
        name: 'parttimelistdetail2',
        component: () => import('../views/Parttime/ParttimeDetail2.vue'),
        meta: {
          title: '兼职详情',
          level: 3
        }
      },
      {
        path: '/parttime/publish',
        name: 'parttimepublish',
        component: () => import('../views/Parttime/PublishParttime.vue'),
        meta: {
          title: '发布兼职',
          level: 3
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 设置页面的标题
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router
