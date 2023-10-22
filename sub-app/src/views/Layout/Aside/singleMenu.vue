<template>
    <div class="parent-menu-box" @click="parentClick(item)" @mouseenter="showMenu" @mouseleave="hideMenu"
        :class="{ active: isActive }">
        <!-- <div class="parent-menu-box" @click="parentClick(item)" > -->
        <svg-icon :name="String(item?.meta?.icon)" style="height: 24px;width: 24px;"></svg-icon>
        <span class="title">{{ String(item.meta.title).substring(0,2) }}</span>
    </div>
    <template v-if="item.hasChildren">
        <Transition name="cel">
            <div class="children-box" v-show="isActive" @mouseenter="showMenu" @mouseleave="hideMenu">
                <!-- 一级title -->
                <div class="title" level="1">{{ String(item.meta.title) }}</div>
                <template v-for="item2 in item.children" :key="String(item2?.path)">
                    <template v-if="item2.hasChildren">
                        <!-- 二级title -->
                        <div class="title" level="2">{{ String(item2.meta.title) }}</div>
                        <template v-for="item3 in item2.children" :key="String(item3?.path)">
                            <template v-if="item3.hasChildren">
                                <!-- 三级title不显示 -->
                                <MenuItem v-for="item4 in item3.children" :key="String(item4?.path)"
                                    :title="String(item4.meta.title)" :path="item4.path" :uuid="String(item4?.path)"
                                    @close="() => { isActive = false }" />
                            </template>
                            <MenuItem v-else :key="String(item3?.path)" :title="String(item3.meta.title)"
                                :path="item3.path" :uuid="String(item3?.path)" @close="() => { isActive = false }" />
                        </template>
                    </template>
                    <MenuItem v-else="item2.hasChildren" :key="String(item2?.path)" :title="String(item2.meta.title)"
                        :path="item2.path" :uuid="String(item2?.path)" @close="() => { isActive = false }" />
                </template>
            </div>
        </Transition>
    </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import MenuItem from './menuItem.vue';
import { ref } from 'vue'
defineOptions({
    name: 'singleMenu',
});
defineProps({
    item: {
        type: Object,
        required: true
    }
})
const router = useRouter()
// 一级菜单单击事件
const parentClick = (item) => {
    if (item.hasChildren) return
    router.push(item.path).catch(() => { })
}

let showTimeout
let hideTimeout
const isActive = ref(false)
const showMenu = () => {
    clearTimeout(hideTimeout)
    if (isActive.value) return
    showTimeout = setTimeout(() => {
        isActive.value = true
    }, 430)
}
const hideMenu = () => {
    clearTimeout(showTimeout)
    if (!isActive.value) return
    hideTimeout = setTimeout(() => {
        isActive.value = false
    }, 330)
}
</script>

<style lang='scss' scoped>
.parent-menu-box {
    cursor: pointer;
    height: 48px;
    // margin-top: 10px;
    // background-color: #fff;
    border-radius: 20px 0 0 20px;
    line-height: 48px;
    text-indent: 8px;
    border: 1px solid #ECF1F9;
    border-right: none;
    box-sizing: content-box;

    .title {
        font-size: 14px;
        color: #222222;
        margin-left: 8px;
        font-weight: normal;
    }

    &.active {
        background-color: #fff;

        .title {
            color: var(--jtlj-color-primary);
        }
    }
}

.children-box {
    position: fixed;
    left: 110px;
    top: 60px;
    bottom: 0;
    min-width: 150px;
    background-color: #fff;
    z-index: 999;
    border-right: 1px solid #E9ECF3;
    cursor: default;
    padding: 10px 20px;
    overflow: auto;
    @include scrollStyle;

    .title {
        margin: 0;
        line-height: 40px;
        text-align: left;

        &[level='1'] {
            color: #333333;
            font-size: 20px;

            font-weight: 500;
        }

        &[level='2'] {
            color: #333333;
            font-size: 14px;
            font-weight: 800;
        }
    }
}

.cel-enter-active {
    transition: all .4s ease;
}



.cel-enter-from {
    opacity: 0;
}
</style>