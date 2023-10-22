<template>
    <div class="base-menu-container">
        <div class="menu-container" v-for="item in menuList" :key="String(item?.meta?.uuid)">
            <singleMenu :item="item" />
        </div>
    </div>
</template>

<script setup>
import store from '@/store/index'
import { computed } from 'vue';
import singleMenu from './singleMenu.vue'
const { appStore } = store
defineOptions({
    name: 'newAsideView',
});

const menuList = computed(() => {
    return appStore?.menuList
})

</script>

<style lang='scss' scoped>
.base-menu-container {
    position: relative;
    width: 110px;
    min-width: 110px;
    max-width: 110px;
    background: #ECF1F9;
    box-shadow: 1px 1px 10px #E9ECF3;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    overflow: auto;
    @include scrollStyle;
    z-index: 2000;
    &::-webkit-scrollbar {
        height: 0px;
        width: 0px;
    }
}
</style>
