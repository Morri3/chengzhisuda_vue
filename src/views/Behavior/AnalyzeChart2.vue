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

        // 数组去重
        pNames = [...new Set(pNames)]
        numNames = [...new Set(numNames)]

        // 颜色数组
        const color = ['#9459FD', '#FDD760', '#FD8460', '#99FD60', '#60E4FD', '#6A60FD', '#FD60AC']

        // 生成不重复随机数
        const numArr = []
        random(numArr, 0, 7, 3)

        // 构造series
        const series = []
        for (let i = 0; i < numNames.length; i++) {
          const obj = {
            name: numNames[i],
            type: 'bar', // 柱状图
            stack: 'As', // 堆叠
            emphasis: {
              focus: 'series'
            },
            barWidth: '30%',
            itemStyle: { // 折线+图例的颜色
              color: color[numArr[i]] // 随机颜色
            },
            data: []
          }
          series.push(obj)
        }

        // 处理series的data，按照相同pName进行堆叠
        JSON.parse(props.data).forEach((v1) => {
          series.forEach((v2) => {
            // series中遍历的v2的数量名称 与 当前遍历的源数据中的数量名称相同，
            // 且当前遍历的源数据中的兼职名称在pNames数组中，
            // 就把其所在数组中的位置上的数据设置为遍历的v1的num值
            if (v2.name === v1.numName && pNames.indexOf(v1.pName) > -1) {
              v2.data[pNames.indexOf(v1.pName)] = v1.num
            }
          })
        })

        // 选项
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
