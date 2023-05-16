<template>
  <div class="box">
    <div class="chart" id="chart4" ref="chart2"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, nextTick, watch } from 'vue'
import * as echarts from 'echarts' // 引入

export default {
  name: 'AnalyzeChart4',
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
        const myChart = echarts.init(document.getElementById('chart4')) // 声明组件

        // step1
        let stuNames = [] // 数组
        let numNames = [] // 数组
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          stuNames.push((JSON.parse(props.data))[i].stuName)
          numNames.push((JSON.parse(props.data))[i].numName)
        }

        // 数组去重
        stuNames = [...new Set(stuNames)]
        numNames = [...new Set(numNames)]
        // console.log('学生姓名', stuNames)
        // console.log('指标名称', numNames)

        // 颜色数组
        const color = ['#9459FD', '#FDD760', '#FD8460', '#99FD60', '#22CEFC', '#60E4FD', '#6A60FD', '#FD60AC', '#FC2266']

        // step2：生成不重复随机数
        const numArr = []
        random(numArr, 0, 9, 4) // 9个颜色中选4个

        // step3：构造堆叠柱状图数据
        const series = []
        for (let i = 0; i < numNames.length; i++) {
          const obj = {
            name: numNames[i],
            type: 'bar', // 柱状图
            stack: 'As', // 堆叠
            emphasis: { // 鼠标悬停在柱子上时的高亮样式
              focus: 'series'
            },
            itemStyle: { // 折线+图例的颜色
              color: color[numArr[i]] // 随机颜色
            },
            data: [],
            barWidth: '20%',
            yAxisIndex: 1 // 指定y轴，默认左侧是0
          }
          series.push(obj)
        }

        // step4：处理series的data，嵌套for循环遍历传来的数组+series，按照相同stuName对指标数值进行堆叠
        JSON.parse(props.data).forEach((v1) => {
          series.forEach((v2) => {
            // series中遍历的v2的指标名称 与 当前遍历的源数据中的指标名称相同，
            // 且当前遍历的源数据中的学生姓名在stuNames数组中，
            // 就遍历的v1的指标值赋值给数组的指定位置
            // 相当于从源数组中，获取所有的报名数，构造成一个数组，赋值给series中报名数所在对象的data数组
            if (v2.name === v1.numName && stuNames.indexOf(v1.stuName) > -1) {
              v2.data[stuNames.indexOf(v1.stuName)] = v1.num
            }
          })
        })

        // step5：先把每个学生的数据放在一个对象中，分别遍历原数组，将该学生的三指标值加入numArr数组
        const dataInfo = {}
        JSON.parse(props.data).forEach((item, index) => {
          const { stuName } = item // 解构，等价于const obj = item; const stuName = obj.stuName;
          // 数组中不存在该学生姓名，就新建一个对象
          if (!dataInfo[stuName]) {
            dataInfo[stuName] = {
              stuName,
              numArr: [] // 存放每个学生的三种数据的值
            }
          }
          dataInfo[stuName].numArr.push(item) // 数据加入数组
        })
        const list = Object.values(dataInfo) // 对象dataInfo中找到可枚举属性值，构造成数组list
        console.log('list', list)

        // 构造折线图数据
        const percent = [] // 存放每个学生的录用率的对象数组（包含姓名+录用率）
        for (let i = 0; i < list.length; i++) {
          // 分别求每个学生的三种数的和
          let sum = 0
          list[i].numArr.forEach(v => {
            sum += v.num
          })

          // 求占比
          list[i].numArr.forEach(v => {
            // 找到录用数所在元素，计算百分比
            if (v.numName === '录用数') {
              if (sum > 0) {
                const obj = {
                  stuName: list[i].stuName,
                  percent: ((v.num * 1.0 / sum) * 100).toFixed(2)
                }
                percent.push(obj)
              } else {
                // 总和为0，则百分比为0，否则会显示NaN
                const obj = {
                  stuName: list[i].stuName,
                  percent: 0
                }
                percent.push(obj)
              }
            }
          })
        }
        // console.log('percent', percent)

        // 构造折线图数据的series
        const lineData = []
        percent.forEach(v => {
          lineData.push(v.percent)
        })
        const lineObj = {
          name: '录用率',
          type: 'line',
          symbol: 'circle', // 拐点样式
          symbolSize: 10, // 拐点大小
          itemStyle: { // 折线+图例的颜色
            color: color[numArr[1]] // 随机颜色
          },
          data: lineData,
          yAxisIndex: 0 // 指定y轴，默认左侧是0
        }
        series.push(lineObj)
        console.log('series', series)

        // 选项
        const options = {
          // 标题
          title: {
            text: '活跃',
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
            // 悬浮框中文字的样式
            textStyle: {
              fontSize: 13,
              fontFamily: 'DingTalk_JinBuTi_Regular'
            }
          },
          // 图例
          legend: {
            bottom: 0,
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
          // 宫格
          grid: {
            show: false,
            top: '40',
            bottom: '62',
            right: '45',
            left: '55'
          },
          // x轴
          xAxis: [{
            type: 'category',
            data: stuNames, // 学生姓名
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
                if (value.length > 3) {
                  return value.substring(0, 3) + '..'
                } else {
                  return value
                }
              }
            }
          }],
          // y轴
          yAxis: [
            // 左边
            {
              type: 'value',
              name: '录用率',
              show: true,
              interval: 20, // 间距
              splitLine: { // 分割线
                show: true, // 刻度线标签对齐
                lineStyle: {
                  color: '#FFEED4'
                }
              },
              axisLabel: {
                formatter: '{value}%'
              }
            },
            // 右边
            {
              type: 'value',
              name: '数量',
              splitLine: { // 分割线
                show: false, // 刻度线标签是否对齐
                interval: 20, // 间距
                lineStyle: {
                  color: '#FFEED4'
                }
              }
            }
          ],
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
