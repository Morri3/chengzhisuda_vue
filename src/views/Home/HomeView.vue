<template>
  <div class="box">
    <!--左边的logo-->
    <div class="left-box">
      <img class="logo" :src="'/img/home/logo.png'" alt="" />
    </div>

    <!--右边的6个卡片-->
    <div class="right-box">
      <div class="item-box" v-for="(item, index) in picBox" :index="index" :key="item">
        <img class="pic" :src="item.src" alt="" @click="jumpTo(item)" />
      </div>
    </div>

    <!--底部的实时时间-->
    <CurTime :color="curTime.color" class="time"></CurTime>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import CurTime from '@/components/CurTime.vue'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    CurTime
  },
  props: {},
  emits: [],
  setup () {
    const store = useStore()
    const router = useRouter() // 使用路由
    // const route = useRoute() // 使用路由

    const state = reactive({
      user: {},
      picBox: [
        { src: '/img/home/卡片-兼职管理.png', name: '兼职管理', url: '/parttime' },
        { src: '/img/home/卡片-兼职点评.png', name: '兼职点评', url: '/markcomment' },
        { src: '/img/home/卡片-报名信息管理.png', name: '报名信息管理', url: '/parttime/signup' },
        { src: '/img/home/卡片-用户行为分析.png', name: '用户行为分析', url: '/analyze' },
        { src: '/img/home/卡片-个人中心.png', name: '个人中心', url: '/userhome' },
        { src: '/img/home/卡片-更多功能.png', name: '更多功能', url: '/home' }
      ],
      // 时间的样式
      curTime: {
        color: 'white'
      }
    })

    onMounted(() => {
      state.user = store.state.user
    })

    onBeforeMount(() => {
      state.user = store.state.user
    })

    const jumpTo = (item) => {
      // 对分析模块进行访问限制
      if (item.url === '/analyze') {
        // 管理员可以访问
        if (state.user.isAdmin === 1) {
          router.push({
            path: item.url
          })
        } else {
          // 不是管理员不能进入用户行为分析页
          ElNotification({
            title: '注意啦',
            message: '该模块仅管理员可访问',
            type: 'warning',
            position: 'top-right', // 右上
            offset: 60
          })
        }
      } else {
        // 其他页面不限制
        router.push({
          path: item.url
        })
      }
    }

    return {
      ...toRefs(state),
      jumpTo
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url('/public/img/logandreg/背景（橙紫）.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .left-box{
    width: 50%;
    height: calc( 100% - 54px - 40px );
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .logo{
      width: 360px;
      height: 600px;
    }
  }
  .right-box{
    width: 50%;
    height: calc( 100% - 54px - 40px );
    // 超出自动换行
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;

    .item-box{
      width: auto;
      height: auto;
      cursor: pointer; // 小手的样式

      .pic{
        width: 280px;
        height: 200px;
      }
    }
  }
  .time{
    width: auto;
    height: auto;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    background:none;
  }
}
</style>
