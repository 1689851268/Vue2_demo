<!--
 * @Description: 
 * @Author: superman
 * @Date: 2022-03-14 13:58:19
 * @LastEditors: superman
 * @LastEditTime: 2022-04-09 01:22:45
-->

# 账号 & 密码
13700000000    111111





# 项目问题

## less 问题，浏览器不能解析 less
1. 下载 npm 包：`npm i less less-loader@6 -D`
2. 给 style 标签设置 lang 属性，属性值为 less：<style scoped lang="less">


## vue-router
1. Vue2 支持 vue-router3，过高版本会有兼容问题：`npm i vue-router@3`


## 使用 Element 时的抖动问题
- 使用 MessageBox 组件时，每次弹窗出现，页面就会向左抖一下
  其实是弹窗出现后，会多一个 element.style 的样式，我们只需要重置样式即可

``` CSS
body {
    padding-right: 0px !important;
    overflow: hidden;
}
```

- 设置全局样式的方法：
  1. 在 index.html 中设置
  2. 创建 reset.css，在 App.vue 中引入


## 设置二级路由后报错
报错信息：*Failed to mount component: template or render function not defined*
设置组件时，如果需要设置懒加载，应设置成 ：component: () => import("../pages/Center/GroupOrder"),
这是一个箭头函数！！！不是直接通过 import 引入


## CSS 引入报错
报错信息：*Refused to apply style from ‘http://localhost:8080/iconfont.css‘ because its MIME type (‘text/html‘)*
在 reset.css 里面有一句 `@import "./iconfont.css";`，但是并没有这个文件，所以报错 ~





# 总结

## 路由组件 & 非路由组件
- 路由组件一般存放在 pages / views 文件夹，非路由组件一般防止 components 文件夹
- 路由组件一般需要在 router 文件夹中注册；非路由组件在使用的时候，一般都是以标签的形式使用
- 不管什么组件，身上都会有 $route & $router 属性


## $route & $router
- $route 一般用于获取路由信息，eg：路径、query、params...
- $router 一般用于进行编程式导航，eg：push、replace...


## 路由传参
声明式导航 & 编程式导航

- [编程式导航] 的参数传递
1. 传入字符串：`this.$route.push('/search')`


## axios
创建新文件夹 API 放置 axios 操作的文件


## 接口管理
- 如果项目较小：我们可以在组件的生命周期函数中请求数据
- 如果项目较大；我们需要对接口进行统一管理
  具体操作：创建专门的 js 文件，用于请求数据





# nprogress 进度条的使用
1. 下载第三方模块 nprogress：`npm i nprogress`
2. 在 api 请求文件中，引入 nprogress 模块 & 样式文件 nprogress.css
   start - 进度条开始、、done - 进度条结束
3. 在请求拦截器中设置 `nprogress.start()`
4. 在响应拦截器中设置 `nprogress.done()`
- 我们可以修改 nprogress.css 来修改进度条的样式





# 防抖 & 节流

## 防抖
- 防抖 demo：反复点击请求数据，只有最后一次点击是有效的
- 防抖思想：前面的所有触发都会被取消，最后一次触发后，要过指定时间才会有效（最后只执行了一次）

lodash 插件，可用于设置防抖（）
- lodash 对外暴露为 _
- _.debounce(fun, time) 可用于设置防抖效果
  fun 防抖的函数、、time 防抖的时间


## 节流
- 节流 demo：反复点击送花，具有一定时间间隔的点击才有效
- 节流思想：在规定时间内，不会重复触发回调，只有大于这个时间间隔才会触发回调（可以执行很多次）

lodash 插件，也可用于设置节流
- _.throttle(fun, time) 可用于设置节流效果
  fun 节流的函数、、time 节流的时间





# 卡顿现象
三级联动：如果使用声明式导航 router-link，可以实现路由的跳转 并传递参数；
但是，会出现卡顿现象！！！

router-link 是一个组件，当服务器返回数据之后，循环出很多 router-link 组件
快速创建多个组件实例，是一件很耗内存的事情，因此会出现卡顿的情况

所以，三级联动这里，需要使用 **编程式导航**

但是呢，如果给每个标题都绑定事件，还是会造成较大的销号
此时，我们可以通过 **事件委托** 减少事件的绑定





# 过渡动画
- 前提：[组件] / [元素] 要有 `v-if` / `v-show` 指令才可以有过渡动画
  动画组件需要被 transition 标签包裹





# 减少请求次数
因为 TypeNav 在 Home & Search 页面中都用到，每次切换页面时，都需要销毁并重新请求
所以，可以将 TypeNav 的请求放到 App.vue 中，使其只需请求一次（避免重复请求）

∴ 我们可以将经常使用到的数据，放在 App.vue 中请求，可以优化性能

为什么不放入口文件呢？
因为，进了组件才有 this (指向当前组件实例)，入口文件的 this == undefined





# mock 数据
mock 数据，是一些模拟数据，不会真的发送请求到服务器

1. 下载 mockjs：`npm i mockjs`
2. 在 src 文件夹中创建 mock 文件夹
3. 准备 JSON 数据
4. 把 mock 数据需要的图片放置到 public 文件夹下
   public 文件夹在打包的时候，会把资源原封不动的打包到 dist 文件夹中
5. 通过 mockjs 实现虚拟数据的使用
   创建 mockServe.js 配置模拟数据
6. 在入口文件 main.js 中，引入 mockServe.js（至少得让这个文件执行一次）





# swiper
1. 下载 swiper：`npm i swiper@5` // 这里用的是 5 版本
2. 引入依赖包：`import Swiper from "swiper"`
3. 引入 swiper 样式：`import "swiper/css/swiper.css"`
   如果 swiper 组件在多个地方使用，可以在入口文件 main.js 中引入
4. 按照官方文档使用即可

在 Vue 中，可以通过 watch + $nextTick 保证请求被成功响应、且 HTML 结构渲染完成之后，再创建 Swiper 实例





# Search 页面
1. 写静态页面
2. 发请求，获取数据
3. 将数据存储到 Vuex
4. 获取 Vuex 中的数据，动态展示数据





# 滚动行为

## Vue 的滚动行为
- 跳转到新路由时滚动
在创建 VueRouter 时设置 scrollBehavior 方法
```js
// 滚动行为
scrollBehavior(to, from, savedPosition) {
    // y:0 表示滚动条在最上方
    // behavior:'smooth' 可以让它变得更流畅
    return { y: 0, behavior: 'smooth' }
}
```


## JS 的滚动行为
1. scrollTo
``` js
element.scrollTo(0, 0);

window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
});
```

2. 


# 游客用户 id
1. 使用 uuid 插件，生成唯一的 id 值
2. 进入商品详情页时，将 id 值存储到 localStorage 中
3. 发送 axios 时，添加请求拦截器，在拦截器中存储 id 到请求头中





# token 令牌
1. 注册：通过数据库存储用户信息
2. 登陆：登陆成功时，后台为了区分用户，服务器会下发 token(令牌)，为用户的唯一标识
   一般登陆成功，服务器会下发 token，浏览器[持续化存储] token，带着 token 找服务器要用户信息
   Vuex 仓库对数据的存储，不是持久化的，刷新后数据就会被清空





# 导航守卫
现象：用户已登录的话，不能再进入登陆页面
