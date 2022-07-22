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

      // 各种标准材质的构建速度从最快到最慢：MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡ MeshStandardMaterial ➡ MeshPhysicalMaterial。
      // 此外还有MeshDepthMaterial、MeshNormalMaterial、ShaderMaterial、RawShaderMaterial等特殊材质，此处未提供案例
      function makeInstance(anotherParams) {

        let material = null
        switch (anotherParams.type) {
          case 'Physical':
            material = new THREE.MeshPhysicalMaterial({
              color: anotherParams.color,
              roughness: anotherParams.roughness, // 参数从0到1，粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。
              metalness: anotherParams.metalness, // 金属度，参数从0到1，0代表非金属，1代表金属
              clearcoat: anotherParams.clearcoat, // 该参数从0到1，决定了要涂抹的清漆光亮层的程度，
              // clearCoatRoughness: anotherParams.clearCoatRoughness, // 该参数从0到1，指定光泽层的粗糙程度。
              flatShading: anotherParams.flatShading, // 金属度，参数从0到1，0代表非金属，1代表金属
              // side:THREE.FrontSide, // 只显示正面
              side:THREE.DoubleSide, // 显示正反面
            }); // MeshPhysicalMaterial材质受光照影响
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
        // const intensity = 1; // 光照强度
        // const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        // light.position.set(0, 0, 5); //设置定光位置在相机左上方(-1, 2, 4), 默认目标点为原点(0, 0, 0)
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

      // 旋转
      function render(time) {

        time *= 0.001;

        // 响应式的使相机宽高比等于canvas画布的宽高比,解决正方体被拉伸问题
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