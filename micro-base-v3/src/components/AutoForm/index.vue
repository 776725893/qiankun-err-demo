<template>
  <el-form ref="formRef" class="form-container" :model="formData" :inline="true" :label-width="labelWidth"
    :class="{ hideMore: !showMore }">
    <el-row>
      <el-col v-for="item in searchItems" :key="item.name" :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-form-item :label="item.name" :prop="item.filed" class="auto-resize-item">
          <!-- 下拉框 -->
          <ElSelect v-if="item.type === 'select'" v-model="formData[item.filed]" v-bind="item.option"
            v-on="item.listeners">
            <el-option v-if="item.type === 'select'" v-for="option in item.data || []"
              :key="option[item?.prop?.value || 'value']" :label="option[item?.prop?.label || 'label']"
              :value="option[item?.prop?.value || 'value']"></el-option>
          </ElSelect>
          <!-- 输入框、日期选择器、开关 -->
          <component v-else-if="item.type" :is="{
          input: ElInput,
          date: ElDatePicker,
          switch: ElSwitch
         }[item.type]" v-model="formData[item.filed]" v-bind="item.option" v-on="item.listeners">
          </component>
          <!-- slot -->
          <template v-else-if="item.slot">
            <slot :name="item.slot" :data="formData" :filed="item.filed"> </slot>
          </template>
        </el-form-item>
      </el-col>
      <el-form-item label=" ">
        <slot name="btn" :search="throttleSearch" :reset="throttleReset" :toggleShowMore="toggleShowMore"
          :showMore="showMore" :isShow="isShow">
          <el-button @click="throttleSearch" type="primary">{{ searchText }}</el-button>
          <el-button @click="throttleReset">{{ resetText }}</el-button>
          <el-button @click="toggleShowMore" v-show="isShow">
            <span>{{ showMore ? "收起" : "展开" }}</span>
            <el-icon>
              <component :is="showMore?DoubleUp:DoubleDown" />
            </el-icon>
          </el-button>
        </slot>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script  setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { IProps, ItemOption } from './type'
import { useThrottleFn } from '@vueuse/core'
import type { FormInstance } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { DoubleDown, DoubleUp } from '@icon-park/vue-next'
import { ElInput, ElSelect, ElDatePicker, ElSwitch } from 'element-plus';

const { width } = useWindowSize()
defineOptions({
  name: 'AutoFormComp',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<IProps>(), {
  throttleTime: 500,
  labelWidth: '100px',
  searchText: '查询',
  resetText: '重置'
})

// 代理的form数据
const formData = computed(() => props.data)
// 监听的emit
const emits = defineEmits(['reset', 'search'])


// 遍历items项 添加默认值/默认函数
const searchItems = computed<ItemOption[]>(() => {
  return props.items.map(v => {
    const item = { option: {}, listeners: {}, ...v }
    // 输入框
    if (item.type === 'input') {
      // 输入input格式化
      if (!item.listeners.input && item.itemType) {
        if (item.itemType === 'number') {
          item.listeners.input = () => {
            formData.value[item.filed] = formData.value[item.filed].replace(/^\D*(\d*(?:\.\d{0,5})?).*$/g, '$1')
          }
        }
      } else if (!item.listeners.blur) {
        // 输入框默认失焦去除空格
        item.listeners.blur = () => {
          formData.value[item.filed] = String(formData.value[item.filed]).trim()
        }
      }
      item.option.clearable = item.option.clearable ?? true
    } else if (item.type === 'select') {
      // 下拉框
      item.option.clearable = item.option.clearable ?? true
      item.prop = item.prop ?? { label: 'label', value: 'value' }
    } else if (item.type === 'date') {
      // 日期选择器
      item.option.valueFormat = item.option.valueFormat ?? 'YYYY-MM-DD'
    }
    return item
  })
})

const formRef = ref<FormInstance>()

// 节流的重置方法
const reset = function () {
  formRef.value?.resetFields();
  emits('reset', formData)
}
const throttleReset = useThrottleFn(reset, props.throttleTime)

// 节流的搜索方法
const throttleSearch = useThrottleFn(function () {
  emits('search', formData)
}, props.throttleTime)



// 是否显示更多
const showMore = ref(false)
// 切换更多
const toggleShowMore = () => {
  showMore.value = !showMore.value;
}


// 展开/收起按钮是否显示
const isShow = ref(false)
watch([width, () => props.items.length], ([width, num]) => {
  if (width <= 767 && num > 2) {
    isShow.value = true;
  } else if (width <= 991 && num > 2) {
    isShow.value = true;
  } else if (width <= 1199 && num > 4) {
    isShow.value = true;
  } else if (width <= 1919 && num > 6) {
    isShow.value = true;
  } else if (num > 8) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
}, {
  immediate: true
})

defineExpose({
  reset
})
</script>

<style lang="scss" scoped>
.form-container {
  min-width: 500px;
}

.auto-resize-item {
  display: flex;

  :deep(.jtlj-form-item__content) {
    flex: 1;
  }

  :deep(.jtlj-form-item__content .jtlj-select),
  :deep(.jtlj-form-item__content .jtlj-range-editor.jtlj-input__inner),
  :deep(.jtlj-form-item__content .jtlj-input__wrapper),
  :deep(.jtlj-form-item__content .jtlj-date-editor) {
    width: 100%;
  }
}

@media only screen and (min-width: 1920px) {
  .hideMore {
    .jtlj-col-xl-6:nth-child(n + 9):not(.btn-group) {
      display: none;
    }
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1919px) {
  .hideMore {
    .jtlj-col-lg-8:nth-child(n + 7):not(.btn-group) {
      display: none;
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .hideMore {
    .jtlj-col-md-12:nth-child(n + 5):not(.btn-group) {
      display: none;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .hideMore {
    .jtlj-col-sm-24:nth-child(n + 3):not(.btn-group) {
      display: none;
    }
  }
}

@media only screen and (max-width: 767px) {
  .hideMore {
    .jtlj-col-xs-24:nth-child(n + 3):not(.btn-group) {
      display: none;
    }
  }
}
</style>