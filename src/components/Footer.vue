<template>
    <div id="footer">
        <el-divider direction="horizontal" content-position="left"></el-divider>
        <p style="text-align: center">Copyright © 2020-2021 Xenny</p>            <p style="float: left">版本: v1.0</p>
        <p style="float: right">系统时间: {{ time.toLocaleString() }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: new Date()
        }
    },
    created: function() {
        // setInterval(function(){this.time =  new Data()}, 1000)
    },
    mounted: function() {
        const _this = this;
        this.timer = setInterval(function() {
            _this.time = new Date();
        }, 1000)
    },
    beforeDestroy: function() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
}
</script>

<style lang="scss">
#footer {
    margin-top: 20px;
    margin-bottom: 0;
}
</style>