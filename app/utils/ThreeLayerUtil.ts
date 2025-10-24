import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreeLayerUtil {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  control: OrbitControls;
  loopFunc: Array<Function> = [];

  constructor() {

  }

  createScene(domElement, width = window.innerWidth, height = window.innerHeight) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.lookAt(0, 0, 0);
    this.camera.position.y = -20;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(new THREE.Color('#181818'));
    domElement.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //设置相机距离原点的最远距离
    controls.minDistance = 200;
    //设置相机距离原点的最远距离
    controls.maxDistance = 600;
    //是否开启右键拖拽
    controls.enablePan = true;
    this.control = controls;

    // const axesHelper = new THREE.AxesHelper(600);
    // this.scene.add(axesHelper);
    this.animate();
  }

  addLoopFunc(callback) {
    this.loopFunc.push(callback);
  }

  animate() {
    this.loopFunc.forEach(callback => {
      callback();
    });
    this.control.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default ThreeLayerUtil;
