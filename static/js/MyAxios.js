// 配置API接口地址

import { pattern, axiosUrl } from "@/store/constant/clouldConfig"

var root = ""

// 引用axios
var axios = require("axios")
// 自定义判断元素类型JS
function toType(obj) {
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === "string") {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === "object") {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === "array") {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

function getRoot(root, url) {
    if (!window.config_) {
        return
    }
    const resetRoot = function(root, url) {
        if (url.includes("Monitor-Graph")) {
            return window.config_.axiosUrl["Monitor-Graph"]
        } else if (url.includes("collsvr")) {
            return window.config_.axiosUrl.collsvr
        }
        return root
    }
    const _root = resetRoot(root, url)
    return _root
}

function apiAxios(method, url, params, success, failure) {
    root = axiosUrl[pattern] ? axiosUrl[pattern](root, url) : getRoot(root, url)
    if (params) {
        params = filterNull(params)
    }
    axios({
        method: method,
        url: url,
        data: method === "POST" || method === "PUT" ? params : null,
        params: method === "GET" || method === "DELETE" ? params : null,
        baseURL: root,
        withCredentials: false
    })
        .then(function(res) {
            if (res.data != null && res.data.resultCode === "100") {
                // success(res.data)
            } else {
                if (failure) {
                    failure(res.data)
                } else {
                    window.alert("错误: " + JSON.stringify(res.data.resultMsg))
                }
            }
            if (success) {
                success(res.data)
            }
        })
        .catch(function(err) {
            if (err) {
                if (failure) {
                    failure(err.response)
                } else {
                    console.log(err.response)
                }
            }
        })
}

// 返回在vue模板中的调用接口
export default {
    get: function(url, params, success, failure) {
        return apiAxios("GET", url, params, success, failure)
    },
    post: function(url, params, success, failure) {
        return apiAxios("POST", url, params, success, failure)
    },
    put: function(url, params, success, failure) {
        return apiAxios("PUT", url, params, success, failure)
    },
    delete: function(url, params, success, failure) {
        return apiAxios("DELETE", url, params, success, failure)
    },
    postFile: function(url, params, config, success, failure) {
        return apiAxios("POST", url, params, config, success, failure)
    }
}
