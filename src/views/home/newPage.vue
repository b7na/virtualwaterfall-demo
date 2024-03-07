<template>
    <div @click="backIndex"><el-button >backIndex</el-button></div>
</template>
<script setup lang="ts">
import { useRouter  } from 'vue-router' //useRoute
const router = useRouter()
const backIndex=()=>{router.back()}
</script>