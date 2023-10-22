<template>
  <el-card shadow="never" style="height: 2000px;">
    <h3>当前页面初始化时间为:{{ curTime }}</h3>
  </el-card>
</template>

<script setup lang='ts'>
defineOptions({
  name: 'HomeView',
});
import { formatTime } from '@/utils/tools'
const curTime = formatTime('YYYY-MM-DD HH:mm:ss')
</script>

<style lang='scss' scoped></style>