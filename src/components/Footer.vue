<template>
    <div id="footer">
        <el-divider direction="horizontal" content-position="left"></el-divider>
        <p style="text-align: center">Copyright © 2020-2021 Xenny</p>
        <p style="float: left">版本: v1.0</p>
        <p style="float: right">系统时间: {{ time.toLocaleString() }}</p>
    </div>
</template>

<script lang="ts">import { reactive, toRefs } from "@vue/reactivity";
import { onBeforeUnmount, onMounted} from "vue";

export default {
    setup() {
        const state = reactive({
            time: new Date(),
            timer: undefined as any,
        });

        onMounted(() => {
            state.timer = setInterval(()=>{
                state.time = new Date()
            }, 1000)
        });

        onBeforeUnmount(() => {
            if (state.timer) {
                clearInterval(state.timer);
            }
        });

        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss">
#footer {
    margin-top: 20px;
    margin-bottom: 0;
}
</style>