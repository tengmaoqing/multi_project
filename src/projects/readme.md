# PROJECTS 目录介绍 #
projects 下每一个文件代表一个项目。 如 nby、fql

### components
组件，页面。 一般以core里面的组件为基础，在此基础上做优化。里面的内容应该尽量少，轻量。

### locales
语言包， 继承于 system/locales下的默认语言包， 较通用的翻译应该放到 system中

### config
按PID的配置文件。 继承于 src/config/pid.config.js 。目的在于同一个项目不同PID有少量区别时的配置文件， 如 loginType ， platform， 主题，关键文案等。

### cssvar
CSS 变量文件。 继承于 rootcss/config.css 和默认有冲突的覆盖即可

### router
路由文件。 每个路由应该有名字， 跳转的时候通过name跳转， 可以使得路由更灵活。 在 system里面有统一处理

### store
vuex文件。 从 system里面引入通用文件，再进行个性化加工

### project.conf.js
webpack 按项目个性化配置。 基于 src/config/webpack.config.js
