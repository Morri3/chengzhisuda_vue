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
        <img class="icon" src="" alt="" />
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

      <el-button class="publish" type="primary" round color="#B886F8" :dark="true" @click="publish()">
        <el-icon class="icon-add"><Plus /></el-icon>
        <div class="title">发布兼职</div>
      </el-button>

      <div class="main-box">
        <!--表格-->
        <div class="table">
          <el-table :data="parttimeList" ref="tableRef" height="320" style="width: 100%"
            @select-all="selectAll" :default-sort="{ prop: 'name', order: 'ascending' }"
            :header-cell-style="{ background: '#B886F8', color: '#ffffff' }" align="center">
            <!--复选框，用插槽-->
            <el-table-column type="selection" width="30" align="center">
              <template #default="scope">
                <el-checkbox v-model="scope.row.checked" @change="select"/>
               </template>
            </el-table-column>

            <!--以下5个普通列-->
            <el-table-column prop="id" label="序号" width="55" align="center"/>
            <el-table-column prop="name" label="兼职名称" width="280" sortable align="center"/>
            <el-table-column prop="num" label="报名/录用/名额数" width="140" align="center"/>

            <!--用插槽-->
            <el-table-column prop="status" label="兼职状态" width="120" align="center">
              <template v-slot="scope">
                <el-tag class="status" :type="scope.row.status.type">{{ scope.row.status.value }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="210" align="center"/>

            <!--自定义单元格内容（按钮），用插槽-->
            <el-table-column prop="op" label="操作" width="230" align="center">
              <template #default="scope">
                <div class="btn-box">
                  <el-button class="btn" type="primary" round color="#B886F8" :dark="true" @click="detail(scope)">
                    <div class="title">详情</div>
                  </el-button>
                  <el-button class="btn" type="primary" round color="#B886F8" :dark="true" @click="edit(scope)">
                    <div class="title">编辑</div>
                  </el-button>
                  <el-button class="btn" type="primary" round color="#B886F8" :dark="true" @click="undercarriage(scope)">
                    <div class="title">下架</div>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--分页器-->
        <div class="paging">
          <!-- <el-pagination
            @size-change="changeSize"
            @current-change="changCur"
            :current-page="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="totalNum"
            :pager-count="pagerCount"
          >
          </el-pagination> -->

          <!-- <el-pagination
            background
            layout="prev, pager, next, ->"
            :total="totalNum"
            :page-size="pageSize"
            :pager-count="pagerCount"
            next-text=">"
            prev-text="<"
          /> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <router-view/> -->
  <div class="box" v-else>
    <router-view/>
  </div>
  <!-- </div> -->
</template>

<script>
import { ref, reactive, toRefs, onMounted, onBeforeMount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
// import RouterView from '../RouterView.vue'

export default {
  name: 'ParttimeView',
  components: {
    MainMenu
    // ,RouterView
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
      // 分页数据
      pageNum: 1, // 当前页数
      pageSize: 5, // 每页显示item数
      pagerCount: 3, // 分页器中最大显示多少页
      totalNum: 10 // item总数
    })

    onBeforeMount(() => {
      getParttimeList() // 调api获取数据
    })

    const getParttimeList = () => {
      console.log('调api取数据')
    }

    // 当每页条数改变时，重新赋值pagenum，再请求一次数据
    const changeSize = (curPage) => {
      state.pageSize = curPage
      getParttimeList()
      console.log(`每页 ${curPage} 条`)
    }

    // 选择下一页或者跳到第几页，重新赋值pagenum，再请求一次数据
    const changeCur = (curPage) => {
      state.pageNum = curPage
      getParttimeList()
      console.log(`当前页: ${curPage}`)
    }

    onMounted(() => {
      setTimeout(() => {
        select()
      }, 3000) // 延时3s，不然会报toggleRowSelection的错误
    })

    // 表格
    const tableRef = ref()
    const parttimeList = ref([ // 数据
      {
        id: '1',
        name: '图书馆学生助理',
        num: '10/4/8',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:02',
        checked: false
      },
      {
        id: '2',
        name: 'Jack',
        address: 'No. 189, Grove s',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:03',
        checked: false
      },
      {
        id: '3',
        name: 'Mark',
        address: 'No. 189, Grove St, ',
        status: {
          type: 'danger',
          value: '已招满'
        },
        update_time: '2023-02-01 12:00:04',
        checked: false
      },
      {
        id: '4',
        name: 'Jack',
        address: 'No. 189, Grove s',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:03',
        checked: false
      },
      {
        id: '5',
        name: 'Mark',
        address: 'No. 189, Grove St, ',
        status: {
          type: 'warning',
          value: '已结束'
        },
        update_time: '2023-02-01 12:00:04',
        checked: false
      },
      {
        id: '6',
        name: 'Tom',
        num: 'No. 189, Groos Angeles',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:02',
        checked: false
      },
      {
        id: '2',
        name: 'Jack',
        address: 'No. 189, Grove s',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:03',
        checked: false
      },
      {
        id: '3',
        name: 'Mark',
        address: 'No. 189, Grove St, ',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:04',
        checked: false
      },
      {
        id: '2',
        name: 'Jack',
        address: 'No. 189, Grove s',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:03',
        checked: false
      },
      {
        id: '3',
        name: 'Mark',
        address: 'No. 189, Grove St, ',
        status: {
          type: 'primary',
          value: '已发布'
        },
        update_time: '2023-02-01 12:00:04',
        checked: false
      }
    ])

    const selectAll = row => { // 全选
      parttimeList.value.forEach(item => {
        item.checked = !!row[0]
      })
    }

    const select = () => { // 反选
      parttimeList.value.forEach(item => {
        tableRef.value.toggleRowSelection(item, item.checked)
      })
    }

    const detail = (scope) => { // 详情按钮
      console.log('scope', scope)
      router.push({
        path: '/parttime/list/detail'
      })
    }

    // 菜单打开
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
    }

    // 是否是二级路由
    const secondRoutes = computed(() => {
      let res = null
      if (route.path === '/parttime/list') {
        // 是二级路由
        res = true
      } else {
        res = false
      }
      return res
    })

    // 发布兼职
    const publish = () => {
      console.log('点击了发布兼职')
      router.push({
        path: '/parttime/publish'
      })
    }

    return {
      ...toRefs(state),
      openItem,
      tableRef,
      parttimeList,
      selectAll,
      select,
      getParttimeList,
      changeSize,
      changeCur,
      detail,
      secondRoutes,
      publish
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
        font-family: zcool-TsangerYuYangT_W04_W04;
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
          font-family: zcool-TsangerYuYangT_W04_W04;
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
        font-family: zcool-TsangerYuYangT_W04_W04;
        margin-left: -5px;
        margin-right: 5px;
      }
    }
    .publish:hover,.publish:focus {
      background: #a72af0;
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
        height: 88%;
        display: flex;
        flex-direction: column;
        align-items: center;

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
              font-family: zcool-TsangerYuYangT_W04_W04;
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
