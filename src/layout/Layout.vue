<template>
  <el-container class="app-wrap">
    <Aside />
    <el-container>
      <!-- <Header /> -->
      <Main />
      <!-- <Footer /> -->
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Aside from '@/layout/Aside/index.vue'
// import Header from '@/layout/Header/index.vue'
// import Footer from '@/layout/Footer/index.vue'
import Main from '@/layout/Main/index.vue'
// import Emitter from '@/core/eventBus'
</script>

<style scoped>
.app-wrap {
  min-width: 100vw;
  min-height: 100vh;
}

.el-header {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
