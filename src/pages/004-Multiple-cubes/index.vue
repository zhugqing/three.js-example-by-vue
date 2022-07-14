<template>
  <div class="home">
    <canvas id="square"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'MultipleCubes',
  components: {
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {

      const canvas = document.getElementById('square');
      const renderer = new THREE.WebGLRenderer({canvas});

      // 相机
      const fov = 75;
      const aspect = 1;
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 3;

      // 场景
      const scene = new THREE.Scene();
      const w = 1;
      const h = 1;
      const d = 1;
      const geometry = new THREE.BoxGeometry(w, h ,d);
      function makeInstance(geometry, color, xposition) {
        const material = new THREE.MeshPhongMaterial({color: color}); // MeshPhongMaterial材质受光照影响
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = xposition;
        return cube
      }

      // 多个正方体
      const cubes = [
        makeInstance(geometry, 'pink', -2),
        makeInstance(geometry, 'skyblue', 0),
        makeInstance(geometry, 'green', 2),
      ]

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
        cubes.forEach((item, index) => {
          const speed = 1+index*.1;
          const rot = time*speed;
          item.rotation.x = rot;
          item.rotation.y = rot;
        })
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    },
  }
}
</script>

<style scoped>
.home{
  height: 100%;
}
#square{
  width: 90%;
  height: 100%;
}
</style>
