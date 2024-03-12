<template>
    <ul class="news-list">
        <li>编号：{{id}}</li>
        <li>标题：{{title}}</li>
        <li>内容：{{content}}</li>
    </ul>
</template>

<script lang="ts" setup name="route">
    import {useRoute} from 'vue-router'
    import{toRefs} from 'vue'
    let route= useRoute()   //拿前端的路由
    console.log(route)
    // let {query}=toRefs(router)
    defineProps(['id','title','content'])
</script>

<style scoped>
    .news-list{
        list-style: none;
        padding-left:20px
    }
    .news-list>li{
        line-height:30px;
    }
</style>