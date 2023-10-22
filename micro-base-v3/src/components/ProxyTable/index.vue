<template>
    <el-table :data="showArr" style="width: 100%" v-loading="loading || isLoading">
        <template v-for="item, index in columns" :key="index">
            <!-- 复选框和序号 -->
            <el-table-column v-if="item.type && item.type !== 'expand'" :type="item.type" :width="item.width ?? 60"
                :fixed="item.fixed" :align="item.align" />
            <!-- 扩展 -->
            <el-table-column v-else-if="item.type" type="expand" :width="item.width ?? 60" :fixed="item.fixed"
                :align="item.align" />
            <!-- 完整slot -->
            <slot v-else-if="item.completeSlot" :name="item.slotName"></slot>
            <!-- slot和callback -->
            <el-table-column v-else-if="'slotName' in item || item.callback" :align="item.align" :label="item.label"
                :width="item.width" :fixed="item.fixed" :show-overflow-tooltip="item.tooltip ?? true">
                <template #default="scope">
                    <slot v-if="item.callback">
                        {{ item.callback(scope.row) }}
                    </slot>
                    <slot v-else :name="item.slotName" :data="scope.row" :index="scope.$index" :length="showArr?.length">
                    </slot>
                </template>
            </el-table-column>
            <!-- 普通 -->
            <el-table-column v-else-if="!item.slotName" :align="item.align" :prop="item.prop" :label="item.label"
                :width="item.width" :fixed="item.fixed" :show-overflow-tooltip="item.tooltip ?? true"></el-table-column>
        </template>
    </el-table>
    <el-pagination class="proxy-pagination" :disabled="loading || isLoading" v-if="pagination" background
        v-model:current-page="currentPage" :page-sizes="[10, 20, 30, 50]" v-model:page-size="pageSize"
        layout="sizes, total, ->, prev, pager, next, jumper" next-text=">" prev-text="<" :total="total"
        @size-change="refresh()" @current-change="refresh()" />
</template>

<script setup lang='ts'>
import { computed, ref, onBeforeMount } from 'vue';
import { IProps } from './type'
defineOptions({
    name: 'TableComp',
});

const props = withDefaults(defineProps<IProps>(), {
    loading: false,
    pagination: false,
    defaultPageNo: 1,
    defaultPageSize: 20
})

const isLoading = ref(false)

// 数据代理的数据
const proxyData = ref<any[]>([])
// 分页数据
const currentPage = ref<number>(props.defaultPageNo)
const pageSize = ref<number>(props.defaultPageSize)
const total = ref(0)
// 刷新数据
const refresh = (first = false) => {
    if (!props.getData) return
    if (first) currentPage.value = 1;
    isLoading.value = true
    props.getData({
        pageNum: currentPage.value,
        pageSize: pageSize.value
    }).then((res) => {
        proxyData.value = res.data ?? []
        total.value = res.total ?? 0
    }).finally(() => {
        isLoading.value = false
    })
}


// 表格显示的数据
const showArr = computed(() => props.getData ? proxyData.value : props.data)

onBeforeMount(() => {
    props.getData && refresh()
})

defineExpose({
    refresh
})
</script>

<style lang='scss' scoped>
.proxy-pagination {
    margin-top: 20px;
}
</style>