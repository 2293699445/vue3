export {}

interface Post{
    title:string
    content:string
    subtitle?:string   //?可选
    readonly summary:string   //readonly只读
}

const hello:Post={
    title:'hello TypeScript',
    content: 'A javascript superset',
    summary: 'A javascript'
}
console.log('helloooooooo',hello)

//动态成员用法(不指定具体的成员名称)
interface Cache {
    [prop:string]:string  //不指定具体的键名，但键名与值必须是string类型
}

const cache:Cache = {
    foo:'value1',
    bar:'value2'
}

console.log('foooooooooo',cache.foo)