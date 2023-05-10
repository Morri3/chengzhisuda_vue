<template>
  <div class="box">
    <div class="chart" id="chart" ref="chart"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, nextTick, watch } from 'vue'
import * as echarts from 'echarts' // 引入

export default {
  name: 'AnalyzeChart1',
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

    const SetChart = () => {
      nextTick(() => {
        const myChart = echarts.init(document.getElementById('chart')) // 声明组件

        const time = [] // 时间数组
        const num = [] // 数量数组

        // 构造time、num数组
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          time.push((JSON.parse(props.data))[i].date)
          num.push((JSON.parse(props.data))[i].num)
        }

        // 选项
        const options = {
          // 标题
          title: {
            text: '兼职',
            textStyle: {
              color: '#F7A82B',
              fontSize: '14px'
            }
          },
          // 悬停框
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#F7A82B'
              }
            },
            // 悬浮框中文字的样式
            textStyle: {
              fontSize: 13,
              fontFamily: 'DingTalk_JinBuTi_Regular'
            }
          },
          legend: {
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8
          },
          // x轴
          xAxis: {
            type: 'category',
            data: time, // 时间数组
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
              fontFamily: 'DingTalk_JinBuTi_Regular',
              rotate: 45,
              formatter: function (value) {
                return value.substring(2, 4) + value.substring(5, 7) + value.substring(8, 10)
              }
            }
          },
          // y轴
          yAxis: {
            type: 'value',
            splitLine: { // 分割线
              show: true, // 刻度线标签对齐
              interval: 'auto', // 间距
              lineStyle: {
                color: '#FFEED4'
              }
            }
          },
          // 数据
          series: [
            {
              data: num, // 数据
              type: 'line', // 折线图
              name: '发布数',
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: { // 折线+图例的颜色
                color: '#C9AAFF'
              },
              markLine: {
                data: [{ type: 'average', name: '平均值' }]
              }
            }
          ]
        }
        myChart.setOption(options)

        // 定时器，每3s元素循环右移一位
        setInterval(() => {
          // 1.日期数组循环右移
          const first1 = time.shift() // 弹出第一个元素，并返回该元素
          time.push(first1) // 原来的第一个元素加入数组最后

          // 2.发布数数组循环右移
          const first2 = num.shift() // 弹出第一个元素，并返回该元素
          num.push(first2) // 原来的第一个元素加入数组最后

          // 3.设置x轴标签、series数据
          myChart.setOption({
            xAxis: [{ data: time }],
            series: [{ data: num }]
          })
        }, 3000)
      })
    }

    onMounted(() => {
      // 这里若加setchart，echart图数据会多加载一次undefined
      // SetChart()
    })

    return {
      ...toRefs(state),
      SetChart,
      props
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
