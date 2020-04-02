export const localMixins = {
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        }
    },
    //局部注册的自定义指令
    directives: {
        focus: {
            // 指令的定义
            bind: function (el) {
                console.log('bind')
                //el.innerHTML = 'bind'
            },
            inserted: function (el, binding, vnode) {
                console.log('inserted')
                //console.log(el)
                console.log(binding.value)
                //console.log(vnode)
                el.focus()
            },
            update: function (el) {
                console.log('update')
            },
            componentUpdated: function (el) {
                console.log('componentUpdated')
            },
            unbind: function (el) {
                console.log('unbind')
            }
        }
    }
}
