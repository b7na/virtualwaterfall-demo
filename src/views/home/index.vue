<template>
  <div class="camera-container">
    <video ref="videoRef" autoplay playsinline class="video-preview"></video>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <button @click="startCamera" class="control-btn">开启摄像头</button>
    <button @click="stopCamera" class="control-btn">关闭摄像头</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

// 视频流引用
const videoRef = ref<HTMLVideoElement | null>(null)
// 错误信息
const errorMessage = ref<string>('')
// 媒体流对象
let mediaStream: MediaStream | null = null

// 启动摄像头
const startCamera = async () => {
  try {
    // 请求摄像头访问权限
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'  // 前置摄像头，使用'environment'切换后置
      },
      audio: false
    })
    
    mediaStream = stream
    if (videoRef.value) {
      videoRef.value.srcObject = stream
    }
  } catch (error) {
    handleError(error)
  }
}

// 停止摄像头
const stopCamera = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop())
    mediaStream = null
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null
  }
}

// 错误处理
const handleError = (error: unknown) => {
  let message = '摄像头访问失败'
  if (error instanceof DOMException) {
    switch (error.name) {
      case 'NotAllowedError':
        message = '请允许摄像头访问权限'
        break
      case 'NotFoundError':
        message = '未检测到可用摄像头设备'
        break
      case 'NotReadableError':
        message = '摄像头被其他应用占用'
        break
    }
  }
  errorMessage.value = message
}

// 组件卸载前自动关闭摄像头
onBeforeUnmount(() => {
  stopCamera()
})
</script>

<style scoped>
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.video-preview {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #000;
}

.control-btn {
  padding: 0.5rem 1rem;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.control-btn:hover {
  background: #79bbff;
}

.error-message {
  color: #f56c6c;
  padding: 0.5rem;
  background: #fee;
  border-radius: 4px;
}
</style>