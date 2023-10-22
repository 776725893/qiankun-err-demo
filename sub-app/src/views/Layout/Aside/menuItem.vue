<template>
    <div class="jumpTitle" @click="handleClick(path)" :class="{ select: route.path === path }">{{ title }}</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
defineOptions({
    name: 'menuItem',
});
defineProps({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})
const emits = defineEmits(['close'])
const router = useRouter()
const route = useRoute()
const handleClick = (path) => {
    emits('close')
    router.push(path).catch(() => { })
}
</script>

<style lang='scss' scoped>
.jumpTitle {
    cursor: pointer;
    color: #666666;
    font-size: 12px;
    font-weight: 500;
    height: 39px;
    line-height: 39px;
    padding: 0 5px;

    &:hover,
    &.select {
        background-color: #F2F4FF;
        color: var(--jtlj-color-primary);
        border-radius: 8px;
    }
}
</style>
