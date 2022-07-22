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
      const radius = 0.2;
      const widthSegments = 32;
      const heightSegments = 32;
      const phiStart = 3;
      const phiLength = 10;
      const thetaStart = 6;
      const thetaLength = 6;
      const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );

      // 各种标准材质的构建速度从最快到最慢：MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡ MeshStandardMaterial ➡ MeshPhysicalMaterial。
      // 此外还有MeshDepthMaterial、MeshNormalMaterial、ShaderMaterial、RawShaderMaterial等特殊材质，此处未提供案例
      function makeInstance(type, color, shininess, xposition, yposition, anotherParams) {
        let material = null
        switch (type) {
          case 'basic':
            material = new THREE.MeshBasicMaterial({
              color: color,
            });
            break;
          case 'Lambert':
            material = new THREE.MeshLambertMaterial({
              color: color,
              // shininess: shininess,
            });
            break;
          case 'Phong':
            material = new THREE.MeshPhongMaterial({
              color: color,
              shininess: shininess,
            });
            break;
          case 'Toon':
            material = new THREE.MeshToonMaterial({
              color: color,
              // shininess: shininess,
            });
            break;
          case 'Standard':
            material = new THREE.MeshStandardMaterial({
              color: color,
              roughness: anotherParams.roughness, // 参数从0到1，粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。
              metalness: anotherParams.metalness, // 金属度，参数从0到1，0代表非金属，1代表金属
            });
            break;
          case 'Physical':
            material = new THREE.MeshPhysicalMaterial({
              color: color,
              roughness: anotherParams.roughness, // 参数从0到1，粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。
              metalness: anotherParams.metalness, // 金属度，参数从0到1，0代表非金属，1代表金属
              clearcoat: anotherParams.clearcoat, // 该参数从0到1，决定了要涂抹的清漆光亮层的程度，
              // clearCoatRoughness: anotherParams.clearCoatRoughness, // 该参数从0到1，指定光泽层的粗糙程度。
            });
            break;
        
          default:
            break;
        }
        const square = new THREE.Mesh(geometry, material);
        scene.add(square);
        square.position.x = xposition;
        square.position.y = yposition;

        const intensity = 0.1;
        const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        light.position.set(0, 0, 5);
        scene.add(light);
        return square
      }

      // 多个球体
      makeInstance('basic', 'rgb(255,4,4)', 0, -1, 1.2);
      makeInstance('Lambert', 'rgb(255,4,4)', 30, 0, 1.2);
      makeInstance('Phong', 'rgb(255,4,4)', 150, 1, 1.2);

      makeInstance('Toon', 'rgb(64,127,191)', 150, -1, 0.7);
      makeInstance('Toon', 'rgb(64,127,191)', 30, 0, 0.7);
      makeInstance('Toon', 'rgb(64,127,191)', 0, 1, 0.7);

      // MeshStandardMaterial材料
      makeInstance('Standard', 'green', 0, -1.2, 0.2, {
        roughness: 0,
        metalness: 0,
      });
      makeInstance('Standard', 'green', 0, -0.75, 0.2, {
        roughness: 0.2,
        metalness: 0.2,
      });
      makeInstance('Standard', 'green', 30, -0.3, 0.2, {
        roughness: 0.4,
        metalness: 0.4,
      });
      makeInstance('Standard', 'green', 30, 0.2, 0.2, {
        roughness: 0.6,
        metalness: 0.6,
      });
      makeInstance('Standard', 'green', 150, 0.65, 0.2, {
        roughness: 0.8,
        metalness: 0.8,
      });
      makeInstance('Standard', 'green', 150, 1.15, 0.2, {
        roughness: 1,
        metalness: 1,
      });
      
      makeInstance('Standard', 'green', 0, -1.2, -0.3, {
        roughness: 0,
        metalness: 0,
      });
      makeInstance('Standard', 'green', 0, -0.75, -0.3, {
        roughness: 0.2,
        metalness: 0.2,
      });
      makeInstance('Standard', 'green', 30, -0.3, -0.3, {
        roughness: 0.4,
        metalness: 0.4,
      });
      makeInstance('Standard', 'green', 30, 0.2, -0.3, {
        roughness: 0.6,
        metalness: 0.6,
      });
      makeInstance('Standard', 'green', 150, 0.65, -0.3, {
        roughness: 0.8,
        metalness: 0.8,
      });
      makeInstance('Standard', 'green', 150, 1.15, -0.3, {
        roughness: 1,
        metalness: 1,
      });
      // MeshPhysicalMaterial材料
      makeInstance('Physical', 'green', 0, -1.2, -0.8, {
        roughness: 0,
        metalness: 0,
        clearcoat: 0,
        clearCoatRoughness: 0,
      });
      makeInstance('Physical', 'green', 0, -0.75, -0.8, {
        roughness: 0.2,
        metalness: 0.2,
        clearcoat: 0.2,
        clearCoatRoughness: 0.2,
      });
      makeInstance('Physical', 'green', 30, -0.3, -0.8, {
        roughness: 0.4,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
      });
      makeInstance('Physical', 'green', 30, 0.2, -0.8, {
        roughness: 0.6,
        metalness: 0.6,
        clearcoat: 0.6,
        clearCoatRoughness: 0.6,
      });
      makeInstance('Physical', 'green', 150, 0.65, -0.8, {
        roughness: 0.8,
        metalness: 0.8,
        clearcoat: 0.8,
        clearCoatRoughness: 0.8,
      });
      makeInstance('Physical', 'green', 150, 1.15, -0.8, {
        roughness: 1,
        metalness: 1,
        clearcoat: 1,
        clearCoatRoughness: 1,
      });
      
      makeInstance('Physical', 'green', 0, -1.2, -1.3, {
        roughness: 0,
        metalness: 0,
        clearcoat: 0,
        clearCoatRoughness: 0,
      });
      makeInstance('Physical', 'green', 0, -0.75, -1.3, {
        roughness: 0.2,
        metalness: 0.2,
        clearcoat: 0.2,
        clearCoatRoughness: 0.2,
      });
      makeInstance('Physical', 'green', 30, -0.3, -1.3, {
        roughness: 0.4,
        metalness: 0.4,
        clearcoat: 0.4,
        clearCoatRoughness: 0.4,
      });
      makeInstance('Physical', 'green', 30, 0.2, -1.3, {
        roughness: 0.6,
        metalness: 0.6,
        clearcoat: 0.6,
        clearCoatRoughness: 0.6,
      });
      makeInstance('Physical', 'green', 150, 0.65, -1.3, {
        roughness: 0.8,
        metalness: 0.8,
        clearcoat: 0.8,
        clearCoatRoughness: 0.8,
      });
      makeInstance('Physical', 'green', 150, 1.15, -1.3, {
        roughness: 1,
        metalness: 1,
        clearcoat: 1,
        clearCoatRoughness: 1,
      });

      renderer.render(scene, camera);
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