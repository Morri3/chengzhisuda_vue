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
        <el-input class="input1" v-model="search.name" placeholder="请输入内容" clearable/>
        <div class="title2">兼职状态</div>
        <el-select class="input2" v-model="search.status" placeholder="请选择">
          <el-option v-for="(item, index) in statusList" :key="index" :label="item" :value="item"/>
        </el-select>
        <div class="title3">兼职种类</div>
        <el-select class="input3" v-model="search.category" placeholder="请选择">
          <el-option v-for="(item, index) in categoryList" :key="index" :label="item" :value="item"/>
        </el-select>
        <el-button class="search-btn" type="primary" round color="#B886F8" :dark="true" @click="searchData()">
          <div class="title">筛选</div>
        </el-button>
      </div>

      <el-button class="publish" type="primary" round color="#FC9119" :dark="true" @click="publish()">
        <el-icon class="icon-add"><Plus /></el-icon>
        <div class="title">发布兼职</div>
      </el-button>

      <div class="main-box">

        <!--表格-->
        <div class="table">
          <el-table :data="parttimeList" ref="tableRef" height="350" style="width: 100%" v-if="ready"
            :header-cell-style="{ background: '#B886F8', color: '#ffffff' }" align="center" empty-text="暂无数据">
            <el-table-column prop="pId" label="序号" width="55" align="center" :fixed="true"/>

            <el-table-column prop="positionName" label="兼职名称" width="280" align="center" v-if="isAdmin === 0"/>
            <el-table-column prop="positionName" label="兼职名称" width="240" align="center" v-if="isAdmin === 1"/>

            <!--插槽-->
            <el-table-column prop="op" label="负责人" width="80" align="center" v-if="isAdmin === 1">
              <template v-slot="scope">
                <el-tag class="opName" :type="scope.row.op.opNameCategory">{{ scope.row.op.opName }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="nums" label="报名/录用/名额数" width="140" align="center"/>

            <!--插槽-->
            <el-table-column prop="status" label="兼职状态" width="120" align="center">
              <template v-slot="scope">
                <el-tag class="status" :type="scope.row.status.type">{{ scope.row.status.value }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="updateTime" label="更新时间" width="210" align="center" v-if="isAdmin === 0"/>
            <el-table-column prop="updateTime" label="更新时间" width="190" align="center" v-if="isAdmin === 1"/>

            <!--自定义单元格内容（按钮），用插槽-->
            <el-table-column prop="op" label="操作" width="230" align="center">
              <template v-slot="scope">
                <div class="btn-box">
                  <el-button class="btn" type="primary" round color="#B886F8" :dark="true" @click="detail(scope)">
                    <div class="title">详情</div>
                  </el-button>
                  <el-button class="btn" type="primary" round color="#B886F8" :dark="true" v-if="scope.row.status.value === '已发布'" @click="edit(scope)">
                    <div class="title">编辑</div>
                  </el-button>
                  <el-button class="btn" type="primary" round color="#B886F8" :dark="true" v-if="scope.row.status.value === '已发布'" @click="undercarriage(scope)">
                    <div class="title">下架</div>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>

  <!--三级菜单就跳转-->
  <div class="box" v-else>
    <router-view/>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, onBeforeMount, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
import store from '@/store'

export default {
  name: 'ParttimeView',
  components: {
    MainMenu
  },
  props: {},
  emits: [],
  setup () {
    const router = useRouter() // 使用路由
    const route = useRoute() // 使用路由

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
      statusList: [ // 状态下拉框
        '', '已发布', '已招满', '已结束'
      ],
      categoryList: [ // 种类下拉框
        '', '课程助教', '学生助理', '军训助理', '体测助理', '讲解员', '公寓宣传员', '班助', '服务员'
      ],
      genderList: [ // 性别下拉框
        '', '男', '女'
      ],
      parttimeList: [], // 兼职列表数据(表格显示用)
      parttimeAllInfoList: [], // 兼职列表详细信息
      ready: true, // 用于刷新页面
      isAdmin: false, // 当前登录用户是否是管理员
      tmpDataList: [] // 兼职数据列表
    })

    onBeforeMount(() => {
    })

    const getParttimeList = (type) => {
      // 调api
      let theRoute = ''
      if (type === 1) {
        // 是管理员
        theRoute = 'get'
      } else {
        // 是兼职发布者
        theRoute = 'get_own'
      }
      theAxios.get('http://114.55.239.213:8087/parttime/emp/' + theRoute + '?emp_id=' + store.state.user.phone)
        .then(res => {
          console.log('获取兼职接口的返回数据', res.data.data)

          // 获取第一个item，判断
          const first = res.data.data[0]
          if (first.memo === '该账号不存在') {
            ElNotification({
              title: '出错啦',
              message: '该账号不存在',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (first.memo === '请检查输入') {
            ElNotification({
              title: '出错啦',
              message: '请检查输入',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (first.memo === '兼职获取成功') {
            const list = []
            const infoList = []

            for (let i = 0; i < res.data.data.length; i++) {
              // 根据状态判断tag的类型
              let statusType = ''
              if (res.data.data[i].position_status === '已发布') {
                statusType = ''
              } else if (res.data.data[i].position_status === '已招满') {
                statusType = 'danger'
              } else if (res.data.data[i].position_status === '已结束') {
                statusType = 'warning'
              }

              // 判断负责人的el-tag的种类
              let theCategory = ''
              if (res.data.data[i].op_name === '管理员') {
                theCategory = 'error'
              } else {
                theCategory = ''
              }

              // 构造json对象
              const parttime = {
                positionName: res.data.data[i].position_name,
                pId: res.data.data[i].p_id,
                nums: res.data.data[i].num_signup + '/' + res.data.data[i].num_employment + '/' + res.data.data[i].num_total,
                status: {
                  type: statusType,
                  value: res.data.data[i].position_status
                },
                updateTime: res.data.data[i].update_time ? res.data.data[i].update_time : '尚未更新',
                op: {
                  opName: res.data.data[i].op_name ? res.data.data[i].op_name : '',
                  opNameCategory: theCategory
                },
                category: res.data.data[i].category // 兼职种类
              }

              list.push(parttime)
              infoList.push(res.data.data[i])
            }
            state.parttimeList = list // 数组中添加当前遍历的兼职
            state.parttimeAllInfoList = infoList // 整个兼职数据存入该数组
            state.tmpDataList = state.parttimeList // 赋值给暂存的数组
            console.log('所有兼职数据', state.parttimeList)
            console.log('所有兼职详细数据', state.parttimeAllInfoList)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    onMounted(() => {
      state.isAdmin = store.state.user.isAdmin
      if (state.isAdmin) {
        // 是管理员，获取所有兼职信息
        getParttimeList(1)
      } else {
        // 是兼职发布者
        getParttimeList(0)
      }
    })

    // 表格
    const tableRef = ref()

    // 监听是否要更新页面数据
    watch(
      () => route.query.refresh,
      (newVal, oldVal) => {
        if (newVal) {
          // 有数据
          if (state.isAdmin) {
            // 是管理员，获取所有兼职信息
            getParttimeList(1)
          } else {
            // 是兼职发布者
            getParttimeList(0)
          }
        }
      }
    )

    // 详情按钮
    const detail = (scope) => {
      // 由p_id找到当前操作的兼职
      let curItem = {}
      state.parttimeAllInfoList.forEach(v => {
        if (v.p_id === scope.row.pId) {
          curItem = v
        }
      })
      console.log('详情路由传递的数据', JSON.stringify(curItem))

      // 跳转
      router.push({
        path: '/parttime/list/detail',
        query: {
          dataList: JSON.stringify(curItem), // 当前行的p_id对应的兼职数据
          type: 0 // 表示从兼职列表页进入详情页
        }
      })
    }

    // 编辑按钮
    const edit = (scope) => {
      // 由p_id找到当前操作的兼职
      let curItem = {}
      state.parttimeAllInfoList.forEach(v => {
        if (v.p_id === scope.row.pId) {
          curItem = v
        }
      })
      console.log('编辑路由传递的数据', JSON.stringify(curItem))

      // 跳转
      router.push({
        path: '/parttime/list/edit',
        query: {
          dataList: JSON.stringify(curItem) // 当前行的p_id对应的兼职数据
        }
      })
    }

    // 下架
    const undercarriage = (scope) => {
      state.ready = false

      // 发布兼职输入的dto
      const input = {
        op_id: store.state.user.phone,
        p_id: scope.row.pId
      }
      // 调api，下架兼职
      theAxios.post('http://114.55.239.213:8087/parttime/undercarriage', input)
        .then(res => {
          console.log('下架兼职接口的返回数据', res.data.data)

          if (res.data.data.memo === '非兼职负责人不能操作') {
            ElNotification({
              title: '出错啦',
              message: '非兼职负责人不能操作',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '不存在该兼职发布者') {
            ElNotification({
              title: '出错啦',
              message: '不存在该兼职发布者',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '该兼职发布者不存在单位') {
            ElNotification({
              title: '出错啦',
              message: '该兼职发布者不存在单位',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '下架成功') {
            console.log('下架的兼职信息', res.data.data)

            // 获取最新数据，刷新页面
            if (state.isAdmin) {
              // 是管理员，获取所有兼职信息
              getParttimeList(1)
            } else {
              // 是兼职发布者
              getParttimeList(0)
            }

            ElNotification({
              title: '成功啦',
              message: '下架成功',
              type: 'success',
              position: 'top-right', // 右上
              offset: 60
            })
          }

          state.ready = true
        })
        .catch(err => {
          console.error(err)
        })
    }

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

    // 发布兼职
    const publish = () => {
      console.log('欢迎您发布兼职')
      router.push({
        path: '/parttime/publish'
      })
    }

    // 搜索功能
    const searchData = () => {
      state.ready = false

      const name = state.search.name
      const category = state.search.category
      const status = state.search.status

      let newDataList = state.tmpDataList // 筛选后的列表

      // 1.兼职名称模糊查询
      if (name !== '' && name) {
        newDataList = newDataList.filter(v => {
          return (v.positionName).indexOf(name) !== -1
        })
      }

      // 2.兼职状态精确查询
      if (status !== '' && status) {
        // 过滤掉状态不是目标状态的兼职
        newDataList = newDataList.filter((v) => {
          return v.status.value === status
        })
      }

      // 3.兼职种类精确查询
      if (category !== '' && category) {
        // 过滤掉种类不是目标种类的兼职
        newDataList = newDataList.filter((v) => {
          return v.category === category
        })
      }

      // 4.把新的数组赋值给state.parttimeList
      state.parttimeList = newDataList

      state.ready = true
    }

    return {
      ...toRefs(state),
      tableRef,
      getParttimeList,
      detail,
      secondRoutes,
      publish,
      undercarriage,
      edit,
      searchData
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
  background-image: url('/public/img/logandreg/背景（黄绿）.png');
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
  .right-box{
    width: 80%;
    height: calc( 100% - 54px - 54px );
    // 超出自动换行
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

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

    .publish{
      width: 100px;
      height: 40px;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      box-shadow: 2px 2px 2px #898989;//阴影
      position: absolute;
      right: 8.4%;
      top: 26.5%;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon-add{
        width: 40px;
        height: 40px;
      }
      .title{
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        font-family: TsangerYuYangT_W04_W04;
        margin-left: -5px;
        margin-right: 5px;
      }
    }
    .publish:hover,.publish:focus {
      background: #f0d22a;
      border: none;
    }

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

        // 按钮
        .btn-box{
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          .btn{
            width: 65px;
            height: 30px;
            color: #ffffff;
            border: none;
            border-radius: 10px;

            .title{
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              font-family: TsangerYuYangT_W04_W04;
            }
          }
          .btn:hover,.btn:focus {
            background: #a72af0;
            border: none;
          }
        }
      }
    }
  }
}
</style>
