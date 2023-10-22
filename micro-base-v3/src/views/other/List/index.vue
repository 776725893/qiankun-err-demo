<template>
  <div>
    <el-card shadow="never">
      <AutoForm :data="searchParams" :items="searchItems" @search="search" @reset="search" />
    </el-card>
    <el-card shadow="never">
      <ProxyTable ref="table" :getData="getData" :columns="col" :pagination="true">
        <template #address="{ data }">
          {{ data }}
        </template>
        <template #completeSlot>
          <el-table-column>
            <template #header>
              completeSlot
            </template>
            <template #default="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
        </template>
      </ProxyTable>
    </el-card>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import AutoForm from '@/components/AutoForm/index.vue'
import { ItemOption } from '@/components/AutoForm/type'
import ProxyTable from '@/components/ProxyTable/index.vue'
import { IColumn } from '@/components/ProxyTable/type'
import { reactive, ref } from 'vue';
import { ElMessage } from "element-plus";
defineOptions({
  name: 'listView',
});
const table = ref()
const dialogVisible = ref(false)

// 搜索表单数据
const searchParams = reactive({
  name: '',
  date: '',
  enabled: true,
  type: ''
})

// 搜索回调
const search = () => {
  ElMessage.success('搜索回调')
  table.value?.refresh(true)
}

// 下拉框数据
const selectArr = ref<any[]>([])

// 下拉框配置items
const searchItems = reactive<ItemOption[]>([{
  filed: 'name',
  name: '名称',
  type: 'input',
}, {
  filed: 'date',
  name: '当前日期',
  type: 'date',
}, {
  filed: 'enabled',
  name: '是否过滤禁用',
  type: 'switch'
}, {
  filed: 'type',
  name: '类型',
  type: 'select',
  data: selectArr
}])

// 模拟获取下拉框数据
setTimeout(() => {
  selectArr.value = [{
    label: '全部',
    value: ''
  }, {
    label: '类型1',
    value: '1'
  }, {
    label: '类型2',
    value: '2'
  }]
}, 1000)


// 表格col
const col: IColumn[] = [{
  type: 'index'
}, {
  type: 'selection'
}, {
  label: '名称',
  prop: 'name',
  width: '100',
}, {
  label: 'JSON',
  slotName: 'address',
}, {
  label: '生日',
  callback(data: any) {
    return '2023-1-1'
  },
  width: 100
}, {
  completeSlot: true,
  slotName: 'completeSlot'
}]

// 模拟表格数据
const tableData = ref<any[]>(new Array(20).fill('').map((v, i) => {
  return {
    index: i,
    name: 'celcelcelcelcelcelcelcelcelcel' + i
  }
}))

const getData = () => {
  return new Promise<{ total?: number, data: any[] }>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        total: 40,
        data: tableData.value
      })
    }, 1000)
  })
}

</script>

<style lang='scss' scoped></style>