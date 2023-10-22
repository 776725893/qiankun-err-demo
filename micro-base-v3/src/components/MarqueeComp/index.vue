<template>
    <el-popover class="box-item" width="30%" :content="content" placement="bottom">
        <template #reference>
            <div ref="marqueeContainer" class="marquee-container">
                <div ref="marqueeContent" class="marquee-content" :class="{ openScroll: !!animationDuration }"
                    :style="{ animationDuration: animationDuration + 's', '--scrollWidth': `-${scrollWidth}px` }">
                    {{ content }}
                </div>
            </div>
        </template>
    </el-popover>
</template>

<script setup lang='ts'>
import { nextTick } from 'vue';
import { ref, watch, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
defineOptions({
    name: 'marqueeComp',
});
const { width } = useWindowSize()
const props = withDefaults(defineProps<{
    content: string
    speed?: number
}>(), {
    speed: 30
})
// 滚动容器
const marqueeContainer = ref<HTMLDivElement>();
// 滚动内容容器
const marqueeContent = ref<HTMLDivElement>();
// 滚动的总宽度
const scrollWidth = ref(0)
// 滚动动画时长
const animationDuration = ref(0);
onMounted(() => {
    watch(
        [() => props.content, () => props.speed, width],
        () => {
            nextTick(() => {
                const parentWidth = marqueeContainer?.value?.offsetWidth || 0
                const width = marqueeContent?.value?.offsetWidth || 0;
                scrollWidth.value = parentWidth + width
                // 判断是否需要滚动，如果显示内容不多 则不滚动
                animationDuration.value = width <= parentWidth ? 0 : Number((width / props.speed).toFixed(2));
            })
        },
        {
            immediate: true
        }
    );
});
</script>

<style lang='scss' scoped>
.marquee-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 100%;
    min-height: 20px;

    .marquee-content {

        white-space: nowrap;
        display: inline-block;

        &.openScroll {
            position: absolute;
            left: 100%;
            animation: marquee linear infinite;
        }
    }
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(var(--scrollWidth));
    }
}
</style>