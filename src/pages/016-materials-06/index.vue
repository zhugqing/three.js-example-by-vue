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

      // 注意根据所画物体大小来调整相机角度fov、最近视角near、最远视角far等，防止物体在视角外导致看不到
      const camera = new THREE.PerspectiveCamera(90, 1, 0.1, 50);// far参数调整到5，太小了看不全;
      camera.position.z = 5;
      // camera.position.y = 0;
      // camera.position.x = 0;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color( '#444' );
      
      // 创建一个父级3D对象
      const fatherObj = new THREE.Object3D();
      scene.add(fatherObj)

      // 平面缓冲几何体
      const w = 1;
      const h = 1;
      const widthSegments = 55;
      const heightSegments = 33;
      const geometry = new THREE.PlaneGeometry( w, h, widthSegments, heightSegments );

      function makeInstance(anotherParams) {
        let material = null
        switch (anotherParams.type) {
          case 'Physical':
            material = new THREE.MeshPhysicalMaterial({
              color: anotherParams.color,
              roughness: anotherParams.roughness,
              metalness: anotherParams.metalness,
              clearcoat: anotherParams.clearcoat,
              flatShading: anotherParams.flatShading,
              // side:THREE.FrontSide, // 只显示正面
              side:THREE.DoubleSide, // 显示正反面
            });
            break;
          default:
            break;
        }
        const square = new THREE.Mesh(geometry, material);
        fatherObj.add(square);
        // scene.add(square);
        // scene.position.x = xposition;
        // scene.position.y = yposition;
        square.position.x = anotherParams.xposition;
        square.position.y = anotherParams.yposition;
        square.position.z = anotherParams.zposition;
        if (anotherParams.color == '#09679b' || anotherParams.color == 'pink') {
          square.rotation.x = anotherParams.angle;
        } else if (anotherParams.color == 'green' || anotherParams.color == 'yellow') {
          square.rotation.y = anotherParams.angle;
        }

        // // 添加平行光光照
        // const intensity = 1;
        // const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        // light.position.set(0, 0, 5);
        // scene.add(light);

        // 添加环境光
        const color2 = 0xFFFFFF;
        const intensity2 = 0.2;
        const light2 = new THREE.AmbientLight(color2, intensity2);
        scene.add(light2);
        
        return square
      }

      // 注意按原点来画六个面，这样在修改fatherObj.rotation.x和fatherObj.rotation.y时才会绕原点旋转
      makeInstance({
        type: 'Physical',
        color: '#09679b',
        shininess: 30,
        xposition: 0,
        yposition: -0.75,
        zposition: 0,
        roughness: 1,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
        flatShading: false,
        angle: Math.PI/2
      }),
      makeInstance({
        type: 'Physical',
        color: 'pink',
        shininess: 30,
        xposition: 0,
        yposition: 0.75,
        zposition: 0,
        roughness: 1,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
        flatShading: false,
        angle: Math.PI/2
      }),
      makeInstance({
        type: 'Physical',
        color: 'green',
        shininess: 30,
        xposition: -0.75,
        yposition: 0,
        zposition: 0,
        roughness: 1,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
        flatShading: false,
        angle: Math.PI/2
      }),
      makeInstance({
        type: 'Physical',
        color: 'yellow',
        shininess: 30,
        xposition: 0.75,
        yposition: 0,
        zposition: 0,
        roughness: 1,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
        flatShading: false,
        angle: Math.PI/2
      }),
      makeInstance({
        type: 'Physical',
        color: 'purple',
        shininess: 30,
        xposition: 0,
        yposition: 0,
        zposition: -0.75,
        roughness: 1,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
        flatShading: false,
        angle: Math.PI/2
      }),
      makeInstance({
        type: 'Physical',
        color: 'skyblue',
        shininess: 30,
        xposition: 0,
        yposition: 0,
        zposition: 0.75,
        roughness: 1,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
        flatShading: false,
        angle: Math.PI/2
      }),
      // console.log(fatherObj)
      renderer.render(scene, camera);

      function render(time) {
        time *= 0.001;
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        fatherObj.rotation.x = time;
        fatherObj.rotation.y = time;
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