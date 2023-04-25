<template>
  <div class="box">
    <div class="chart" id="chart3" ref="chart3"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, nextTick, watch } from 'vue'
import * as echarts from 'echarts' // 引入
// import moment from 'moment'

export default {
  name: 'AnalyzeChart3',
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
      if (arr.indexOf(num) >= 0) { // 存在，重新调用
        random()
      } else { // 不存在，加入数组
        arr.push(num)
      }
      if (arr.length < need) { // 数组长度<需要的个数，就重新调用
        random()
      }
    }

    const SetChart = () => {
      nextTick(() => {
        const myChart = echarts.init(document.getElementById('chart3')) // 声明组件

        const names = [] // 数组
        const values = [] // 数组
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          names.push((JSON.parse(props.data))[i].pName)
          values.push((JSON.parse(props.data))[i].num)
        }

        // 颜色数组
        const color = ['#9459FD', '#FDD760', '#FD8460', '#99FD60', '#60E4FD', '#6A60FD', '#FD60AC']

        const data = []
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          data.push(
            // 真实数据
            {
              name: names[i], // 兼职名
              value: values[i], // 综合评分平均值
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  shadowBlur: 20,
                  borderColor: color[i],
                  shadowColor: color[i]
                }
              }
            },
            // 两个item的间隙
            {
              value: 0.5,
              name: '',
              tooltip: { // 不显示悬浮框
                show: false
              },
              // 元素样式
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)',
                  borderWidth: 0
                }
              }
            }
          )
        }

        // 数据
        const series = [
          {
            name: '',
            type: 'pie', // 饼图
            clockWise: false,
            radius: ['50%', '50%'], // 饼图的内外径
            hoverAnimation: true, // 悬停动画
            itemStyle: { // 元素样式
              normal: {
                label: {
                  show: true,
                  position: 'outside', // 标签显示在外侧
                  color: '#E9A64B',
                  formatter: function (params) {
                    let percent = 0 // 百分比占比
                    let total = 0 // 总和
                    // 遍历values数组，求总和
                    for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
                      total += values[i]
                    }
                    // 求每个item的占比
                    percent = ((params.value / total) * 100).toFixed(0)
                    // 是真实的item
                    if (params.name !== '') {
                      return ('' + params.name + '\n' + percent + '%')
                    } else {
                      return ''
                    }
                  }
                },
                // 标签线的样式
                labelLine: {
                  length: 18,
                  length2: 5,
                  show: true,
                  color: '#FFC678'
                }
              }
            },
            data: data // 数据
          }
        ]
        const options = {
          // 标题
          title: {
            text: '评分',
            textStyle: {
              color: '#F7A82B',
              fontSize: '14px'
            }
          },
          // 悬停框
          tooltip: {
            show: true,
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
            },
            confine: true, // 限制在图表区域内
            triggerOn: 'mousemove', // 触发条件
            textStyle: { // 悬浮框中文字的样式
              fontSize: 13,
              color: '#000'
            }
          },
          // 图例
          legend: {
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 7,
            x: 'center',
            y: 'top',
            // 文字样式
            textStyle: {
              color: '#000'
            }
          },
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
