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
        <div class="top-line">
          <img class="icon" :src="'/img/utils/icon_search.png'" alt="" />
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
        <div class="bottom-line">
          <div class="title1">性别</div>
          <el-select class="input1" v-model="search.gender" placeholder="请选择">
            <el-option v-for="item in genderList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <!-- <div class="title2">全选</div>
          <el-switch class="selectAll" v-model="isAll" inline-prompt active-text="是" inactive-text="否"/> -->
        </div>
      </div>

      <!--无内容-->
      <div class="main-box" v-if="nocontent === true">
        <div class="no-content">暂无内容</div>
      </div>

      <!--有内容-->
      <div class="main-box" v-else>
        <!--列表-->
        <div class="list-box"  v-for="(item, index) in dataList" :key="index">
          <!--每个item-->
          <div class="item-box">
            <!--顶部-->
            <div class="top-box">
              <!--兼职名称-->
              <div class="p-name">{{item.name}}</div>
              <!--操作员-->
              <div class="op">
                <div class="op-name">{{item.opName}}</div>
                <div class="op-statistics">已报{{item.status1}}人，已录用{{item.status2}}人，共招{{item.total}}人</div>
              </div>

              <!--按钮-->
              <el-button class="btn" type="primary" round color="#B886F8" :dark="true" @click="resumeDetail(item)">
                <img class="icon" :src="'/img/position/button_resume_info.png'" alt=""/>
                <div class="title">简历详情</div>
              </el-button>

              <!--按钮-->
              <el-button class="btn-2" type="primary" round color="#B886F8" :dark="true" @click="employ(item)"
                v-if="item.status.value === '已报名'">
                <img class="icon" :src="'/img/position/button_hire.png'" alt=""/>
                <div class="title">录用</div>
              </el-button>
              <el-button class="btn-2" type="primary" round color="#B886F8" :dark="true" @click="employ(item)"
                v-else disabled :style="'background: #C1C2C5;'">
                <img class="icon" :src="'/img/position/button_hire.png'" alt=""/>
                <div class="title">录用</div>
              </el-button>

              <!--按钮-->
              <el-button class="btn-3" type="primary" round color="#B886F8" :dark="true" @click="reject(item)"
                v-if="item.status.value === '已报名'">
                <img class="icon" :src="'/img/position/button_refuse.png'" alt=""/>
                <div class="title">婉拒</div>
              </el-button>
              <el-button class="btn-3" type="primary" round color="#B886F8" :dark="true" @click="reject(item)"
                v-else disabled :style="'background: #C1C2C5;'">
                <img class="icon" :src="'/img/position/button_refuse.png'" alt=""/>
                <div class="title">婉拒</div>
              </el-button>

              <!--报名创建的时间-->
              <div class="date">{{item.create_time}}</div>
            </div>

            <!--底部正文-->
            <div class="bottom-box">
              <div class="left-box">
                <img class="head" :src="'/img/position/icon_head1.jpeg'" alt=""/>
              </div>

              <div class="right-box">

                <div class="line-1">
                  <div class="name">{{item.username}}</div>
                  <img class="gender-icon" :src="'/img/position/男.png'" alt="" v-if="item.gender === '男'"/>
                  <img class="gender-icon" :src="'/img/position/女.png'" alt="" v-else-if="item.gender === '女'"/>
                  <el-tag class="status" :type="item.status.type"
                    :style="item.status.type==='primary'?'border: 1px solid #22bdff;':'border: 1px solid #f8e6ce'">
                    {{item.status.value}}
                  </el-tag>
                </div>

                <div class="line-2">
                  <div class="age">{{item.age}}岁</div>
                  <div class="divider"></div>
                  <div class="grade">{{item.grade}}</div>
                  <div class="divider"></div>
                  <div class="exp">{{item.exp}}</div>
                </div>

                <div class="line-3" v-if="item.education.time">
                  <div class="education">
                    <img class="icon" :src="'/img/position/icon_education.png'" alt=""/>
                    <div class="time">{{(item.education).time}}</div>
                    <div class="title">{{(item.education).title}}</div>
                    <div class="content">{{(item.education).content}}</div>
                  </div>
                </div>

                <div class="line-4" v-if="item.campus">
                  <div class="campus">
                    <div class="campus-item" v-for="(campus_item, campus_index) in item.campus"
                      :key="campus_index">
                      <div class="icon-box">
                        <img class="icon" :src="'/img/position/icon_campus.png'" alt="" v-if="campus_index === 0"/>
                      </div>
                      <div class="time" :style="campus_index!=0 ? 'margin-left:20px;' : ''">{{campus_item.time}}</div>
                      <div class="title">{{campus_item.title}}</div>
                      <div class="content">{{campus_item.content}}</div>
                    </div>
                  </div>
                </div>

                <div class="line-5" v-if="item.project">
                  <div class="project">
                    <div class="project-item" v-for="(project_item, project_index) in item.project"
                      :key="project_index">
                      <div class="icon-box">
                        <img class="icon" :src="'/img/position/icon_program.png'" alt="" v-if="project_index === 0"/>
                      </div>
                      <div class="time" :style="project_index!=0 ? 'margin-left:20px;' : ''">{{project_item.time}}</div>
                      <div class="title">{{project_item.title}}</div>
                      <div class="content">{{project_item.content}}</div>
                    </div>
                  </div>
                </div>

                <div class="line-6" v-if="item.skills">
                  <div class="skills">
                    <div class="skills-item" v-for="(skills_item, skills_index) in item.skills"
                      :key="skills_index">
                      <div class="icon-box">
                        <img class="icon" :src="'/img/position/icon_skills.png'" alt="" v-if="skills_index === 0"/>
                      </div>
                      <div class="content" :style="skills_index!=0 ? 'margin-left:25px;' : ''">{{skills_item.content}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--简历弹窗-->
          <el-dialog v-model="visible" :show-close="false" class="resumes-box"
            title="简历" width="45%" center align-center>

            <!--简历图片-->
            <el-image
              v-if="item.resumes.substr(0, 4) === '/img'"
              class="resumes-pic"
              :src="item.resumes"
              :zoom-rate="1.2"
              :preview-src-list="item.resumesList"
              :initial-index="0"
              fit="cover"
            />
            <el-image
              v-else
              class="resumes-pic"
              :src="item.resumes"
              :zoom-rate="1.2"
              :preview-src-list="item.resumesList"
              :initial-index="0"
              fit="cover"
            />

            <!--底部按钮-->
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="visible = false">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>

  <div class="box" v-else>
    <router-view/>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'

export default {
  name: 'SignupInfo',
  components: {
    MainMenu
  },
  props: {},
  setup () {
    const router = useRouter() // 使用路由
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
        category: '',
        gender: ''
      },
      dataList: [], // 报名数据列表
      statusList: [], // 状态下拉框
      categoryList: [], // 种类下拉框
      genderList: [], // 性别下拉框
      visible: false, // 是否显示简历弹窗
      nocontent: false, // 是否显示404内容
      ready: true // 用于刷新页面
    })

    onBeforeMount(() => {
    })

    const getParttimeList = (type) => {
      console.log('调api取数据')

      // 调api，获取报名信息
      theAxios.get('http://114.55.239.213:8087/parttime/signup/get_info?emp_id=' + store.state.user.phone)
        .then(res => {
          console.log('获取报名信息接口的返回数据', res.data.data)

          let flag = false // 判断是否没数据
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取报名信息成功') {
              flag = true
            }
          }
          if (flag === false) {
            // 说明没数据
            const theRes = res.data.data[0]
            if (theRes.memo === '暂时无人报名该兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '暂时无人报名该兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '存在非法报名') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '存在非法报名',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '请检查输入的信息是否完整') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '请检查输入的信息是否完整',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '暂时无负责的兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '暂时无负责的兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '不存在简历') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '不存在简历',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          } else {
            state.nocontent = false
            console.log('发布的兼职信息', res.data.data)

            // 有数据
            if (res.data.data.length > 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].memo === '获取报名信息成功') {
                  // 有报名信息才显示
                  let theStatus = {}
                  if (res.data.data[i].signup_status === '已报名') {
                    theStatus = {
                      type: 'primary',
                      value: '已报名'
                    }
                  } else if (res.data.data[i].signup_status === '已录取') {
                    theStatus = {
                      type: 'danger',
                      value: '已录取'
                    }
                  } else if (res.data.data[i].signup_status === '已结束') {
                    theStatus = {
                      type: 'warning',
                      value: '已结束'
                    }
                  } else if (res.data.data[i].signup_status === '已取消') {
                    theStatus = {
                      type: 'error',
                      value: '已取消'
                    }
                  }

                  const list1 = []
                  if (res.data.data[i].campusExpList !== null && res.data.data[i].campusExpList !== undefined) {
                    // 校园经历有
                    for (let j = 0; j < res.data.data[i].campusExpList.length; j++) {
                      if ((res.data.data[i].campusExpList)[j].time && (res.data.data[i].campusExpList)[j].content) {
                        list1.push({
                          time: (res.data.data[i].campusExpList)[j].time,
                          title: (res.data.data[i].campusExpList)[j].title,
                          content: (res.data.data[i].campusExpList)[j].content
                        })
                      }
                    }
                  }
                  //  else {
                  //   // 校园经历无
                  //   list1.push({
                  //     time: '暂无校园经历',
                  //     title: '',
                  //     content: ''
                  //   })
                  // }

                  let list2 = {}
                  if (res.data.data[i].educationBgList !== null && res.data.data[i].educationBgList !== undefined) {
                    // 教育背景有
                    for (let j = 0; j < res.data.data[i].educationBgList.length; j++) {
                      if ((res.data.data[i].educationBgList)[j].time && (res.data.data[i].educationBgList)[j].content) {
                        list2 = {
                          time: (res.data.data[i].educationBgList)[j].time,
                          title: (res.data.data[i].educationBgList)[j].title,
                          content: (res.data.data[i].educationBgList)[j].content
                        }
                      }
                    }
                  }

                  const list3 = []
                  if (res.data.data[i].projectExpList !== null && res.data.data[i].projectExpList !== undefined) {
                    // 项目经历有
                    for (let j = 0; j < res.data.data[i].projectExpList.length; j++) {
                      if ((res.data.data[i].projectExpList)[j].time && (res.data.data[i].projectExpList)[j].content) {
                        list3.push({
                          time: (res.data.data[i].projectExpList)[j].time,
                          title: (res.data.data[i].projectExpList)[j].title,
                          content: (res.data.data[i].projectExpList)[j].content
                        })
                      }
                    }
                  }

                  const list4 = []
                  if (res.data.data[i].professionalSkillList !== null && res.data.data[i].professionalSkillList !== undefined) {
                    // 专业技能有
                    for (let j = 0; j < res.data.data[i].professionalSkillList.length; j++) {
                      if ((res.data.data[i].professionalSkillList)[j].content) {
                        list4.push({
                          content: (res.data.data[i].professionalSkillList)[j].content
                        })
                      }
                    }
                  }

                  // 处理简历图片
                  let url = ''
                  const urls = []
                  if (res.data.data[i].url) {
                    console.log('url', res.data.data[i].url)
                    if ((res.data.data[i].url).indexOf('ttp') !== -1) {
                      console.log('preview_url', (res.data.data[i].url).substring(0, (res.data.data[i].url).indexOf('.jpg') + 4))
                      url = (res.data.data[i].url).substring(0, (res.data.data[i].url).indexOf('.jpg') + 4) // 获取可访问部分的url，在minio中设置public的桶访问权限
                      urls.push(url)
                    }
                  } else {
                    // 没简历图片就显示默认的
                    url = '/img/signup/前端实习生_张亦骞_浙大城市学院计算机科学与技术专业_简历.png'
                    urls.push('/img/signup/前端实习生_张亦骞_浙大城市学院计算机科学与技术专业_简历.png')
                  }

                  state.dataList.push({
                    name: res.data.data[i].p_name,
                    opName: '',
                    status1: res.data.data[i].num_signup ? res.data.data[i].num_signup : 0,
                    status2: res.data.data[i].num_employment ? res.data.data[i].num_employment : 0,
                    total: res.data.data[i].num_total ? res.data.data[i].num_total : 0,
                    username: res.data.data[i].username ? res.data.data[i].username : '暂未填写',
                    gender: res.data.data[i].gender ? res.data.data[i].gender : '暂未填写',
                    status: theStatus,
                    age: res.data.data[i].age ? res.data.data[i].age : 0,
                    grade: res.data.data[i].grade ? res.data.data[i].grade : '暂未填写',
                    exp: res.data.data[i].exp ? res.data.data[i].exp : '暂未填写',
                    create_time: res.data.data[i].signup_time ? res.data.data[i].signup_time : '暂未填写',
                    education: list2,
                    campus: list1,
                    project: list3,
                    skills: list4,
                    resumes: url, // 简历图片
                    resumesList: urls, // 图片放大预览的列表
                    sId: res.data.data[i].s_id,
                    pId: res.data.data[i].p_id
                  })
                }
              }
              if (type !== 'no') {
                ElNotification({
                  title: '成功啦',
                  message: '获取成功',
                  type: 'success',
                  position: 'top-right', // 右上
                  offset: 60
                })
              }
            }
          }
          console.log(state.dataList)
        })
        .catch(err => {
          console.error(err)
        })
    }

    onMounted(() => {
      getParttimeList()
    })

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
      if (route.path === '/parttime/list' || route.path === '/parttime/signup' ||
        route.path === '/markcomment/mark' || route.path === '/markcomment/comment' ||
        route.path === '/userhome/index') {
        // 是二级路由
        res = true
      } else {
        res = false
      }
      return res
    })

    // 简历详情
    const resumeDetail = (item) => {
      console.log('欢迎查看简历详情', item)
      state.visible = true // 显示弹窗
    }

    // 录取
    const employ = (item) => {
      state.ready = false

      // 调api
      const input = {
        emp_id: store.state.user.phone,
        s_id: item.sId
      }
      theAxios.post('http://114.55.239.213:8087/parttime/signup/confirm', input)
        .then(res => {
          console.log('录用接口的返回数据', res.data.data)

          let flag = false
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取报名信息成功') {
              flag = true
            }
          }
          if (flag === false) {
            // 说明没数据
            const theRes = res.data.data[0]
            if (theRes.memo === '不能操作非负责的兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '不能操作非负责的兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '不存在该报名') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '不存在该报名',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '请检查输入的信息是否完整') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '请检查输入的信息是否完整',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          } else {
            // 有数据
            if (res.data.data.length > 0) {
              state.nocontent = false
              getParttimeList('no') // 获取报名信息，刷新页面，刷新后可以改变按钮样式.并传入参数控制ElNotification的显示与否

              ElNotification({
                title: '成功啦',
                message: '录用成功',
                type: 'success',
                position: 'top-right', // 右上
                offset: 60
              })

              router.push({
                path: '/parttime/signup'
              })
            }
          }
          state.ready = true
        })
        .catch(err => {
          console.error(err)
        })
    }

    // 婉拒
    const reject = (item) => {
      state.ready = false

      // 调api
      const input = {
        emp_id: store.state.user.phone,
        s_id: item.sId
      }
      theAxios.post('http://114.55.239.213:8087/parttime/signup/reject', input)
        .then(res => {
          console.log('婉拒接口的返回数据', res.data.data)

          let flag = false
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取报名信息成功') {
              flag = true
            }
          }
          if (flag === false) {
            // 说明没数据
            const theRes = res.data.data[0]
            if (theRes.memo === '不能操作非负责的兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '不能操作非负责的兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '不存在该报名') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '不存在该报名',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '请检查输入的信息是否完整') {
              state.nocontent = true
              ElNotification({
                title: '出错啦',
                message: '请检查输入的信息是否完整',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          } else {
            // 有数据
            if (res.data.data.length > 0) {
              state.nocontent = false
              getParttimeList('no') // 获取报名信息，刷新页面，刷新后可以改变按钮样式.并传入参数控制ElNotification的显示与否

              ElNotification({
                title: '成功啦',
                message: '婉拒成功',
                type: 'success',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          }
          state.ready = true
        })
        .catch(err => {
          console.error(err)
        })
    }

    return {
      ...toRefs(state),
      openItem,
      resumeDetail,
      getParttimeList,
      secondRoutes,
      employ,
      reject
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
  overflow-x:hidden;

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
      height: 20%;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 4px 4px 2px #d5d5d5;//阴影
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; // 水平居中

      // 搜索区域的上面那行
      .top-line{
        width: 90%;
        height: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        // justify-content: center;

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

      // 搜索区域的第二行
      .bottom-line{
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 172px;

        .title1,.title2{
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
        .selectAll{
          width: 70px;
          height: 40px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .title2{
          margin-left: 70px;
        }
      }
    }

    // 正文
    .main-box{
      width: 90%;
      height: 74%;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 4px 4px 2px #d5d5d5;//阴影
      display: inline-block;//flex布局不能正常实现溢出滚动
      margin-top: 20px; //正文和搜索区域的间距

      // 元素溢出滚动
      overflow-y:scroll;
      overflow-x:hidden;
      &::-webkit-scrollbar {
        width: 0;//隐藏滚动条
      }

      // 暂无内容
      .no-content{
        margin-top: 150px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-weight: 500;
        color: #b9b9b9;
        font-family: Alimama_DongFangDaKai_Regular;
      }

      .list-box{
        width: 100%;
        height: auto; // 让元素正常显示
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;

        // 简历弹窗
        ::v-deep .resumes-box{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top:60px;

          .resumes-pic{
            width: 350px;
            height: 480px;
          }
        }

        //每个item
        .item-box{
          width:90%;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          // 阴影
          box-shadow: 4px 4px 10px #9b9a9a;
          border-radius: 20px;
          margin-bottom: 10px; // 每个item的间距

          // 顶部
          .top-box{
            width: 100%;
            height: 54px;
            background: #e7bdff;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-radius: 20px 20px 0 0;
            box-shadow: none; // 取消顶部的阴影

            .p-name{
              width: 190px;
              height: 40px;
              font-weight: 500;
              font-size: 20px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              margin-left: 40px;
              margin-right: 130px; // 让p-name左移到左边

              display: flex;
              flex-direction: row;
              align-items: center;
            }

            // 操作员
            .op{
              width: 180px;
              height: 35px;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-left: 30px;

              .op-name{
                width: 100%;
                height: auto;
                font-weight: 400;
                font-size: 12px;
                color: #000000;
                font-family: TsangerYuYangT_W03_W03;
                text-align: end;
                padding-right: 5px;
              }

              .op-statistics{
                width: 100%;
                height: auto;
                font-weight: 400;
                font-size: 12px;
                color: #000000;
                font-family: TsangerYuYangT_W03_W03;
                text-align: end;
                padding-right: 5px;
              }
            }

            //按钮
            .btn,.btn-2,.btn-3{
              height: 30px;
              margin-left: 15px;
              border-radius: 10px;
              color: #ffffff;
              border: none;
              box-shadow: 2px 2px 2px #898989;//阴影

              .icon{
                width: 25px;
                height: 22px;
                margin-right: 2px;
              }
              .title{
                font-weight: 400;
                font-size: 12px;
                color: #ffffff;
                font-family: TsangerYuYangT_W03_W03;
              }
            }
            .btn{
              width: 90px;
            }
            .btn-2,.btn-3{
              width: 65px;
              margin-left: 8px;
            }

            // 创建时间
            .date{
              width: 158px;
              height: auto;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
              font-family: TsangerYuYangT_W03_W03;
              margin-left: 20px;
            }
          }

          // 底部
          .bottom-box{
            width: 100%;
            height: auto;
            background: #ffffff;
            border-radius: 0 0 20px 20px;
            display: flex;
            flex-direction: row;
            align-items: center;

            // 头像
            .left-box{
              width: 70px;
              height: auto;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              margin-left: 10px;

              .head{
                width:50px;
                height:50px;
              }
            }

            // 右边
            .right-box{
              width: calc( 100% - 60px );
              height: auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-left: 5px;
              padding-left: 5px;
              //border-left:1px solid #898989;//左边框

              // 第一行
              .line-1{
                width: 100%;
                height: 30px;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 5px;

                .name{
                  width: 80px;
                  height: auto;
                  font-weight: 500;
                  font-size: 18px;
                  color: #000000;
                  font-family: TsangerYuYangT_W05_W05;
                  margin-left: 10px;
                }

                .gender-icon{
                  width: 20px;
                  height: 20px;
                  margin-left: 5px;
                }

                .status{
                  width: 68px;
                  height: 25px;
                  margin-left: 690px;
                  border: 1px solid #f8e6ce;
                }
              }

              // 第2行
              .line-2{
                width: 100%;
                height: 30px;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 0px;

                .age{
                  width: 40px;
                  height: auto;
                  font-weight: 400;
                  font-size: 16px;
                  color: #000000;
                  font-family: TsangerYuYangT_W03_W03;
                  margin-left: 10px;
                  word-break:break-all;//换行
                }

                .divider{
                  width: 1px;
                  height: 17px;
                  background: #898989;
                  margin-left:15px;
                }

                .grade{
                  width: 38px;
                  height: auto;
                  margin-left: 15px;
                  font-weight: 400;
                  font-size: 16px;
                  color: #000000;
                  font-family: TsangerYuYangT_W03_W03;
                  word-break:break-all;//换行
                }

                .exp{
                  width: 190px;
                  height: auto;
                  margin-left: 15px;
                  font-weight: 400;
                  font-size: 16px;
                  color: #000000;
                  font-family: TsangerYuYangT_W03_W03;
                  word-break:break-all;//换行
                }
              }

              // 第3行
              .line-3{
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 4px;

                .education{
                  width: 100%;
                  height: 100%;
                  // 居中
                  display: flex;
                  flex-direction: row;

                  .icon{
                    width: 10px;
                    height: 10px;
                    margin-top: 5px;
                  }
                  .time{
                    width: 140px;
                    height: auto;
                    margin-left: 10px;
                    font-weight: 400;
                    font-size: 16px;
                    color: #000000;
                    font-family: TsangerYuYangT_W03_W03;
                  }
                  .title{
                    width: 165px;
                    height: auto;
                    margin-left: 15px;
                    font-weight: 400;
                    font-size: 16px;
                    color: #000000;
                    font-family: TsangerYuYangT_W03_W03;
                    word-break:break-all;//换行
                  }
                  .content{
                    width: 51%;
                    height: auto;
                    margin-left: 15px;
                    font-weight: 400;
                    font-size: 16px;
                    color: #000000;
                    font-family: TsangerYuYangT_W03_W03;
                    word-break:break-all;//换行
                  }
                }
              }

              // 第4行
              .line-4{
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 5px;

                .campus{
                  width: 100%;
                  height: 100%;
                  // 居中
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;

                  .campus-item{
                    width: 100%;
                    height: auto; // 高度根据子元素高度而定
                    // 居中
                    display: flex;
                    flex-direction: row;

                    .icon-box{
                      height: auto;
                      display: flex;
                      flex-direction: column;
                      //justify-content: center;
                      align-items: center;
                      margin-top: 5px;

                      .icon{
                        width: 10px;
                        height: 10px;
                      }
                    }

                    .time{
                      width: 140px;
                      height: auto;
                      margin-left: 10px;
                      font-weight: 400;
                      font-size: 16px;
                      color: #000000;
                      font-family: TsangerYuYangT_W03_W03;
                    }
                    .title{
                      width: 165px;
                      height: auto;
                      margin-left: 15px;
                      font-weight: 400;
                      font-size: 16px;
                      color: #000000;
                      font-family: TsangerYuYangT_W03_W03;
                      word-break:break-all;//换行
                    }
                    .content{
                      width: 51%;
                      height: auto;
                      margin-left: 15px;
                      font-weight: 400;
                      font-size: 16px;
                      color: #000000;
                      font-family: TsangerYuYangT_W03_W03;
                      word-break:break-all;//换行
                    }
                  }
                }
              }

              // 第5行
              .line-5{
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 15px;

                .project{
                  width: 100%;
                  height: auto; // 高度根据子元素高度而定
                  // 居中
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;

                  .project-item{
                    width: 100%;
                    height: auto; // 高度根据子元素高度而定
                    // 居中
                    display: flex;
                    flex-direction: row;

                    .icon-box{
                      height: auto;
                      display: flex;
                      flex-direction: column;
                      //justify-content: center;
                      align-items: center;
                      margin-top: 5px;

                      .icon{
                        width: 10px;
                        height: 10px;
                      }
                    }

                    .time{
                      width: 140px;
                      height: auto;
                      margin-left: 10px;
                      font-weight: 400;
                      font-size: 16px;
                      color: #000000;
                      font-family: TsangerYuYangT_W03_W03;
                    }
                    .title{
                      width: 165px;
                      height: auto;
                      margin-left: 15px;
                      font-weight: 400;
                      font-size: 16px;
                      color: #000000;
                      font-family: TsangerYuYangT_W03_W03;
                      word-break:break-all;//换行
                    }
                    .content{
                      width: 51%;
                      height: auto;
                      margin-left: 15px;
                      font-weight: 400;
                      font-size: 16px;
                      color: #000000;
                      font-family: TsangerYuYangT_W03_W03;
                      word-break:break-all;//换行
                    }
                  }
                }
              }

              // 第6行
              .line-6{
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 15px;
                margin-bottom: 15px; // 离item底部

                .skills{
                  width: 100%;
                  height: auto; // 高度根据子元素高度而定
                  // 居中
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;

                  .skills-item{
                    width: 100%;
                    height: auto; // 高度根据子元素高度而定
                    // 居中
                    display: flex;
                    flex-direction: row;

                    .icon-box{
                      height: auto;
                      display: flex;
                      flex-direction: column;
                      //justify-content: center;
                      align-items: center;
                      margin-top: 5px;

                      .icon{
                        width: 10px;
                        height: 10px;
                      }
                    }

                    .content{
                      width: 94%;
                      height: auto;
                      margin-left: 15px;
                      font-weight: 400;
                      font-size: 16px;
                      color: #000000;
                      font-family: TsangerYuYangT_W03_W03;
                      word-break:break-all;//换行
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
