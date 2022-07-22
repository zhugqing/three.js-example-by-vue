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

      // 各种标准材质的构建速度从最快到最慢：MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡ MeshStandardMaterial ➡ MeshPhysicalMaterial。
      // 此外还有MeshDepthMaterial、MeshNormalMaterial、ShaderMaterial、RawShaderMaterial等特殊材质，此处未提供案例
      function makeInstance(type, color, shininess, xposition, yposition, anotherParams) {
        let material = null
        switch (type) {
          case 'basic':
            material = new THREE.MeshBasicMaterial({
              color: color,
              // side:THREE.DoubleSide
              // shininess: shininess,
            }); // MeshPhongMaterial材质不受光照影响
            break;
          case 'Physical':
            material = new THREE.MeshPhysicalMaterial({
              color: color,
              roughness: anotherParams.roughness, // 参数从0到1，粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。
              metalness: anotherParams.metalness, // 金属度，参数从0到1，0代表非金属，1代表金属
              clearcoat: anotherParams.clearcoat, // 该参数从0到1，决定了要涂抹的清漆光亮层的程度，
              // clearCoatRoughness: anotherParams.clearCoatRoughness, // 该参数从0到1，指定光泽层的粗糙程度。
              flatShading: anotherParams.flatShading, // 金属度，参数从0到1，0代表非金属，1代表金属
              // side:THREE.FrontSide
              side:THREE.DoubleSide
            }); // MeshPhysicalMaterial材质受光照影响
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
        light.position.set(-1, 2, 5); //设置定光位置在相机左上方(-1, 2, 4), 默认目标点为原点(0, 0, 0)
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

      // // 旋转
      function render(time) {
        time *= 0.001;

        // 响应式的使相机宽高比等于canvas画布的宽高比,解决正方体被拉伸问题
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        Obj.forEach((item, index) => {
          let speed = 1 + index*.1;
          // item.rotation.x = time*speed;
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