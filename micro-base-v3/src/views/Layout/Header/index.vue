<template>
    <el-header class="micro-main-header">

    </el-header>
</template>

<script setup lang='ts'>
import { Down } from '@icon-park/vue-next'
import { ElMessageBox } from 'element-plus'
import SearchCom from './Search/index.vue'
import store from '~/store';
import { ref } from 'vue'
import MarqueeComp from '@/components/MarqueeComp/index.vue'
import SettingDrawer from './Setting/index.vue'
defineOptions({
    name: 'HeaderView',
});

// 跑马灯是否显示
const showMarquee = ref(true)

// 用户下拉菜单点击事件
function handleCommand(command: string | number | object) {
    if (command === 'logout') {
        ElMessageBox.confirm('确定注销并退出系统吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            store.userStore.logout()
        })
    }
}
</script>

<style lang='scss' scoped>
.micro-main-header {
    @include fx-bt;
    height: 60px;
    background: var(--jtlj-color-primary);
    color: white;

    .logo-img {
        height: 37px;
    }

    .message-box {
        @include fx;
        height: 28px;
        width: 30%;
        background: var(--jtlj-color-primary-light-3);
        border-radius: 14px;
        line-height: 28px;
        font-size: 12px;

        .notice,
        .close {
            width: 20px;
            height: 20px;
            margin: 0 5px;
        }

        .close {
            opacity: .5;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }
    }

    .right-box {
        @include fx-center;

        .top-help {
            width: 90px;
            height: 31px;
            margin-right: 20px;
            cursor: pointer;
        }

        .avatar-wrapper {
            cursor: pointer;
            color: #fff;
            font-size: 14px;
            line-height: 18px;
            background: url("@/assets/images/base/top-user.png") left center no-repeat;
            padding-left: 40px;
            white-space: nowrap;
        }
    }

}
</style>