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

      const canvas = document.querySelector('#square');
      const squareRenderer = new THREE.WebGLRenderer({canvas}); // 画布名字必须命名为为canvas，否则不起作用 (The canvas name must be named canvas, otherwise it will not work)

      // Create and set up cameras
      const camera_fov = 75;
      const camera_aspect = 1;
      const camera_near = 0.1;
      const camera_far = 5;
      const camera = new THREE.PerspectiveCamera(camera_fov, camera_aspect, camera_near, camera_far);
      camera.position.z = 2;
      
      // //  创建和设置相机
      // const camera_fov = 75;
      // const camera_aspect = 1;
      // const camera_near = 0.1;
      // const camera_far = 5;
      // const camera = new THREE.PerspectiveCamera(camera_fov, camera_aspect, camera_near, camera_far);
      // camera.position.z = 2;

      // Create a scene using Mesh
      const scene = new THREE.Scene();
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
      // // const material = new THREE.MeshBasicMaterial({color: 'skyblue'});
      const square = new THREE.Mesh(geometry, material);
      scene.add(square);

      // // 创建和设置场景
      // const scene = new THREE.Scene();
      // const boxWidth = 1;
      // const boxHeight = 1;
      // const boxDepth = 1;
      // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
      // // const material = new THREE.MeshBasicMaterial({color: 'skyblue'});
      // const square = new THREE.Mesh(geometry, material);
      // scene.add(square);

      // Render the camera and scene onto the canvas by squareRenderer
      squareRenderer.render(scene, camera);

    }
  }
}
</script>
