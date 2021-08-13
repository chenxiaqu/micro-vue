<!--
 * @Author: 庞昭昭
 * @Date: 2021-08-06 15:08:01
 * @LastEditTime: 2021-08-10 14:20:36
 * @LastEditors: 庞昭昭
 * @Description: 
 * @FilePath: \micro-vue\src\App.vue
 * 记得注释
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
