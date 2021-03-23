<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  background: url('~@/assets/image/logo.png') center center no-repeat;
  background-size: 100px auto;
}
</style>