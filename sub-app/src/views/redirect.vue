<template></template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
defineOptions({
  name: 'redirectView',
});
const route = useRoute()
const router = useRouter()
const { params, query } = route
const { path } = params
router.replace({ path: '/' + path, query })
</script>

<style lang='scss' scoped></style>