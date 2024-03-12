<template>
    <div class="about">
        <h2>大家好，欢迎来到吉首大学官网！</h2>
    </div>
</template>

<script lang="ts" setup name="Home">
    import { onMounted,onUnmounted } from 'vue'

    onMounted(()=>{
        console.log("about挂载了")
    })

    onUnmounted(()=>{
        console.log("about卸载了")
    })

</script>

<style>
.about{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: rgb(85,84,84);
    font-size: 18px;
}
</style>