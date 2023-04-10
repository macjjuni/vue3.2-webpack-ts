<template>
  <div class="roulette-wrap">
    <div class="pin" />
    <canvas ref="canvasRef" class="canvas" width="500" height="500" />
    <el-button class="roulette-btn" circle @click="gameStart"> Start </el-button>
    <ResultDialog :visible="visibleDialog" :handle-close="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import ResultDialog from './ResultDialog.vue'

const canvasRef = ref<HTMLCanvasElement>()
const isING = ref<boolean>(false)
const visibleDialog = ref<boolean>(false)
const resultText = ref<string>('')
const product = ['떡볶이', '돈가스', '초밥', '피자', '냉면', '치킨', '족발', '피자', '삼겹살']
const colors = ['#dc0936', '#e6471d', '#f7a416', '#efe61f ', '#60b236', '#209b6c', '#169ed8', '#3f297e', '#87207b', '#be107f', '#e7167b']

const newMake = (ctx: CanvasRenderingContext2D) => {
  if (canvasRef.value === undefined) return
  const [cw, ch] = [canvasRef.value.width / 2, canvasRef.value.height / 2]
  const arc = Math.PI / (product.length / 2)

  // 룰렛 배경 그리기
  for (let i = 0; i < product.length; i++) {
    ctx.beginPath()
    ctx.fillStyle = colors[i % (colors.length - 1)]
    ctx.moveTo(cw, ch)
    ctx.arc(cw, ch, cw, arc * (i - 1), arc * i)
    ctx.fill()
    ctx.closePath()
  }
  ctx.fillStyle = '#fff'
  ctx.font = '18px Pretendard'
  ctx.textAlign = 'center'
  for (let i = 0; i < product.length; i++) {
    const angle = arc * i + arc / 2
    ctx.save()
    ctx.translate(cw + Math.cos(angle) * (cw - 50), ch + Math.sin(angle) * (ch - 50))
    ctx.rotate(angle + Math.PI / 2)
    product[i].split(' ').forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j)
    })
    ctx.restore()
  }
}

const gameStart = (e: MouseEvent) => {
  if (canvasRef.value === undefined || isING.value === true) return
  isING.value = true
  canvasRef.value.style.transform = `initial`
  canvasRef.value.style.transition = `initial`
  setTimeout(() => {
    if (canvasRef.value === undefined) return
    const ran = Math.floor(Math.random() * product.length)
    const arc = 360 / product.length
    const rotate = ran * arc + 3600 + arc * 3 - arc / 4
    canvasRef.value.style.transform = `rotate(-${rotate}deg)`
    canvasRef.value.style.transition = `3s`
    setTimeout(() => {
      resultText.value = product[ran]
      isING.value = false
      visibleDialog.value = true
    }, 3000)
  }, 1)
}

const handleClose = () => {
  visibleDialog.value = false
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d')
  if (ctx !== undefined && ctx !== null) newMake(ctx)
})
</script>

<style scoped lang="scss">
.roulette-wrap {
  position: relative;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & > .pin {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 30px;
    background: #000;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 1000;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -7px;
      width: 0;
      height: 0;
      transform: rotate(-30deg);
      border-bottom: 18px solid transparent;
      border-top: 18px solid transparent;
      border-left: 32px solid #000;
      border-right: 32px solid transparent;
    }
  }
}

.canvas {
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
.roulette-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 130px;
  height: 130px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  background: #8f43ee;
  border: 7px solid #fff;
  z-index: 9999;
  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
  &:active {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
