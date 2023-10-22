<template>
  <div>
    {{ new Date() }}
    <div @click="test('/contractWarding/list')">contractWarding/list</div>
    <div @click="test('/constructionContract/list')">constructionContract/list</div>
    <div @click="test('/constructionContractPay/list')">constructionContractPay/list</div>
    <div @click="test('/settlement/list')">settlement/list</div>
  </div>
</template>

<script setup >
import { useRouter } from 'vue-router'
const router = useRouter()
const test = (path) => {
  router.push(path)
}
defineOptions({
  name: '123',
});
</script>

<style lang='scss' scoped></style>