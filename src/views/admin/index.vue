<template>
    <router-view></router-view>
</template>

<script lang="ts">
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
import Notification from '@/utils/notification'

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const userInfo = store.getters['user/getUserInfo'];

        if (userInfo.level & 65536) {}
        else {
            Notification.error({
                message: "你不是管理员！"
            });
            // router.push({
            //     path: '/'
            // })
        }
    }
}
</script>