let Focus = {
    install: function(Vue: any) {
        Vue.directive('focus', {
            mounted(el: any) {
                el.focus();
            },
            updated(el: any) {
                el.focus();
            },
            inserted(el: any) {
                el.focus();
            }
        })
    }
}

export default Focus;