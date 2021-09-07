<!--
 * @Author: 庞昭昭
 * @Date: 2021-08-06 15:08:01
 * @LastEditTime: 2021-09-07 15:39:07
 * @LastEditors: 庞昭昭
 * @Description: 
 * @FilePath: \micro-vue\src\views\Home.vue
 * 记得注释
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
