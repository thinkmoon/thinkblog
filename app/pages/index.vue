<template>
  <Title>{{ config.TITLE }}</Title>
  <div class="app-container">
    <div class="shadow center-read">
      <div class="title">
        {{ config.TITLE }}
      </div>
      <div class="read">
        <el-link
          href="/page/1"
          :underline="false"
        >
          <el-button size="large" @mouseover="accelerate" @mouseleave="slowdown">
            开始阅读
          </el-button>
        </el-link>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script lang="ts" setup>
import ThreeLayerUtil from "~/utils/ThreeLayerUtil";
import * as THREE from 'three';
import { onMounted } from "#imports";

const DEFAULT_SPEED = 0.5;
const speed = ref(DEFAULT_SPEED);
let speedTimer = null;

function accelerate() {
  if (speedTimer) {
    clearInterval(speedTimer);
  }
  speedTimer = setInterval(() => {
    speed.value += 0.05;
    if (speed.value > 5) {
      speed.value = 5;
    }
  }, 100);
}

function slowdown() {
  if (speedTimer) {
    clearInterval(speedTimer);
  }
  speed.value = DEFAULT_SPEED;
}

const config = useAppConfig();
definePageMeta({
  layout: false,
});

onMounted(() => {
  if (process.client) {
    const threeLayerUtil = new ThreeLayerUtil();
    threeLayerUtil.createScene(document.querySelector('.app-container'));

    const x = 0, y = 0;

    const heartShape = new THREE.Shape();

    heartShape.moveTo( x + 5, y + 5 );
    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    const geometry = new THREE.ShapeGeometry( heartShape ,1);

    const wireframe = new THREE.WireframeGeometry( geometry );

    const line = new THREE.LineSegments( wireframe );
    line.position.x -= 5;
    line.position.y -= 5;
    line.position.z -= 30;

    threeLayerUtil.scene.add( line );

    const starGeo = new THREE.BufferGeometry();
    const starArr = [];
    for (let i = 0; i < 6000; i++) {
      let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      starArr.push(star);
    }
    starGeo.setFromPoints(starArr);
    let sprite = new THREE.TextureLoader().load('https://blog.cdn.thinkmoon.cn/2022-10-16/23-45-05');
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite
    });
    const stars = new THREE.Points(starGeo, starMaterial);
    threeLayerUtil.scene.add(stars);
    threeLayerUtil.addLoopFunc(() => {
      const positions = starGeo.attributes.position.array as Array<number>;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= speed.value;
        if (positions[i + 1] <= -300) {
          positions[i + 1] = 300;
        }
      }
      starGeo.attributes.position.needsUpdate = true;
    });
  }
});

</script>

<style lang="less" scoped>
.app-container {
  :deep(canvas) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -999;
  }

  background-position: center;
  height: 100vh;
  background-size: cover;
  position: relative;

  .center-read {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
      font-size: 36px;
      color: #fff;
    }

    .read {
      margin-top: 24px;

      :deep(.el-button),
      .el-link {
        font-weight: bold;
        background-color: transparent;
        color: #fff;
      }
    }
  }
}
</style>
