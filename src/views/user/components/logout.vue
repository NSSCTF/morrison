<template>
    
</template>

<script lang="ts">
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import Notification from '@/utils/notification'
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        let ex = new Date();
        ex.setDate(ex.getDate()-1);
        // console.log(userinfo, document)
        document.cookie = `token=; expires=${ex.toUTCString()}; path=/`;
        sessionStorage.removeItem('user_state');
        store.dispatch('user/userLogout');
        Notification.success({
            message: "注销成功！"
        })
        router.push({
            path: "/",
        })

    }
}
</script>