<template>
  <div class="home">
    <canvas id="square"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'SceneGraphThree',
  components: {
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {

      const canvas = document.getElementById('square');
      const renderer = new THREE.WebGLRenderer({canvas});

      const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
      camera.position.set(0, 50, 0);
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 0);

      const scene = new THREE.Scene();

      // 要更新旋转角度的对象数组
      const objects = [];

      // 一球多用
      const radius = 1;
      const widthSegments = 16;
      const heightSegments = 16;
      const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      
      // 太阳系
      const solarSystem = new THREE.Object3D();
      scene.add(solarSystem);
      objects.push(solarSystem);

      // 太阳
      const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff00});
      const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
      sunMesh.scale.set(2, 2, 2); // 扩大太阳的大小
      solarSystem.add(sunMesh);
      objects.push(sunMesh);

      // 地球轨道
      const earthOrbit = new THREE.Object3D();
      earthOrbit.position.x = 10;
      solarSystem.add(earthOrbit);
      objects.push(earthOrbit);

      // 地球
      const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233ff, emissive: 0x112244});
      const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
      earthOrbit.add(earthMesh);
      objects.push(earthMesh);

      // 月亮轨道
      const moonOrbit = new THREE.Object3D();
      moonOrbit.position.x = 2;
      earthOrbit.add(moonOrbit);

      // 月亮
      const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 'grey'});
      const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
      moonMesh.scale.set(.5, .5, .5);
      moonOrbit.add(moonMesh);
      objects.push(moonMesh);

      const light = new THREE.PointLight(0xFFFFFF, 3);
      scene.add(light);

      // renderer.render(scene, camera);

      // 使用AxesHelper为每个节点添加x、y、z轴
      objects.forEach((node) => {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 1;
        node.add(axes);
      })

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

      function rotatingZ(time) {
        time *=0.001;

        if ( resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        }

        objects.forEach((obj) => {
          obj.rotation.y = time;
          // obj.rotation.z = time;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(rotatingZ);
      }
      requestAnimationFrame(rotatingZ)

    },
  }
}
</script>

<style scoped>
#square{
  width: 90%;
  height: 100%;
}
</style>
