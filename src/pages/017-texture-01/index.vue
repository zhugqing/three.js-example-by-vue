<template>
  <div class="home">
    <canvas id="square" width="800" height="800"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'textureOne',
  components: {
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {

      const canvas = document.getElementById('square');
      const renderer = new THREE.WebGLRenderer({canvas});

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 5);
      camera.position.z = 2.5;

      const scene = new THREE.Scene();
      // 场景添加纹理
      const textureLoader = new THREE.TextureLoader()
      scene.background = textureLoader.load(require('@/assets/images/wall.jpg'))

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // 添加纹理
      const loader = new THREE.TextureLoader();
      const material = new THREE.MeshPhongMaterial({map: loader.load(require('@/assets/images/wall.jpg'))});
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const light = new THREE.DirectionalLight(0xFFFFFF, 1);
      light.position.set(-1, 2, 4);
      scene.add(light);

      renderer.render(scene, camera);

      function render(time) {
        time *= 0.001;
        cube.rotation.x = time;
        cube.rotation.y = time;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }
  }
}
</script>
