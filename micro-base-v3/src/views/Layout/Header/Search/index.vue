<template>
    <img class="top-search" src="@/assets/images/base/top-search.png" @click="isShow = true" />
    <div class="micro-search-container" v-if="isShow" @click="isShow = false">
        <Suspense>
            <searchDialogCom v-model="isShow" />
            <template #fallback>
                <div class="loading" v-loading="true"></div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang='ts'>
import { ref, defineAsyncComponent } from 'vue';
const searchDialogCom = defineAsyncComponent(() => import('./searchDialog.vue'))
defineOptions({
    name: 'SearchView',
});
const isShow = ref(false)
</script>

<style lang='scss' scoped>
.top-search {
    width: 50px;
    height: 34px;
    margin-right: 20px;
    cursor: pointer;
}

.micro-search-container {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba($color: #000000, $alpha: 0.6);

    .loading {
        position: absolute;
        left: 50%;
        top: 200px;
        transform: translateX(-50%);
    }
}
</style>