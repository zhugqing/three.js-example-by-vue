<template>
  <div class="home">
    <!-- 响应式设计防止画面模糊 -->
    <canvas id="square" width="800" height="800"></canvas>
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
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 5);
      camera.position.z = 2;

      // 场景
      const scene = new THREE.Scene();
      const geometry = new THREE.BoxGeometry(1,1,1);
      function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color: color});
        const cude = new THREE.Mesh(geometry, material);
        scene.add(cude);
        cude.position.x = x;
        return cude;
      }
      const cubes = [
        makeInstance(geometry, 'pink', -2),
        makeInstance(geometry, 'skyblue', 0),
        makeInstance(geometry, 'yellow', 2),
      ]
      // 平行光照
      const light = new THREE.DirectionalLight(0xFFFFFF, 1);
      light.position.set(-1, 2, 5);
      scene.add(light);
      // 渲染场景和相机
      renderer.render(scene, camera);

      // 让正方体旋转起来
      function render(time) {
        time *= 0.001;

        // 响应式的使相机宽高比等于canvas画布的宽高比,解决正方体被拉伸问题
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        cubes.forEach((item, index) => {
          let speed = 1 + index*.1;
          item.rotation.x = time*speed;
          item.rotation.y = time*speed;
        })
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);

      // 判断canvas宽高变化，动态设置绘图缓冲区(drawingbuffer)尺寸，解决canvas元素设置css样式模糊问题
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
    },
  }
}
</script>