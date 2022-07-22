<template>
  <div class="home">
    <canvas id="square" width="800" height="800"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'SquarePage',
  components: {
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {
      // 1、详细写法
      const canvas = document.querySelector('#square');
      const squareRenderer = new THREE.WebGLRenderer({canvas}); // 画布名字必须命名为为canvas，否则不起作用 (The canvas name must be named canvas, otherwise it will not work)

      // 创建和设置相机
      const camera_fov = 75; // 度数
      const camera_aspect = 1; 
      const camera_near = 0.1;
      const camera_far = 5;
      const camera = new THREE.PerspectiveCamera(camera_fov, camera_aspect, camera_near, camera_far);
      camera.position.z = 2;

      // 创建和设置场景
      const scene = new THREE.Scene();
      // scene.background = new THREE.Color( '#444' ); // 改变场景颜色
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
      // const material = new THREE.MeshBasicMaterial({color: 'skyblue'});
      const square = new THREE.Mesh(geometry, material);
      scene.add(square);

      // Render the camera and scene onto the canvas by squareRenderer
      squareRenderer.render(scene, camera);

      // // 2、简便写法
      // const canvas = document.querySelector('#square');
      // const squareRenderer = new THREE.WebGLRenderer({canvas});

      // const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2); // 创建相机
      // camera.position.z = 2; // 设置相机视角位置

      // const scene = new THREE.Scene(); // 创建场景
      // const geometry = new THREE.BoxGeometry(1, 1, 1); // 创建几何形状
      // const material = new THREE.MeshBasicMaterial({color: 'skyblue'}); // 创建材料
      // const square = new THREE.Mesh(geometry, material); // Mesh创建正方型
      // scene.add(square); // 场景添加几何体

      // squareRenderer.render(scene, camera); // 添加到画布渲染

    }
  }
}
</script>
