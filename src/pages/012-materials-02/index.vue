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

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2);
      camera.position.z = 2;

      const scene = new THREE.Scene();
      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      // const geometry = new THREE.CircleGeometry(0.2, 45, 2, 10 ); // 平面圆看不出来光照
      const radius = 0.2;
      const widthSegments = 32;
      const heightSegments = 32;
      const phiStart = 3;
      const phiLength = 10;
      const thetaStart = 6;
      const thetaLength = 6;
      const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );

      function makeInstance(type, color, shininess, xposition, yposition) {
        let material = null
        switch (type) {
          case 'basic':
            material = new THREE.MeshBasicMaterial({
              color: color,
              // shininess: shininess,
            }); // MeshPhongMaterial材质不受光照影响
            break;
          case 'Lambert':
            material = new THREE.MeshLambertMaterial({
              color: color,
              // shininess: shininess,
            }); // MeshPhongMaterial材质受光照影响
            break;
          case 'Phong':
            material = new THREE.MeshPhongMaterial({
              color: color,
              shininess: shininess,
            }); // MeshPhongMaterial材质受光照影响
            break;
        
          default:
            break;
        }
        const square = new THREE.Mesh(geometry, material);
        scene.add(square);
        square.position.x = xposition;
        square.position.y = yposition;
        // 添加光照
        const intensity = 0.1; // 光照强度
        const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        light.position.set(0, 0, 5); //设置定光位置在相机左上方(-1, 2, 4), 默认目标点为原点(0, 0, 0)
        scene.add(light);
        return square
      }

      // 多个正方体
      makeInstance('basic', 'rgb(255,4,4)', 0, -1, 1);
      makeInstance('Lambert', 'rgb(255,4,4)', 30, 0, 1);
      makeInstance('Phong', 'rgb(255,4,4)', 150, 1, 1);
      makeInstance('basic', 'rgb(64,127,191)', 0, -1, 0.3);
      makeInstance('Lambert', 'rgb(64,127,191)', 30, 0, 0.3);
      makeInstance('Phong', 'rgb(64,127,191)', 150, 1, 0.3);
      makeInstance('basic', 'purple', 0, -1, -0.4);
      makeInstance('Lambert', 'purple', 30, 0, -0.4);
      makeInstance('Phong', 'purple', 150, 1, -0.4);
      makeInstance('basic', 'green', 0, -1, -1.1);
      makeInstance('Lambert', 'green', 30, 0, -1.1);
      makeInstance('Phong', 'green', 150, 1, -1.1);
      // // 多个正方体,旋转
      // const cubes = [
      //   makeInstance('basic', 'rgb(255,4,4)', 0, -1, 1),
      //   makeInstance('Lambert', 'rgb(255,4,4)', 30, 0, 1),
      //   makeInstance('Phong', 'rgb(255,4,4)', 150, 1, 1),
      //   makeInstance('basic', 'rgb(64,127,191)', 0, -1, 0.3),
      //   makeInstance('Lambert', 'rgb(64,127,191)', 30, 0, 0.3),
      //   makeInstance('Phong', 'rgb(64,127,191)', 150, 1, 0.3),
      //   makeInstance('basic', 'purple', 0, -1, -0.4),
      //   makeInstance('Lambert', 'purple', 30, 0, -0.4),
      //   makeInstance('Phong', 'purple', 150, 1, -0.4),
      //   makeInstance('basic', 'green', 0, -1, -1.1),
      //   makeInstance('Lambert', 'green', 30, 0, -1.1),
      //   makeInstance('Phong', 'green', 150, 1, -1.1),
      // ]

      // const material = new THREE.MeshBasicMaterial({
      //   color: 'rgb(255,4,4)',
      //   shininess: 0, 
      //   flatShading: true,
      // });
      // const material = new THREE.MeshLambertMaterial({
      //   color: 'rgb(255,4,4)',
      //   shininess: 50, 
      //   flatShading: true,
      // });
      // const material = new THREE.MeshPhongMaterial({
      //   color: 'rgb(255,4,4)',
      //   shininess: 150, 
      //   flatShading: true,
      // });


      // const square = new THREE.Mesh(geometry, material);
      // scene.add(square);

      renderer.render(scene, camera);

      // // 让立方体旋转
      // function render(time) {
      //   time *= 0.001;
      //   cubes.forEach((item, index) => {
      //     const speed = 1+index*.1;
      //     const rot = time*speed;
      //     item.rotation.x = rot;
      //     item.rotation.y = rot;
      //   })
      //   renderer.render(scene, camera);
      //   requestAnimationFrame(render);
      // }
      // requestAnimationFrame(render);
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