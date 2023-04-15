<template>
  <div class="box">
    <div class="menu-bg">
      <!--item1-->
      <div class="menu-item" @click="changeRoute('/home')" :class="sub0 === true ? 'bg-1' : ''">
        <img class="icon" :src="'/img/menu/icon_home.png'" alt=""/>
        <div class="name">首页</div>
      </div>

      <div class="divider"></div>

      <!--item2-->
      <div class="menu-item">
        <img class="icon" :src="'/img/menu/icon_parttime.png'" alt=""/>
        <div class="name">兼职管理</div>
        <img class="down" id="icon1" :src="'/img/menu/icon_down.png'" alt="" @click="openItem('兼职管理')"/>
      </div>
      <div class="divider" v-show="sub.sub1"></div>
      <div class="menu-subitem-first" @click="changeRoute('/parttime/list')" v-show="sub.sub1"
        :class="item.item1 === true ? 'bg-2' : ''">
        <div class="name">兼职列表</div>
      </div>
      <div class="menu-subitem" @click="changeRoute('/parttime/signup')" v-show="sub.sub1"
        :class="item.item2 === true ? 'bg-2' : ''">
        <div class="name">报名信息</div>
      </div>

      <div class="divider"></div>

      <!--item3-->
      <div class="menu-item">
        <img class="icon" :src="'/img/menu/icon_callback.png'" alt=""/>
        <div class="name">兼职点评</div>
        <img class="down" id="icon2" :src="'/img/menu/icon_down.png'" alt="" @click="openItem('兼职点评')"/>
      </div>
      <div class="divider" v-show="sub.sub2"></div>
      <div class="menu-subitem-first" @click="changeRoute('/markcomment/mark')" v-show="sub.sub2"
        :class="item.item3 === true ? 'bg-2' : ''">
        <div class="name">评分信息</div>
      </div>
      <div class="menu-subitem" @click="changeRoute('/markcomment/comment')" v-show="sub.sub2"
        :class="item.item4 === true ? 'bg-2' : ''">
        <div class="name">评论信息</div>
      </div>

      <div class="divider"></div>

      <!--item4-->
      <div class="menu-item">
        <img class="icon" :src="'/img/menu/icon_userhome.png'" alt=""/>
        <div class="name">个人中心</div>
        <img class="down" id="icon3" :src="'/img/menu/icon_down.png'" alt="" @click="openItem('个人中心')"/>
      </div>
      <div class="divider" v-show="sub.sub3"></div>
      <div class="menu-subitem-first" @click="changeRoute('/userhome')" v-show="sub.sub3"
        :class="item.item5 === true ? 'bg-2' : ''">
        <div class="name">个人信息管理</div>
      </div>

      <div class="divider" v-show="!sub.sub3"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'MainMenu',
  components: {
  },
  props: {},
  emits: [],
  setup () {
    const store = useStore() // 使用缓存
    const router = useRouter() // 使用路由

    const state = reactive({
      sub0: false, // 首页这个一级菜单的开关
      sub: { // 控制二级菜单的开关
        sub1: false,
        sub2: false,
        sub3: false
      },
      item: { // 对应各个二级菜单，item1为第一个二级菜单，以此类推
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false
      }
    })

    onMounted(() => {
      // console.log('getMenu',store.state.menu)
    })

    const openItem = (item) => {
      switch (item) {
        case '兼职管理': {
          state.sub.sub1 = !state.sub.sub1
          break
        }
        case '兼职点评': {
          state.sub.sub2 = !state.sub.sub2
          break
        }
        case '个人中心': {
          state.sub.sub3 = !state.sub.sub3
          break
        }
      }
      store.commit('setSub', state.sub)
      console.log('getSub', store.state.sub)
    }

    const changeRoute = (item) => {
      console.log(item)
      // 对首页的特殊处理
      if (item === '/home') {
        state.sub0 = !state.sub0
      }
      if (item === '/parttime/list') {
        state.item.item1 = !state.item.item1
      }
      if (item === '/parttime/signup') {
        state.item.item2 = !state.item.item2
      }
      if (item === '/comment/mark') {
        state.item.item3 = !state.item.item3
      }
      if (item === '/comment/comment') {
        state.item.item4 = !state.item.item4
      }
      if (item === '/userhome') {
        state.item.item5 = !state.item.item5
      }

      // 当前点击的item是哪个 存到store中
      store.commit('setItem', state.item)
      console.log('getItem', store.state.item)
      store.commit('setSub0', state.sub0)
      console.log('getSub0', store.state.sub0)

      // 跳转
      router.push({
        path: item
      })
    }

    // 监听菜单的打开、关闭
    watch(
      () => [state.sub.sub1, state.sub.sub2, state.sub.sub3],
      (newValue, oldValue) => {
        var cur = [0, 0, 0]
        for (let i = 0; i < 3; i++) {
          var icon = document.getElementById(`icon${i + 1}`) // 对应的图标,使用了模板字符串
          if (newValue[i] === true) {
            cur[i] = (cur[i] - 180) % 360
          }
          icon.style.transform = 'rotate(' + cur[i] + 'deg)' // 旋转
          icon.style.transition = 'all .5s' // 过渡动画
        }
        console.log('newValue', newValue, 'oldvalue', oldValue)
      }
    )

    // // 监听选中的菜单项
    // watch(
    //   () => store.state.menu,
    //   (newValue, oldValue) => {
    //     // var cur = [0, 0, 0]
    //     // for (let i = 0; i < 3; i++) {
    //     //   var icon = document.getElementById(`icon${i + 1}`) // 对应的图标,使用了模板字符串
    //     //   if (newValue[i] === true) {
    //     //     cur[i] = (cur[i] - 180) % 360
    //     //   }
    //     //   icon.style.transform = 'rotate(' + cur[i] + 'deg)' // 旋转
    //     //   icon.style.transition = 'all .5s' // 过渡动画
    //     // }
    //     console.log('菜单项新值', newValue, '菜单项旧值', oldValue)
    //   }
    // )

    return {
      ...toRefs(state),
      openItem,
      changeRoute
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .menu-bg{
    width: 75%;
    height: 100%;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 3px 3px 6px #b8b7b7;//阴影
    display: flex;
    flex-direction: column;

    .bg-1{
      border:  #B886F8 .5px solid;
      border-radius: 15px 15px 0 0;
    }
    .bg-2{
      border:  #B886F8 2px solid;
    }

    .menu-item:first-child{
      cursor: pointer; // 小手的样式
    }

    .menu-item{
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      align-items: center;

      .icon{
        width: 25px;
        height: 25px;
        margin-left: 20px;
      }

      .name{
        width: 80px;
        height: 45px;
        text-align: left;
        display: flex;
        flex-direction: row;
        align-items: center;

        margin-left: 10px;
        font-size: 16px;
        color: #000000;
        font-family: TsangerYuYangT_W03_W03;
      }

      .down{
        width: 20px;
        height: 20px;
        margin-left: 10px;
        cursor: pointer; // 小手的样式
      }
    }

    .divider{
      width: 100%;
      height: 1px;
      background: #BBBBBB;
    }

    .menu-subitem,.menu-subitem-first{
      width: 142px;
      height: 35px; // 不能设置auto，否则点击后的样式会突兀
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-left: 40px; // padding-left width共同控制紫色边框的位置
      cursor: pointer; // 小手的样式

      .name{
        width: 100px;
        height:32px;
        text-align: left;
        display: flex;
        flex-direction: row;
        align-items: center;

        margin-left: 10px;
        font-size: 14px;
        color: #000000;
        font-family: TsangerYuYangT_W03_W03;
      }
    }
    //.menu-subitem-first{
    //  margin-top: 8px;
    //}
  }
}
</style>
