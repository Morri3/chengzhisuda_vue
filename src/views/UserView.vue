<template>
  <div class="user">
    <h1>哈哈哈哈</h1>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
  },
  setup () {
    const route = useRoute() // 使用路由
    const state = reactive({

    })

    onMounted(() => {
      console.log(route.matched)
    })

    const handleClick = () => {
      // console.log(route.options.routes)
    }
    return {
      ...toRefs(state),
      handleClick
    }
  }

}
</script>
