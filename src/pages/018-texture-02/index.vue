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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // 正方体添加多面纹理
      const loader = new THREE.TextureLoader();
      const materials = [
        new THREE.MeshPhongMaterial({map: loader.load(require('@/assets/images/flower-1.jpg'))}),
        new THREE.MeshPhongMaterial({map: loader.load(require('@/assets/images/flower-2.jpg'))}),
        new THREE.MeshPhongMaterial({map: loader.load(require('@/assets/images/flower-3.jpg'))}),
        new THREE.MeshPhongMaterial({map: loader.load(require('@/assets/images/flower-4.jpg'))}),
        new THREE.MeshPhongMaterial({map: loader.load(require('@/assets/images/flower-5.jpg'))}),
        new THREE.MeshPhongMaterial({map: loader.load(require('@/assets/images/flower-6.jpg'))})
      ]
      const cube = new THREE.Mesh(geometry, materials);
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
