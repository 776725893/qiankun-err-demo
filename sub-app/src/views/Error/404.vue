<template>
  <div class="base-card">
    <el-result title="" sub-title="该页面不存在,请检查路径">
      <template #icon>
        <el-image :src="img" style="width: 600px" />
      </template>
      <template #extra>
        <el-button type="primary" @click="toHome">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script  setup >
defineOptions({
  name: '404View',
});
import img from '@/assets/images/common/404_页面丢失.png'
import useRouter from '@/hooks/useRouter';
const { toHome } = useRouter()
</script>

<style lang='scss' scoped>
.base-card {
  height: 100%;
}
</style>