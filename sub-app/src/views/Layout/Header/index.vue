<template>
    <el-header class="main-header">
        <!-- logo -->
        <!-- <img class="logo-img" src="@/assets/images/base/logo-md-system.png" @click="toHome" /> -->
        <!-- 右侧 -->
        <div class="right-box">
            <!-- 主题 -->
            <ThemeChange />
            <!-- 用户信息和操作 -->
            <el-dropdown v-show="userStore?.name" class="avatar-container right-menu-item hover-effect" trigger="click"
                @command="handleCommand">
                <div class="avatar-wrapper user_center">
                    <svg-icon name="top_user_avatar" class="top_user_avatar"
                        style="height: 31px;width: 31px;color: var(--jtlj-color-primary);"></svg-icon>
                    <div class="name">
                        {{ userStore?.companyName }}
                    </div>
                    <div class="department" style="text-align: right;">
                        {{ userStore?.positionName }} : {{ userStore?.name }}
                        <down theme="outline" />
                    </div>
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="userDropdown">
                        <el-dropdown-item command="logout" divided>
                            <img class="dropdown-img" src="@/assets/images/base/icons-quit.png" alt="">
                            <span>退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import { Down } from '@icon-park/vue-next'
import { ElMessageBox } from 'element-plus'
import store from '~/store';
import useRouter from '~/hooks/useRouter';
import ThemeChange from './Theme/index.vue';
defineOptions({
    name: 'HeaderView',
});
const { toHome } = useRouter()
const { userStore } = store

// 用户下拉菜单点击事件
function handleCommand(command) {
    if (command === 'logout') {
        ElMessageBox.confirm('确定注销并退出系统吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            userStore.logout()
        })
    }
}
</script>

<style lang='scss' scoped>
.main-header {
    @include fx-bt;
    height: 60px;
    background: var(--jtlj-color-primary);
    color: white;
    min-width: 1000px;

    .logo-img {
        height: 37px;
        cursor: pointer;
    }

    .right-box {
        @include fx-center;

        .avatar-wrapper {
            position: relative;
            cursor: pointer;
            color: #fff;
            font-size: 14px;
            line-height: 18px;
            padding-left: 40px;
            white-space: nowrap;

            .top_user_avatar {
                position: absolute;
                left: 0;
                top: 3px;
            }
        }
    }

}

.dropdown-img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.userDropdown {
    width: 200px;

    :deep(.jtlj-dropdown-menu__item) {
        padding: 10px 16px;
    }
}
</style>