<template>
  <el-card shadow="never" style="height: 100%;">
    <input>
    <h3>详情页</h3>
    <h5>id为{{ $route.params.id }}</h5>
  </el-card>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import store from '~/store';

defineOptions({
    name: 'detailView',
});
store.tabStore.changeTitleByKey(`${useRoute().params.id}的详情页`)
</script>

<style lang='scss' scoped></style>