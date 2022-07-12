<template>
  <div class="home">
    <canvas id="square" width="800" height="800"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'RotatingCubePage',
  components: {
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {

      const canvas = document.getElementById('square');
      const renderer = new THREE.WebGLRenderer({canvas});

      // 相机 camera
      const fov = 75;
      const aspect = 1;
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2.5;

      // 场景
      const scene = new THREE.Scene();
      const w = 1;
      const h = 1;
      const d = 1;
      const geometry = new THREE.BoxGeometry(w, h ,d);
      // const material = new THREE.MeshBasicMaterial({color: 'skyblue'}); // MeshBasicMaterial材质不受光照影响
      const material = new THREE.MeshPhongMaterial({color: 'skyblue'}); // MeshPhongMaterial材质受光照影响
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // 添加光照
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4); //设置定光位置在相机左上方(-1, 2, 4), 默认目标点为原点(0, 0, 0)
      scene.add(light);

      // 调用渲染函数
      renderer.render(scene, camera);

      // 让立方体旋转
      function render(time) {
        time *= 0.001;
        cube.rotation.x = time;
        cube.rotation.y = time;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    },
  }
}
</script>
