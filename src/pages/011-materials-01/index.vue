<template>
  <div class="home">
    <canvas id="square"  width="800" height="800"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'MaterialsOne',
  mounted() {
    this.main();
  },
  methods: {
    main() {
      const canvas = document.getElementById('square');
      const renderer = new THREE.WebGLRenderer({canvas});

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2);
      camera.position.z = 2;

      const scene = new THREE.Scene();
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      // // 设置材质属性，方法1：在实例化时设置
      // const material = new THREE.MeshBasicMaterial({
      //   color: 0xFF0000,    // 红色 (也可以使用CSS的颜色字符串)
      //   flatShading: true,
      // });

      // 设置材质属性，方法2：在实例化之后再设置
      const material = new THREE.MeshBasicMaterial();
      // material.color.setHSL(0, 1, .5);  // 红色
      material.flatShading = true;

      // // THREE.Color类型的属性有多种设置方式
      // material.color.set(cssString);   // 任何 CSS 颜色字符串, 比如 'purple', '#F32', 'rgb(255, 127, 64)', 'hsl(180, 50%, 25%)'
      // material.color.setHSL(h, s, l)   // 其中 h, s, 和 l 从 0 到 1
      material.color.setRGB(64, 122, 191)   // 其中 r, g, 和 b 从 0 到 1

      const square = new THREE.Mesh(geometry, material);
      scene.add(square);

      renderer.render(scene, camera);
    }
  },
}
</script>