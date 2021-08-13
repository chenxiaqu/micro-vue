/*
 * @Author: 庞昭昭
 * @Date: 2021-08-09 15:55:14
 * @LastEditTime: 2021-08-10 14:17:43
 * @LastEditors: 庞昭昭
 * @Description: 侧边栏
 * @FilePath: \shell-demo\src\components\web-components\sidebar\main.js
 * 记得注释
 */
(function() {
  // 配置模板
  const getEemplate = () => {
    // 创建模板
    const template = document.createElement('template');
    // 给模板设置id 方便查找
    template.id = 'sidebar';

    template.innerHTML = `
    <style>
      .sidebar {
        position: fixed;
        padding: 22px 0;
        width: 200px;
        height: 100vh;
        background: #ffffff;
        box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        transition: width 0.5s;
      }
      .sidebar .logo {
        margin: 0 0 24px 22px;
        width: calc(100% - 44px);
        height: 48px;
        flex: 0 0 auto;
      }
      .sidebar .sidebar-list {
        width:100%;
        height: calc(100vh - 94px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        overflow-y: auto;
      }
      .sidebar .sidebar-list .nav {
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 160px;
        min-height: 160px;
        background: #f5f6fa;
        border-radius: 8px;
        margin-bottom: 8px;
        cursor: pointer;
      }
      .sidebar .sidebar-list .nav .shade {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
      }
      .sidebar .sidebar-list .nav img {
        margin-bottom:8px;
        width: 48px;
        height: 48px;
      }
      .sidebar .sidebar-list .nav span {
        display: block;
        width: 160px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #303133;
        line-height: 22px;
        text-align: center;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sidebar .close {
        position: fixed;
        top: 0;
        left: 200px;
        width: 64px;
        height: 64px;
        background: #00bcb7;
        cursor: pointer;
        transition: left 0.5s;
      }
    </style>
    <div id="sidebar" class="sidebar">
      <img class="logo">
      <div id="sidebar-list" class="sidebar-list"></div>
      <div id="close" class="close"></div>
    </div>
    `;

    return template;
  };
  // 讲模板放到dom结构中去
  const createEemplate = () => {
    document.body.appendChild(getEemplate());
  };

  createEemplate();

  class SideBar extends HTMLElement {
    constructor() {
      super();
      this.creatShadow();
      // 此处防止vue等框架类型的组件使用时 生命周期导致的参数异常 因此延迟绑定参数
      setTimeout(() => {
        this.creatContent();
      });
    }

    /**
     * 封闭内部dom
     */
    creatShadow() {
      this.shadow = this.attachShadow({
        mode: 'closed'
      });
    }

    /**
     * 创建内部显示内容
     */
    creatContent() {
      let isOpen = true;
      const templateElem = document.getElementById('sidebar');
      let content = templateElem.content.cloneNode(true);

      // 传入的logo图片
      content
        .querySelector('.logo')
        .setAttribute('src', this.getAttribute('logoUrl'));

      const close = content.querySelector('#close');
      const sidebar = content.querySelector('#sidebar');
      // 开关事件
      close.onclick = e => {
        if (isOpen) {
          e.target.style.left = 0;
          sidebar.style.width = 0;
        } else {
          e.target.style.left = '200px';
          sidebar.style.width = '200px';
        }
        isOpen = !isOpen;
      };
      content = this.getNav(content); // 获取菜单列表，并绑定事件

      this.shadow.appendChild(content);
    }

    // 获取列表项
    getNav(content) {
      // 初始化列表数据
      let navList = [];
      let contentCopy = content;
      // 获取菜单列表dom
      let sidebarList = contentCopy.querySelector('#sidebar-list');
      // 声明xhr
      const xhr = new XMLHttpRequest();
      const body = {
        loginName: '0',
        password: '0',
        requestId: '1628573726716',
        verifyCode: '1312'
      };
      // 监听xhr状态
      xhr.onreadystatechange = () => {
        console.log(xhr.readyState);
        // 当请求状态为已完成，并且状态码为200时，说明接口调用成功
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // 接收接口返回的响应数据
          const res = JSON.parse(xhr.response);
          if (res.data) {
            navList = res.data;
          } else {
            navList = [
              {
                name: 'localhost:3000',
                imgUrl:
                  'https://semantic-ui.com/images/avatar2/large/kristy.png',
                url: 'http://localhost:3000'
              },
              {
                name: 'localhost:8080',
                imgUrl:
                  'https://semantic-ui.com/images/avatar2/large/kristy.png',
                url: 'http://localhost:8080'
              }
            ];
          }
          for (let i = 0; i < navList.length; i++) {
            // 创建单个菜单dom
            let nav = document.createElement('div');
            nav.setAttribute('class', 'nav');
            // 创建遮罩dom，用来点击跳转
            let shade = document.createElement('div');
            shade.setAttribute('class', 'shade');
            shade.setAttribute('path', navList[i].url); // 跳转路径
            // 声明点击事件
            shade.onclick = e => {
              window.open(e.target.getAttribute('path'));
            };
            nav.appendChild(shade);
            // 创建图片dom
            let img = document.createElement('img');
            img.setAttribute('src', navList[i].imgUrl);
            nav.appendChild(img);
            // 创建文本dom
            let span = document.createElement('span');
            span.innerText = navList[i].name;
            nav.appendChild(span);
            sidebarList.appendChild(nav);
          }
          return contentCopy;
        }
      };
      // 初始化一个请求
      xhr.open('post', 'http://172.17.11.162:4175/category/v1/login');
      // 设置请求头
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      // xhr.setRequestHeader(
      //   'Authorization',
      //   window.locationStorage.getItem('token')
      // );
      // 发送请求 默认异步
      xhr.send(JSON.stringify(body));
      return contentCopy;
    }

    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * 相当于mounted
     */
    connectedCallback() {
      console.log('connectedCallback');
    }

    /**
     * 当自定义元素与文档DOM断开连接时被调用。
     * 与beforeDestroy类似
     */
    disconnectedCallback() {
      console.log('disconnectedCallback');
    }

    /**
     * 当自定义元素被移动到新文档时被调用。
     */
    adoptedCallback() {
      console.log('adoptedCallback');
    }
    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    static get observedAttributes() {
      return ['logoUrl'];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     */
    attributeChangedCallback(param) {
      console.log('attributeChangedCallback', param);
    }
  }

  window.customElements.define('side-bar', SideBar);
})();
