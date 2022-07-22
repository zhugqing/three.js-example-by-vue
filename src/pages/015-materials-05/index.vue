<template>
  <div class="home">
    <canvas id="square"  width="800" height="800"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'MaterialsTwo',
  mounted() {
    this.main();
  },
  methods: {
    main() {
      const canvas = document.getElementById('square');
      const renderer = new THREE.WebGLRenderer({canvas});

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 20);
      camera.position.z = 2;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color( '#444' );
      // // 球体
      // const radius = 0.4;
      // const widthSegments = 32;
      // const heightSegments = 32;
      // const phiStart = 3;
      // const phiLength = 10;
      // const thetaStart = 6;
      // const thetaLength = 6;
      // const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );

      // 平面缓冲几何体
      const w = 0.5;
      const h = 0.5;
      const widthSegments = 15;
      const heightSegments = 13;
      const geometry = new THREE.PlaneGeometry( w, h, widthSegments, heightSegments );

      function makeInstance(type, color, shininess, xposition, yposition, anotherParams) {
        let material = null
        switch (type) {
          case 'basic':
            material = new THREE.MeshBasicMaterial({
              color: color,
              // side:THREE.DoubleSide
            });
            break;
          case 'Physical':
            material = new THREE.MeshPhysicalMaterial({
              color: color,
              roughness: anotherParams.roughness,
              metalness: anotherParams.metalness,
              clearcoat: anotherParams.clearcoat,
              flatShading: anotherParams.flatShading,
              // side:THREE.FrontSide
              side:THREE.DoubleSide
            });
            break;
        
          default:
            break;
        }
        const square = new THREE.Mesh(geometry, material);
        scene.add(square);
        square.position.x = xposition;
        square.position.y = yposition;

        const intensity = 1;
        const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        light.position.set(-1, 2, 5);
        scene.add(light);
        return square
      }

      const Obj = [
        makeInstance('Physical', '#09679b', 30, -0.6, 0.5, {
          roughness: 1,
          metalness: 0.4,
          clearcoat: 0.4,
          clearCoatRoughness: 0.4,
          flatShading: false,
        }),
        makeInstance('Physical', '#09679b', 30, 0.8, 0.5, {
          roughness: 0.4,
          metalness: 0.4,
          clearcoat: 0.4,
          clearCoatRoughness: 0.4,
          flatShading: true,
        }),
      ]

      renderer.render(scene, camera);

      function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        Obj.forEach((item, index) => {
          let speed = 1 + index*.1;
          item.rotation.x = time*speed;
          item.rotation.y = time*speed;
        })
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);

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
    }
  },
}
</script>


<style scoped>
#square{
  width: 90%;
  height: 100%;
}
</style>