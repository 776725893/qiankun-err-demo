<template>
    <!-- 弹窗 -->
    <div class="search-box" @click.stop>
        <div class="search">
            <img src="@/assets/images/base/search-icon.png" alt="" class="search-icon">
            <el-input class="search-input" autofocus v-model.trim="searchContent" placeholder="请输入您想搜索的功能名称" />
        </div>
        <div class="search-content" v-show="showMenu?.length">
            <div class="search-target" v-for="item in showMenu" :key="item.path"  @click="toPage(item.path)">
                <span class="target" :title="item.name">{{ item.name }} </span>
                <div class="parent" :title="item.parent">
                    {{ item.parent }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { watch, ref, computed } from 'vue';
import store from '~/store';
import type { IMenu } from "@/types/base";
import { useRouter } from 'vue-router';
defineOptions({
    name: 'searchDialogView',
});
interface ISearchMenu {
    name: string
    path: string
    parent: string
}
const router = useRouter()
const { appStore } = store
// 搜索内容
const searchContent = ref('')

const isShow = defineModel('modelValue', {
    required: true
})

// 可检索的菜单
const menuList = ref<ISearchMenu[]>();
watch(appStore.menuList, (arr) => {
    menuList.value = transformMenu(arr)
}, {
    immediate: true
})

// 搜索出的菜单
const showMenu = computed(() => {
    const text = String(searchContent.value).trim()
    return text ? menuList.value?.filter(v => v.name.includes(text)) : []
})

// 路由跳转
const toPage = (path: string) => {
    router.push(path).catch(() => { })
    searchContent.value = ''
    isShow.value = false
}

/**
 * @desc 将菜单转化为扁平数组
 * @param {IMenu[]}  
 * @return void
 * @Author: kong
 */
function transformMenu(arr: IMenu[]) {
    const res: ISearchMenu[] = []
    const fn = (arr: IMenu[], parent: string = '') => {
        arr.forEach(v => {
            const name = String(v.meta?.title ?? "")
            if (v.hasChildren) fn(v.children, parent + `${parent ? '/' : ''}${name}`)
            else res.push({ name, path: v.path, parent })
        })
    }
    fn(arr)
    return res
}
</script>

<style lang='scss' scoped>
.search-box {
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: 35%;
    min-width: 500px;

    .search {
        @include fx;
        height: 80px;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 0 20px;

        .search-icon {
            width: 28px;
            height: 28px;
            margin-right: 18px;
        }

        .search-input {
            height: 28px;
            font-size: 18px;
            line-height: 28px;

            :deep(.jtlj-input__wrapper) {
                box-shadow: none;
            }
        }
    }

    .search-content {
        @include scrollStyle;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 10px 15px;
        margin-top: 3px;
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 40px;
        max-height: 40vh;
        overflow: auto;

        .search-target {

            @include fx-bt;
            cursor: pointer;

            .parent {
                margin-left: 15px;
                color: #ccc;
                max-width: 50%;
                @include textOver;
            }

            span.target {

                @include textOver;
                max-width: 50%;
            }

            &:hover {
                span.target {
                    color: var(--jtlj-menu-active-color);
                }

            }
        }
    }
}
</style>