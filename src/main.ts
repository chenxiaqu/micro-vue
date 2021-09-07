/*
 * @Author: 庞昭昭
 * @Date: 2021-08-06 15:08:01
 * @LastEditTime: 2021-09-07 15:38:25
 * @LastEditors: 庞昭昭
 * @Description:
 * @FilePath: \micro-vue\src\main.ts
 * 记得注释
 */
import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instance: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: any = {}) {
  const { container } = props;
  console.log(5555);

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function mount(props: unknown) {
  console.log("[vue] props from main framework", props);
  render(props);
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
