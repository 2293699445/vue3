// const foo:object = function(){}
// const fo:object = []
// const f:object = {}
// const ff:{foo:number,str:string} = {foo:100,str:'sg'}


// 枚举测试
const enum PostStatus{
    Draft = 7,
    Unpublished =3,
    Published
}
// enum PostStatus{
//     Draft = 'Draft',
//     Unpublished = 'Unpublished',
//     Published = 'Published'
// }

const post = {
    title:"Hello TypeScript",
    content:'TypeScript is a typed superset of JavaScript',
    status:PostStatus.Published
}

console.log(post.status)

let num = 100
