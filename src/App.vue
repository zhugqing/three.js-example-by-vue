<template>
  <div id="app">
    <nav>
      <router-link to="/">正方型</router-link> |
      <router-link to="/rotating_cube">旋转正方体</router-link> |
      <router-link to="/rotating_light_cube">正方体添加光照</router-link> |
      <router-link to="/multiple_ubes">多个旋转正方体</router-link> |
      <router-link to="/responsive_design">响应式设计</router-link> |
      <router-link to="/scene_graph_one">场景图01</router-link> |
      <router-link to="/scene_graph_two">场景图02</router-link> |
      <router-link to="/scene_graph_three">场景图03</router-link> |
      <router-link to="/scene_graph_four">场景图04</router-link> |
      <router-link to="/scene_graph_five">场景图05</router-link> |
      <router-link to="/materials_one">材质01</router-link> |
      <router-link to="/materials_two">材质02</router-link> |
      <router-link to="/materials_three">材质03</router-link> |
      <router-link to="/materials_four">材质04-平面着色</router-link> |
      <router-link to="/materials_five">材质05-显示正反面</router-link> |
      <router-link to="/materials_six">材质06-六个面验证正反面显示</router-link> |
      <router-link to="/texture_one">Hello Texture</router-link> |
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
