let Title = {
    install: function(Vue: any) {
        Vue.directive('nss-title', {
            mounted(el: any, blinding: any) {
                document.title = 'NSSCTF - ' + blinding.value;
            },
            updated(el: any, blinding: any) {
                document.title = 'NSSCTF - ' + blinding.value;
            },
        })
    }
}

export default Title;