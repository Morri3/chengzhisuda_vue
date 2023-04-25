<template>
  <!-- <div> -->
  <div class="box" v-if="secondRoutes">
      <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <div class="right-box">
      <!--搜索区域-->
      <div class="top-box">
        <img class="icon" src="/img/utils/icon_search.png" alt="" />
        <div class="title1">兼职名称</div>
        <el-input class="input1" v-model="search.name" placeholder="请输入内容"/>
        <div class="title2">兼职状态</div>
        <el-select class="input2" v-model="search.status" placeholder="请选择">
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <div class="title3">兼职种类</div>
        <el-select class="input3" v-model="search.category" placeholder="请选择">
          <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button class="search-btn" type="primary" round color="#B886F8" :dark="true" @click="search()">
          <div class="title">筛选</div>
        </el-button>
      </div>

      <div class="main-box">

        <!--表格-->
        <div class="table">
          <el-table :data="commentList" ref="tableRef" height="350" style="width: 100%;"
            :header-cell-style="{ background: '#B886F8', color: '#ffffff' }" align="center">

            <!--以下5个普通列-->
            <el-table-column prop="id" label="序号" width="55" align="center"/>
            <el-table-column prop="pName" label="兼职名称" width="270" sortable align="center"/>
            <el-table-column prop="username" label="用户名" width="100" align="center"/>
            <el-table-column prop="content" label="评论内容" width="420" align="center">
              <template v-slot="scope">
                <div style="color: #f7b91e;">{{ scope.row.content }}</div>
              </template>
            </el-table-column>

            <!--评论时间-->
            <el-table-column prop="commentTime" label="评论时间" width="180" align="center"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>

  <div class="box" v-else>
    <router-view/>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
// import RouterView from '../RouterView.vue'

export default {
  name: 'CommentView',
  components: {
    MainMenu
    // ,RouterView
  },
  props: {},
  emits: [],
  setup () {
    // const router = useRouter() // 使用路由
    const route = useRoute() // 使用路由
    const store = useStore()

    const state = reactive({
      user: {
        phone: '',
        pwd: '',
        token: ''
      },
      sub: { // 控制二级菜单的开关
        sub1: false,
        sub2: false,
        sub3: false
      },
      search: { // 搜索部分
        name: '',
        status: '',
        category: ''
      },
      statusList: [], // 状态下拉框
      categoryList: [], // 种类下拉框
      genderList: [], // 性别下拉框
      commentList: [], // 评论列表
      nocontent: false // 是否显示404内容
    })

    onBeforeMount(() => {
    })

    const getCommentList = () => {
      // 调api
      theAxios.get('http://114.55.239.213:8087/comments/emp/getSome?emp_id=' + store.state.user.phone)
        .then(res => {
          console.log('评论数据接口的返回数据', res.data.data)

          let flag = false
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取成功') {
              flag = true
            }
          }
          if (flag === false) {
            // 说明没数据
            const theRes = res.data.data[0]
            if (theRes.memo === '该报名尚未评论') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '该报名尚未评论',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '该兼职尚未报名') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '该兼职尚未报名',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '暂无负责的兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '暂无负责的兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '请检出输入') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '请检出输入',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          } else {
            // 有数据
            if (res.data.data.length > 0) {
              const list = []
              res.data.data.forEach(v => {
                // 遍历
                if (v.memo === '获取成功') {
                  // 获取成功的才加入到列表
                  list.push({
                    id: v.c_id, // 评论id
                    content: v.content,
                    commentTime: v.create_time, // 评论时间
                    username: v.username,
                    pName: v.p_name,
                    stuId: v.user_id,
                    sId: v.s_id
                  })
                }
              })
              // list赋值给markList
              state.commentList = list
              console.log('评论列表数据', state.commentList)

              ElNotification({
                title: '成功啦',
                message: '获取成功',
                type: 'success',
                position: 'top-right', // 右上
                offset: 60
              })

              // router.push({
              //   path: '/parttime/signup'
              // })
            }
          }
          state.ready = true
        })
        .catch(err => {
          console.error(err)
        })
    }

    onMounted(() => {
      getCommentList() // 调api获取数据
    })

    // 表格
    const tableRef = ref()

    // 是否是二级路由
    const secondRoutes = computed(() => {
      let res = null
      if (route.path === '/parttime/list' || route.path === '/parttime/signup' ||
        route.path === '/markcomment/mark' || route.path === '/markcomment/comment' ||
        route.path === '/userhome/index' || route.path === '/analyze/behavior') {
        // 是二级路由
        res = true
      } else {
        res = false
      }
      return res
    })

    return {
      ...toRefs(state),
      tableRef,
      getCommentList,
      secondRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height: calc( 100% - 54px );
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url('/public/img/logandreg/背景（橙黄）.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 54px;

  .left-box{
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .menu-box{
      width: 80%;
      height: 100%;
      background: none;
      display: flex;
      flex-direction: column;
      margin-bottom: 45px;
    }
  }

  //右边区域
  .right-box{
    width: 80%;
    height: calc( 100% - 54px - 54px );
    // 超出自动换行
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    //搜索区域
    .top-box{
      width: 90%;
      height: 10%;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 4px 4px 2px #d5d5d5;//阴影
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .icon{
        width: 30px;
        height: 30px;
      }
      .title1,.title2,.title3{
        width: 56px;
        height: auto;
        margin-left: 25px;

        font-weight: 600;
        font-size: 14px;
        color: #000000;
        font-family: TsangerYuYangT_W04_W04;
      }
      .input1{
        width: 140px;
        height: 30px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .input2,.input3{
        width: 140px;
        height: 40px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .title2,.title3{
        margin-left: 70px;
      }
      .search-btn{
        width: 75px;
        height: 30px;
        margin-left: 60px;
        color: #ffffff;
        border-radius: 10px;
        border: none;
        box-shadow: 2px 2px 2px #898989;//阴影

        .title{
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
          font-family: TsangerYuYangT_W04_W04;
        }
      }
      .search-btn:hover,.search-btn:focus {
        background: #a72af0;
        border: none;
      }
    }

    //表格区域
    .main-box{
      width: 90%;
      height: 80%;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 4px 4px 2px #d5d5d5;//阴影
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 30px;

      .table{
        width: 99%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;

        //评分表格
        .comment-box{
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          //align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
