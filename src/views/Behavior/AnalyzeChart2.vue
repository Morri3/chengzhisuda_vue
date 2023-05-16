<template>
  <div class="box">
    <div class="chart" id="chart2" ref="chart2"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, nextTick, watch } from 'vue'
import * as echarts from 'echarts' // 引入

export default {
  name: 'AnalyzeChart2',
  components: {
  },
  props: ['data'],
  setup (props) {
    const state = reactive({
      user: {
        phone: '',
        pwd: '',
        token: ''
      },
      dataList: [], // 数据
      nocontent: false // 是否显示404内容
    })

    onBeforeMount(() => {
    })

    // 监听
    watch(
      () => props.data,
      (newVal, oldVal) => {
        SetChart()
      }
    )

    // 产生不重复的随机数
    const random = (arr, max, min, need) => {
      const num = Math.floor((Math.random() * (max - min)) + min) // 随机数
      if (arr.indexOf(num) === -1) { // 不存在，加入数组
        arr.push(num)
      } else { // 存在，重新调用
        random(arr, max, min, need)
      }
      if (arr.length < need) { // 数组长度<需要的个数，就重新调用
        random(arr, max, min, need)
      }
    }

    const SetChart = () => {
      nextTick(() => {
        const myChart = echarts.init(document.getElementById('chart2')) // 声明组件

        let pNames = [] // 数组
        let numNames = [] // 数组
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          pNames.push((JSON.parse(props.data))[i].pName)
          numNames.push((JSON.parse(props.data))[i].numName)
        }

        // 1.数组去重
        // step1：...new Set(XXX)实现去重操作，结果是'a' 'b' ...
        // step2：外面套一层[]转变为数组
        pNames = [...new Set(pNames)]
        numNames = [...new Set(numNames)]

        // 颜色数组
        const color = ['#9459FD', '#FDD760', '#FD8460', '#99FD60', '#22CEFC', '#60E4FD', '#6A60FD', '#FD60AC', '#FC2266']

        // 2.生成不重复随机数
        const numArr = []
        random(numArr, 0, 9, 3) // 9个颜色中选3个

        // 3.构造堆叠柱状图数据
        const series = []
        for (let i = 0; i < numNames.length; i++) {
          const obj = {
            name: numNames[i],
            type: 'bar', // 柱状图
            stack: 'As', // 堆叠
            emphasis: { // 鼠标悬停在柱子上时的高亮样式
              focus: 'series'
            },
            barWidth: '30%',
            itemStyle: { // 堆叠柱状图柱子颜色
              color: color[numArr[i]] // 随机颜色
            },
            data: []
          }
          series.push(obj)
        }

        // 3-2.按照相同兼职名称对指标数值进行堆叠
        JSON.parse(props.data).forEach((v1) => {
          series.forEach((v2) => {
            // series中遍历的v2的指标名称 与 当前遍历的源数据中的指标名称相同，
            // 且当前遍历的源数据中的学生姓名在stuNames数组中，
            // 就遍历的v1的指标值赋值给数组的指定位置
            // 相当于从源数组中，获取所有的报名数，构造成一个数组，赋值给series中报名数所在对象的data数组
            if (v2.name === v1.numName && pNames.indexOf(v1.pName) > -1) {
              v2.data[pNames.indexOf(v1.pName)] = v1.num
            }
          })
        })

        // 4.构造echarts图的选项
        const options = {
          // 标题
          title: {
            text: '报名',
            textStyle: {
              color: '#F7A82B',
              fontSize: '14px'
            }
          },
          // 悬停框
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            textStyle: { // 悬浮框中文字的样式
              fontSize: 13,
              fontFamily: 'DingTalk_JinBuTi_Regular'
            }
          },
          // 图例
          legend: {
            top: 0,
            left: 'center',
            icon: 'circle',
            // 文字样式
            textStyle: {
              color: '#000000',
              fontSize: 12
            },
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 30 // 图例间隙
          },
          // 网格
          grid: {
            left: '4%',
            right: '6%',
            bottom: '14%', // 和底部的距离
            containLabel: true // 包含刻度标签
          },
          // x轴
          xAxis: [{
            type: 'category',
            data: pNames,
            boundaryGap: true,
            axisLine: { // 轴线
              lineStyle: {
                color: '#F7A82B',
                opacity: 0.5
              }
            },
            axisTick: { // 刻度
              alignWithLabel: true, // 刻度线标签对齐
              lineStyle: {
                color: '#F7A82B',
                opacity: 0 // 不显示
              }
            },
            axisLabel: { // x轴标签
              snow: true,
              fontSize: 12,
              fontFamily: 'DingTalk_JinBuTi_Regular',
              rotate: 45,
              // 标签长度>2，只显示前两个中文+省略号
              formatter: function (value) {
                if (value.length > 2) {
                  return value.substring(0, 2) + '..'
                } else {
                  return value
                }
              }
            }
          }],
          // y轴
          yAxis: [{
            type: 'value',
            splitLine: { // 分割线
              show: true, // 刻度线标签对齐
              interval: 'auto', // 间距
              lineStyle: {
                color: '#FFEED4'
              }
            }
          }],
          // 数据
          series: series
        }
        myChart.setOption(options)
      })
    }

    onMounted(() => {
      SetChart()
    })

    return {
      ...toRefs(state),
      SetChart,
      props,
      random
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

  // echart图指定宽高
  .chart{
    width: 100%;
    height:100%;
    background: #ffffff;
    overflow: hidden;//使用白背景+溢出隐藏，解决背景是页面背景的bug
  }
}
</style>
