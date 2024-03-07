<template>
    <div @click="goNewpage"><el-button>goNewPage</el-button></div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router' //useRoute
const router = useRouter()
const goNewpage=()=>{router.push({path:"/newPage"})}
</script>
