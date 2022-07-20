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
      const radius = 0.4;
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
              // shininess: shininess,
            }); // MeshPhongMaterial材质不受光照影响
            break;
          case 'Lambert':
            material = new THREE.MeshLambertMaterial({
              color: color,
              // shininess: shininess,
            }); // MeshLambertMaterial材质受光照影响
            break;
          case 'Phong':
            material = new THREE.MeshPhongMaterial({
              color: color,
              shininess: shininess,
            }); // MeshPhongMaterial材质受光照影响
            break;
          case 'Toon':
            material = new THREE.MeshToonMaterial({
              color: color,
              // shininess: shininess,
            }); // MeshToonMaterial材质受光照影响
            break;
          case 'Standard':
            material = new THREE.MeshStandardMaterial({
              color: color,
              roughness: anotherParams.roughness, // 参数从0到1，粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。
              metalness: anotherParams.metalness, // 金属度，参数从0到1，0代表非金属，1代表金属
            }); // MeshStandardMaterial材质受光照影响
            break;
          case 'Physical':
            material = new THREE.MeshPhysicalMaterial({
              color: color,
              roughness: anotherParams.roughness, // 参数从0到1，粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。
              metalness: anotherParams.metalness, // 金属度，参数从0到1，0代表非金属，1代表金属
              clearcoat: anotherParams.clearcoat, // 该参数从0到1，决定了要涂抹的清漆光亮层的程度，
              // clearCoatRoughness: anotherParams.clearCoatRoughness, // 该参数从0到1，指定光泽层的粗糙程度。
              flatShading: anotherParams.flatShading, // 金属度，参数从0到1，0代表非金属，1代表金属
            }); // MeshPhysicalMaterial材质受光照影响
            break;
          case 'Shader':
            material = new THREE.ShaderMaterial({
              // color: color,
              // roughness: anotherParams.roughness, // 参数从0到1，粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。
              // flatShading: anotherParams.flatShading, // 金属度，参数从0到1，0代表非金属，1代表金属
            }); // ShaderMaterial材质受光照影响
            break;
        
          default:
            break;
        }
        const square = new THREE.Mesh(geometry, material);
        scene.add(square);
        square.position.x = xposition;
        square.position.y = yposition;
        // 添加光照
        const intensity = 1; // 光照强度
        const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        light.position.set(0, 0, 5); //设置定光位置在相机左上方(-1, 2, 4), 默认目标点为原点(0, 0, 0)
        scene.add(light);
        return square
      }

      const cubes = [
        makeInstance('Physical', 'purple', 30, -0.6, 0.5, {
          roughness: 1,
          metalness: 0.4,
          clearcoat: 0.4,
          clearCoatRoughness: 0.4,
          flatShading: false,
        }),
        makeInstance('Physical', 'purple', 30, 0.8, 0.5, {
          roughness: 1,
          metalness: 0.4,
          clearcoat: 0.4,
          clearCoatRoughness: 0.4,
          flatShading: true,
        }),
      ]

      renderer.render(scene, camera);

      // // 让球体旋转
      function render(time) {
        time *= 0.001;
        cubes.forEach((item, index) => {
          const speed = 0.5+index*.1;
          const rot = time*speed;
          item.rotation.x = rot;
          item.rotation.y = rot;
        })
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
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