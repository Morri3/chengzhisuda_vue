<template>
  <div class="box">
    <div class="chart" id="chart3" ref="chart3"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, nextTick, watch } from 'vue'
import * as echarts from 'echarts' // 引入

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
        const myChart = echarts.init(document.getElementById('chart3')) // 声明组件

        const names = [] // 数组
        const values = [] // 数组
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          names.push((JSON.parse(props.data))[i].pName)
          values.push((JSON.parse(props.data))[i].num)
        }

        // 颜色数组
        const color = ['#9459FD', '#FDD760', '#FD8460', '#99FD60', '#22CEFC', '#60E4FD', '#6A60FD', '#FD60AC', '#FC2266']

        // 构造随机数
        const numArr = []
        random(numArr, 0, 9, 9) // 9个颜色中选9个

        const data = []
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          // 构造数据
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
              value: 0.3,
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
            center: ['50%', '35%'], // 位置
            radius: ['50%', '50%'], // 饼图的内外径
            hoverAnimation: true, // 悬停动画
            itemStyle: { // 元素样式
              normal: {
                label: {
                  show: true,
                  position: 'outside', // 标签显示在外侧
                  formatter: function (params) {
                    let percent = 0 // 百分比占比
                    let total = 0 // 总和
                    // 遍历values数组，求总和
                    for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
                      total += values[i]
                    }
                    // 求每个item的占比
                    percent = ((params.value / total) * 100).toFixed(2)
                    if (params.name !== '') { // 是真实的item
                      return ('{name|' + params.name + '}\n{percent|' + percent + '%}')
                    } else { // 用于填充的item
                      return ''
                    }
                  },
                  // 富文本标签
                  rich: {
                    name: {
                      color: color[numArr[0]],
                      lineHeight: 10,
                      fontFamily: 'DingTalk_JinBuTi_Regular'
                    },
                    percent: {
                      color: color[numArr[1]],
                      fontSize: 16,
                      fontFamily: 'DingTalk_JinBuTi_Regular'
                    }
                  },
                  alignTo: 'labelLine'
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
            triggerOn: 'mousemove|click', // 触发条件
            textStyle: { // 悬浮框中文字的样式
              fontSize: 13,
              fontFamily: 'DingTalk_JinBuTi_Regular'
            },
            formatter: function (params) {
              return `
                      <div><a style="color: ${color[numArr[1]]}">${params.name}</a></div>
                      <div>
                        <a style="color: ${color[numArr[2]]}"> ● </a>
                        <a style="color: #000000">综合评分均值：</a>
                        <a style="color: ${color[numArr[2]]}">${(params.value).toFixed(2)}</a>
                      </div>
                     `
            }
          },
          // 图例
          legend: {
            bottom: 15,
            left: 'center',
            // 图例滚动显示
            type: 'scroll',
            // 图例控制块
            pageButtonGap: 10, // 图例控制块与图例的间距
            pageFormatter: '{current} / {total}', // 图例控制块的格式
            pageIconColor: '#7F83F7', // 翻页按钮颜色
            pageIconInactiveColor: '#BEBEBE', // 翻页按钮未激活时颜色
            pageIconSize: 13, // 翻页按钮大小
            pageTextStyle: { // 图例控制块文本的样式
              fontFamily: 'DingTalk_JinBuTi_Regular'
            },
            // 文字样式
            textStyle: {
              color: '#000000',
              fontSize: 12
            },
            icon: 'circle',
            padding: [4, 0, 0, 0], // 图例内边距
            itemWidth: 8, // 图例宽度
            itemHeight: 14, // 图例高度
            itemGap: 10 // 图例间隙
          },
          // 数据
          series: series
        }
        myChart.setOption(options)

        // 定时，每3s自动切换
        let curIdx = -1
        let interval = setInterval(() => { // 定时器
          // 1.取消之前的高亮
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: curIdx
          })

          // 2.隐藏之前的tooltip
          myChart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: curIdx
          })

          // 3.修改当前下标
          curIdx = (curIdx + 1) % series[0].data.length // 取名额数数组长度

          // 4.当前位置高亮
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: curIdx
          })

          // 5.显示tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: curIdx
          })
        }, 3000) // 设置自动切换高亮图形的定时器

        // 鼠标悬停时
        myChart.on('mouseover', (params) => {
          // 1.清空定时器
          clearInterval(interval)

          // 2.之前位置的取消高亮
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: curIdx
          })

          // 3.修改当前下标
          curIdx = (curIdx + 1) % series[0].data.length // 取名额数数组长度

          // 4.当前悬停的位置高亮
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: params.dataIndex // 悬停所在位置
          })
        })

        // 鼠标移开后，继续自动切换
        myChart.on('mouseout', (params) => {
          // 1.若定时器存在，清空定时器
          if (interval) {
            clearInterval(interval)
          }

          // 2.取消悬停位置的高亮
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: params.dataIndex
          })

          // 3.重新设置定时器，继续从原来的位置开始切换
          interval = setInterval(() => {
            // 3-1.之前位置的取消高亮
            myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: curIdx
            })

            // 3-2.隐藏之前的tooltip
            myChart.dispatchAction({
              type: 'hideTip',
              seriesIndex: 0,
              dataIndex: curIdx
            })

            // 3-3.修改当前下标
            curIdx = (curIdx + 1) % series[0].data.length

            // 3-4.当前位置高亮
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: curIdx
            })

            // 3-5.显示tooltip
            myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: curIdx
            })
          }, 3000)
        })
      })
    }

    onMounted(() => {
      // 这里不能加setchart
      // SetChart()
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
