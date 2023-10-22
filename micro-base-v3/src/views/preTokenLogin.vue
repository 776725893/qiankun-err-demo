<template></template>

<script setup lang='ts'>
import urlConfig from '@/urlConfig'
import { defaultHomePath, preTokenLoginName, preTokenLoginPathName } from '@/router/constant'
import { useRouter, useRoute } from 'vue-router';
import { removeAllCache, setSSOToken } from '@/utils/cookies'
defineOptions({
  name: 'preTokenLogin',
});
const router = useRouter()
const route = useRoute()
const { query, params, name } = route
const toQuery = Object.assign({}, query)
delete toQuery['token']
if (query.token) {
  removeAllCache()
  setSSOToken(String(query.token))
  switch (name) {
    case preTokenLoginName:
      router.push({ path: defaultHomePath, query: toQuery }).catch(() => { })
      break
    case preTokenLoginPathName:
      const toPath = params.toPath
      router.push({ path: '/' + toPath, query: toQuery }).catch(() => { })
      break
  }
} else {
  location.href = urlConfig.SSOLogin
}
</script>

<style lang='scss' scoped></style>