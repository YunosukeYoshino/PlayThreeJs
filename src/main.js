import './scss/style.scss'
import * as THREE from 'three'
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js'
let camera, scene, renderer;
let controls;

const clock = new THREE.Clock();//経過時間
init();
function init() {
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    15000)
  camera.position.z = 250
  scene = new THREE.Scene()

  const size = 250;
  const geometory = new THREE.BoxGeometry(size, size, size)
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff, //鏡面反射
    shininess: 50, //輝度
  });
  //色や材質

  for (let i = 0; i < 2500; i++) {
    const mesh = new THREE.Mesh(geometory, material)
    // meshを2500個作成することができる
    mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
    // ランダムに作成される

    mesh.rotation.x = Math.random() * Math.PI
    mesh.rotation.y = Math.random() * Math.PI
    mesh.rotation.z = Math.random() * Math.PI

    scene.add(mesh);
    // addするのをお忘れなく
  }
  // 平行光源
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.03)
  scene.add(dirLight);
  //レンズフレアを追加する
  const textureLoader = new THREE.TextureLoader()

  const textureFlare = textureLoader.load('./textures/LensFlare.png')


  addLight(0.08, 0.3, 0.9, 0, 0, -1000)

  //ポイント光源を追加
  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000)
    light.color.setHSL(h, s, l)
    light.position.set(x, y, z)
    scene.add(light);
    const lensflare = new Lensflare();
    lensflare.addElement(
      new LensflareElement(textureFlare, 700, 0, light.color)
    );
    scene.add(lensflare);
  }

  // renderer
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 画面いっぱいにセットされる。
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);


  //マウス操作を行う
  controls = new FlyControls(camera, renderer.domElement)

  controls.movementSpeed = 2500
  //長押しした時のアニメーションスピード
  controls.rollSpeed = Math.PI / 20

  animate()
}

function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta();//経過した時間を表示
  controls.update(delta)
  renderer.render(scene, camera)

}
