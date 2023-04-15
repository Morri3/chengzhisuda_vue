import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index' // 导入store
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
      level: 1,
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LogAndReg/LoginView.vue'),
    meta: {
      title: '登录页',
      level: 1,
      requireAuth: false
    }
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../views/LogAndReg/RegView.vue'),
    meta: {
      title: '注册页',
      level: 1,
      requireAuth: false
    }
  },
  {
    path: '/parttime',
    name: 'parttime',
    redirect: '/parttime/list', // 重定向
    meta: {
      title: '兼职管理',
      level: 1,
      requireAuth: true
    }
  },
  {
    path: '/parttime/list',
    name: 'parttimelist',
    component: () => import('../views/Parttime/ParttimeView.vue'),
    meta: {
      title: '兼职管理 · 兼职列表',
      level: 2,
      requireAuth: true
    },
    children: [
      {
        path: '/parttime/list/detail',
        name: 'parttimelistdetail',
        component: () => import('../views/Parttime/ParttimeDetail.vue'),
        meta: {
          title: '兼职详情',
          level: 3,
          requireAuth: true
        }
      },
      {
        path: '/parttime/list/detail2',
        name: 'parttimelistdetail2',
        component: () => import('../views/Parttime/ParttimeDetail2.vue'),
        meta: {
          title: '兼职详情',
          level: 3,
          requireAuth: true
        }
      },
      // {
      //   path: '/parttime/list/edit',
      //   name: 'parttimelistedit',
      //   component: () => import('../views/Parttime/ParttimeEdit.vue'),
      //   meta: {
      //     title: '兼职编辑',
      //     level: 3
      //   }
      // },
      {
        path: '/parttime/publish',
        name: 'parttimepublish',
        component: () => import('../views/Parttime/PublishParttime.vue'),
        meta: {
          title: '发布兼职',
          level: 3,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/parttime/signup',
    name: 'signup',
    component: () => import('../views/Parttime/SignupInfo.vue'),
    meta: {
      title: '兼职管理 · 报名信息',
      level: 2,
      requireAuth: true
    }
    // ,
    // children: [
    //   {
    //     path: '/parttime/signup/resumes',
    //     name: 'signupresumes',
    //     component: () => import('../views/Parttime/ResumesInfo.vue'),
    //     meta: {
    //       title: '简历详情',
    //       level: 3
    //     }
    //   }
    // ]
  },
  {
    path: '/markcomment',
    name: 'markcomment',
    redirect: '/markcomment/mark', // 重定向
    meta: {
      title: '兼职点评',
      level: 1,
      requireAuth: true
    }
  },
  {
    path: '/markcomment/mark',
    name: 'mark',
    component: () => import('../views/MarkAndComment/MarkView.vue'),
    meta: {
      title: '兼职点评 · 评分信息',
      level: 2,
      requireAuth: true
    }
  },
  {
    path: '/markcomment/comment',
    name: 'comment',
    component: () => import('../views/MarkAndComment/CommentView.vue'),
    meta: {
      title: '兼职点评 · 评论信息',
      level: 2,
      requireAuth: true
    }
  },
  {
    path: '/userhome',
    name: 'userhome',
    redirect: '/userhome/index', // 重定向
    meta: {
      title: '个人中心',
      level: 2,
      requireAuth: true
    }
  },
  {
    path: '/userhome/index',
    name: 'userhomeindex',
    component: () => import('../views/Userhome/UserInfoManage.vue'),
    meta: {
      title: '个人中心 · 个人信息管理',
      level: 2,
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 设置页面的标题
router.beforeEach((to, from, next) => {
  const canJump = to.meta && to.meta.requireAuth
  if (canJump && canJump === true) {
    console.log(1)
    // 需要登录才能访问该页面
    if (store.state.user.isLogin === true && store.state.user.token !== null) {
      console.log(2)
      // 登录了
      const title = to.meta && to.meta.title
      if (title) {
        document.title = title
      }
      next()
    } else {
      console.log(3)
      // 没登陆或没token
      next({
        path: '/login'
      })
    }
  } else {
    console.log(4)
    next()
  }
})

export default router
