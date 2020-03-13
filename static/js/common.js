import Vue from 'vue'

// 引入饿了么插件、样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ImagePreview from '../../src/components/common/preview/components/index'

// 引入格式化时间接口
import './FormatDate.js'

// 引用封装的axios文件
import api from './MyAxios.js'

// 引用原生的axios文件
import axios from 'axios'

// 引入首字母拼音处理文件
import PinYinHelper from './PinYinHelper.js'

// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$PinYinHelper = PinYinHelper
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(ImagePreview)
