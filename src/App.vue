<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
}

html, body {
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  height: 100%;
  overflow: hidden;
  position: relative;
}

/*滚动条*/  //::-webkit-scrollbar 仅仅在支持WebKit的浏览器 (例如, 谷歌Chrome, 苹果Safari)可以使用.
::-webkit-scrollbar { /*滚动条整体样式*/
  width: 7px;  // y轴滚动条宽度
  height: 7px; // x轴滚动条宽度
}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //background: rgba(255, 255, 255, 0.4);
  background-image: linear-gradient(45deg, #ffbd61 25%,#ffbd61 25%, #ff8800 25%, #ff8800 50%,#ffbd61 50%, #ffbd61 75%, #ff8800 75%, #ff8800 100%)!important;
}

::-webkit-scrollbar-button { /*滚动条上的按钮 (上下箭头)*/
  background: #108EE9;
  display: none;
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  background: #1b2235;
}

::-webkit-scrollbar-track-piece { /*滚动条没有滑块的轨道部分*/
  background: #1b2235;
}

::-webkit-scrollbar-corner { /*当同时有垂直滚动条和水平滚动条时交汇的部分*/
  background: #1b2235;
}

::-webkit-resizer { // 某些元素的corner部分的部分样式(例:textarea的可拖动按钮).

}

/*   IE美化  */
html, body {
  scrollbar-arrow-color: #D6D6D6; /**//*三角箭头的颜色*/
  scrollbar-face-color: #D6D6D6; /**//*立体滚动条的颜色*/
  scrollbar-3dlight-color: #f1f1f1; /**//*立体滚动条亮边的颜色*/
  scrollbar-highlight-color: #fff; /**//*滚动条空白部分的颜色*/
  scrollbar-shadow-color: #fff; /**//*立体滚动条阴影的颜色*/
  scrollbar-darkshadow-color: #fff; /**//*立体滚动条强阴影的颜色*/
  scrollbar-track-color: #f1f1f1; /**//*立体滚动条背景颜色*/
  scrollbar-base-color: #f1f1f1; /**//*滚动条的基本颜色*/
}

div.contain {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
}

</style>
