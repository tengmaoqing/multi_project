# 回收宝2C #
## 环境
#### 开发环境
本地 127.0.0.1
#### 测试环境
ka.huishoubao.com   118.89.43.123
打包制定项目后部署到测试环境 /data/webroot/ka.huishoubao.com
新项目还需要配置 nignx， 以测试机为例 /etc/ningx/etc/nginx/nginx.conf.d 找到对应于名配置参考其他项目进行配置即可
ka.huishoubao.com/projectname 可以访问

## 运行指令
#### 相关参数
  --projectname 项目名称对应于projects目录下的目录名
#### 开发
```bash
node build/dev-server.js --projectname XX
```
#### 生产
```bash
node build/build.js --projectname XX
```

## src目录介绍
  - apis // 接口
  - components // 公共组件 button， input
  - core // 核心业务组件
  - helper //通用方法
  - projects // 项目
    - hbdx // 项目名 对应 --projectname
      - components // 项目组件，router组件
      - locales // i18n 语言包
      - config // 项目配置文件
      - cssvar // css 变量
        - config.css // 自定义的CSS变量， 复制自全局css变量
      - router // router
      - store // Vuex
      - App.vue // 入口Vue文件
      - entry-client.js // 客户端入口文件
      - entry-server.js //服务端入口文件
      - project.conf.js // 项目的相关webpack配置
      - recover.css // 覆盖全局的css
    - nby
  - rootcss
    - base // 通用CSS
    - config.css // 全局CSS配置文件
  - system //系统文件

#### <a name=pro>project.conf.js 介绍</a>
该文件属于webpack 配置选项。 因为每个项目可能有不同的配置需求，如 publicPath 等。

#### config.css
该文件是CSS变量。 rootcss下是默认的， 优先读取项目内的 cssvar/config.css 文件。
使用时只需要 @import 'config.css'；
目前主要用到的变量有
```sass
$global-spacer-sm: 10px;
$global-spacer-md: 15px;

$global-slogan-fontsize: responsive 24px 48px;
$global-bprice-fontsize: responsive 18px 36px;
$global-body-fontsize: 14px;

$global-primary-color: #fabe00;
$global-link-color: #34495e;
$global-muted-color: #999;
$global-danger-color: #C23838;
$global-gray: #f4f4f4;

@custom-media --sm-viewport (max-width: 979PX);
```

## vue page 组件编写
page组件指的是router中对应的组件。
page组件通用写法。
```javascript
{
  // 通过VUEX获取页面数据的
  asyncData ({ store, route }) {
    return store.dispatch('evaluate/getEvInfo', route.params.evID);
  },
  // 动态注册VUEX模块
  registerModule (store, preserveState) {
    store.registerModule('evaluate', evStore, { preserveState });
  },
  // 页面销毁时，同时销毁页面数据
  destroyed () {
    this.$store.unregisterModule('evaluate');
  }
}
```
可以通过查看 entry-client.js 来查看更具体的缘由
