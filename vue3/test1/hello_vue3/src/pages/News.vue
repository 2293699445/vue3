<template>
    <div class="news">
        <!-- 导航区 -->
       <ul>
            <li v-for="article in newsList" :key="article.id">
                <!-- <RouterLink :to="`/news/detail?id=${article.id}&title=${article.title}&content=${article.content}`">{{article.title}}</RouterLink> -->
                <!-- <RouterLink :to="{
                    path:'/news/detail',
                    query:{
                        id:article.id,
                        title:article.title,
                        content:article.content
                    }
                }">
                {{article.title}}
                </RouterLink> -->
                <!-- <RouterLink :to="`/news/detail/${article.id}/${article.title}${article.content}`">{{article.title}}</RouterLink> -->
                <RouterLink :to="{
                    name:'xiang',
                    query:{
                        id:article.id,
                        title:article.title,
                        content:article.content
                    }
                }">
                {{article.title}}
                </RouterLink>
            </li>  
       </ul>
       <!-- 展示区 -->
       <div class="new-content">
            <RouterView></RouterView>
       </div>
    </div>
</template>

<script lang="ts" setup name="Home">
    import {reactive} from 'vue'
    import {RouterView,RouterLink} from 'vue-router'

    const newsList = reactive([
    {id:'asfdtrfay01',title:'很好的抗癌食物',content:'西兰花'},
    {id:'asfdtrfay02',title:'如何一夜暴富',content:'学IT'},
    {id:'asfdtrfay03',title:'震惊，万万没想到',content:'明天是周一'},
    {id:'asfdtrfay04',title:'好消息！好消息！',content:'快过年了'},
    ])
</script>

<style>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.news {
    padding:0 20px;
    display:flex;
    justify-self: space-between;
    height: 100%;
}
.news ul {
    margin-top: 30px;
    list-style:none;
    padding-left:10px
}
.news li>a {
    font-size: 18px;
    line-height: 40px;
    text-decoration: none;
    color: #64967e;
    text-shadow: 0 0 1px rgb(0,84,0);
}

.new-content{
    width:70%;
    height: 90%;
    border:1px solid;
    mask-type: 20px;
    border-radius: 10px;
}
</style>