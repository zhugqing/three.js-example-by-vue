<template>
  <div class="home">
    <canvas id="square"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'SceneGraphOne',
  components: {
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {

      const canvas = document.getElementById('square');
      const renderer = new THREE.WebGLRenderer({canvas});

      const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
      camera.position.z = 4;
      // const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
      // camera.position.set(0, 50, 0);
      // camera.up.set(0, 0, 1);
      // camera.lookAt(0, 0, 10);

      const scene = new THREE.Scene();

      // 要更新旋转角度的对象数组
      const objects = [];

      // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // 盒子几何体
      // 一球多用
      const radius = 1;
      const widthSegments = 12;
      const heightSegments = 12;
      const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

      // 太阳
      const sunMaterial = new THREE.MeshPhongMaterial({color: 0xffff00});
      const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
      sunMesh.scale.set(0.6, 0.6, 0.6); // 扩大太阳的大小
      scene.add(sunMesh);
      objects.push(sunMesh);
      // 地球
      const earthMaterial = new THREE.MeshPhongMaterial({color: 'skyblue'});
      const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
      earthMesh.scale.set(0.5, 0.5, 0.5); // 缩小地球的大小
      earthMesh.position.x = -3
      sunMesh.add(earthMesh);
      objects.push(earthMesh);
      // 月亮
      const moonMaterial = new THREE.MeshPhongMaterial({color: 'grey'});
      const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
      moonMesh.scale.set(0.3, 0.3, 0.3); // 缩小月亮的大小
      moonMesh.position.x = -1.5
      earthMesh.add(moonMesh);
      objects.push(moonMesh);

      // const light = new THREE.PointLight(0xFFFFFF, 3);
      // scene.add(light);
      const light = new THREE.DirectionalLight(0xFFFFFF, 1);
      light.position.set(0, 0, 4);
      scene.add(light);

      renderer.render(scene, camera);

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.hright !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize
      }
      // if ( resizeRendererToDisplaySize(renderer)) {
      //   const canvas = renderer.domElement;
      //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //   camera.updateProjectionMatrix();
      //   renderer.render(scene, camera);
      // }

      function rotatingZ(time) {
        time *=0.001;

        if ( resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        }

        objects.forEach((obj) => {
          obj.rotation.z = time;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(rotatingZ);
      }
      requestAnimationFrame(rotatingZ)

    },
  }
}
</script>