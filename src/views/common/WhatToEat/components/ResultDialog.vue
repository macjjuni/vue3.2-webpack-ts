<template>
  <el-dialog v-model="isVisible" title="룰렛 결과!" width="30%" :before-close="closeDialog">
    <span>{{ props.result }} 당첨!!!</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeDialog"> 닫기 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  result: {
    type: String,
    default: '',
  },
  handleClose: {
    type: Function,
    default: () => {
      console.log('')
    },
  },
})
const isVisible = ref(props.visible)

console.log(props.visible)

const closeDialog = () => {
  props.handleClose()
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
