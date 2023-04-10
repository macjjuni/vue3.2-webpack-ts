<template>
  <el-aside :width="isToggle ? asideWidth.min : asideWidth.max">
    <nav class="nav-wrap">
      <div class="top-wrap">
        <el-button icon="Close" circle :class="isToggle ? 'icon-rotate' : ''" @click="asideToggle" />
      </div>
      <ul>
        <li v-for="item in routes" :key="item.path">
          <router-link :to="item.path" :class="isToggle ? 'trans' : ''">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import common from '@/router/modules/common'

const isToggle = ref<boolean>(false)
const asideWidth = {
  min: '56px',
  max: '280px',
}

const asideToggle = () => {
  isToggle.value = !isToggle.value
}
interface IArr {
  path: string
  name: string
}

const routes: IArr[] = common[0].children.map((route) => {
  return {
    path: route.path,
    name: route.name,
  }
})
</script>

<style scoped lang="scss">
.el-aside {
  padding-top: 80px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  color: #fff;
  transition: width 0.3s ease;
}
.nav-wrap {
  width: 100%;
  overflow: hidden;

  .top-wrap {
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
  }

  & ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > li {
      position: relative;
      padding-left: 32px;
      font-size: 32px;

      &:hover > a::after {
        width: calc(100% - 64px);
      }
      &:hover > a {
        opacity: 1;
      }

      & > a {
        color: #000;
        font-weight: bold;
        opacity: 0.7;
        transition: 0.24s ease;
        white-space: nowrap;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 32px;
          width: 0;
          height: 4px;
          background: #000;
          transition: 0.4s ease;
        }
      }
    }
  }
}
.icon-rotate {
  transform: rotate(45deg);
}
.trans {
  opacity: 0 !important;
}
</style>
