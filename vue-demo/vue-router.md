## Vue-router
 
### 1.引入
 引入Vue-router有两种方式:
 第一种是CDN下载至项目中: https://unpkg.com/vue-router/dist/vue-router.js
 ```
 
 ```
 第二种使用npm(或者yarn)安装, 使用模块化的方式, 在js中引入vue-router需要先安装, 可以使用npm或者yarn:
```bash
npm install vue-router
```
### 2.使用
在html中使用script标签引入vue-router:

```html
<!-- 引入 -->
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>

<!-- 使用 -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能,如果使用全局的acript标签则不需要：
```js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！


```
这里有一个使用Vue-router的例子：
```js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Music = () => import('pages/mmPlayer/music');
const PlayList = () => import('pages/mmPlayer/playList/playList');
const Sheetlist = () => import('pages/mmPlayer/sheetlist/sheetlist');

const routes = [
    {
        path: '/',
        redirect: '/music'
    }, {
        path: '/music',
        component: Music,
        redirect: '/music/playlist',
        children: [
            {
                path: '/music/playlist',
                component: PlayList,
                meta: {
                    keepAlive: true
                }
            }, {
                path: '/music/sheetlist',
                component: Sheetlist
            }
        ]
    }
];

export default new Router({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes,
})
```

通过注入路由，我们可以用 this.$router 来访问它，就像在任何组件里用 this.$router 访问当前路由一样。

### 3.动态路由匹配
一个『路径参数』使用冒号`:` 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
```
routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
]
```
### 4.嵌套路由
路由可以嵌套，一个组件内部也可以引用另一个组件。
要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：
```js
const router = new VueRouter({
    routes: [
        {
            path: '/user/:id',
            component: User,
            children: [
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'profile',
                    component: UserProfile
                },{
                    // 当 /user/:id/posts 匹配成功
                    // UserPosts 会被渲染在 User 的 <router-view> 中
                    path: 'posts',
                    component: UserPosts
                }
            ]
        }
    ]
})
```
要注意，以 `/` 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。

*未完待续。*

