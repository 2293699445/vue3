# 1. 对组件的理解/使用组件编程的优势在哪
* 常规编写html页面的缺点
    * 1. 依赖关系混乱，不好维护
    * 2. 代码复用率不高
* 组件编程的优点
    * 1. 依赖关系明确，方便维护
    * 2. 代码复用率高
* 组件的定义
    实现应用中局部功能的代码和资源的集合


# 2. 非单文件组件
* 定义：
    * 1. 非单文件组件：一个文件中包含有n个组件(可以在一个文件中编写很多非单文件组件)
    * 2. 单文件组件：一个文件中只包含有1个组件。

* Vue中使用组件的三大步骤
    * 一、定义组件（创建组件）
        使用Vue.extend(options)创建，其中options和new Vue(options)传入的options几乎一样，但有区别：
        1. el不要写，why？——最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
        2. data必须写成函数，why？——避免组件被复用时，数据存在引用关系

    * 二、注册组件
        1. 局部注册：通过new Vue创建组件时，传入components选项
        2. 全局注册：靠Vue.component('组件名'，组件)

    * 三、使用组件（写组件标签）
        在html结构中使用组件标签 <school></school>


# 3. 组件的注意点
* 事关vue组件命名问题
    * 如果组件是一个单词命名
        * 纯小写
        * 首字母大写（与开发者工具呼应）
    * 如果组件是多个单词命名
        * 纯小写，单词之间用'-'连接,key必须要用''包起来
        * 各单词首字母大写（与开发者工具呼应，注意：必须在脚手架环境中才能这样写）
    * 组件名尽可能避免与DOM元素名冲突
* 关于组件标签：
    * 第一种写法：<school></school>
    * 第二种写法：<school/>(不使用脚手架时，这种写法会导致后续组件不能渲染)

* 简写形式
    const school = Vue.extend(options) 可简写成：const school = options(表面上没有调用extend,实质vue底层已经帮你调用)


# 4. 组件的实质vueComponent
* 是一个构造函数，当我们写了一个school组件时，要想使用它<school></school>，Vue解析会帮我们创建School组件的实例对象。即vue帮我们执行的new VueComponent(options)
```
<script>
//解析这段代码：执行Vue.extend函数(创建组件)就会返回一个独一无二的VueComponent构造函数，该构造函数用school保存(存放创建好的组件)，当调用该组件时，vue就会帮我们执行的new VueComponent(),执行构造函数的结果就是产生一个实例对象。因此可以说组件就是实例对象？
    const school = Vue.extend({
        name:'school',
        template:  `<div></div>`,
        data(){
            return {
                msg:10
            }
        }
    })
</script>
```
# 5.vc和vm的区别？
* new Vue(options)(vm配置)   Vue.extends({options})(组件配置)区别？
    * Vue.extends的options中不能写el指定Vue实例挂载的DOM元素
* 关于this指向：
    1. 组件配置中：
        data函数、methods中的函数、watch中的函数、computed中的函数 它们中的this均是VueComponent实例现象
    2. .new Vue(options)配置中：
        data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是vue实例对象


# 6.一个重要的内置关系(Prototype)
* 每个构造函数都有Prototype属性，每个构造函数的实例对象都有__proto__属性，二者都指向原型对象。
* 一个实例的隐式原型属性永远指向自己缔造者的原型对象 
* 一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype  通过此，可以让组件实例对象vc可以访问到Vue原型上的属性、方法

# 7.单文件组件
* 在不是用脚手架创建的项目中，vscode是不认识以.vue为后缀的文件，需要在该项目中安装插件Vetur.  
* 非单文件的弊病，样式不能跟着组件走


# 8.创建Vue脚手架
* 第一步：全局安装@vue/cli
    ```npm install -g @vue/cli```
* 第二步：切换到你要创建项目的目录，然后使用命令创建项目
    ```vue create xxx```
* 第三步：启动项目
    ```npm run serve```


# 9.分析脚手架结构


# 10.render函数
* 关于不同版本的Vue：
    * Vue.js与vue.runtime.xxx.js的区别：
     1. vue.js是完整版的Vue，包含：核心功能+模板解析器
     2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能，不包含：模板解析器
    * 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数收到的createElemnt函数去指定具体内容。