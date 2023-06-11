import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";
import { printWalls } from "./walls.js";
import { printPaintings } from "./paintings.js";
import { enterBuilding, moveCameraTo } from "./tweens";
import { printInfo, selectSample, returnUser, changeDir } from "./domhandlings";
const returnBtn = document.querySelector(".return-btn");
const compassBtns = document.querySelectorAll(".compass-btn");

// scene scaffolding -- renderer,scene,camera,lights
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load("/textures/space.jpg");
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  1,
  1000,
  0.1
);
let startingCameraPOS = [395, 345, 685];
camera.position.set(...startingCameraPOS);
scene.add(camera);

const ambientLight = new THREE.AmbientLight();
ambientLight.position.set(0, 170, 35);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight("white", 0.3);
let spotHelper = new THREE.SpotLightHelper(spotLight);
spotLight.position.set(175, 105, 5);

scene.add(spotLight);
spotLight.castShadow = true;

printWalls(scene);
printPaintings(scene);

let oc = new OrbitControls(camera, renderer.domElement);
oc.enableZoom = false;
oc.target.set(-50, 20, 5);
oc.maxPolarAngle = Math.PI * 0.5;
oc.maxDistance = 675;
oc.minDistance = -305;
oc.update();

let gltfLoader = new GLTFLoader();
gltfLoader.load("./glbs/table.glb", (img) => {
  console.log(img);
  img.scene.position.x = 145;
  img.scene.position.z = -125;
  img.scene.position.y = 5;
  img.scene.scale.set(9, 9, 9);
  // img.scene.userData.title = "Stool";
  // img.scene.userData.cameraVector = {
  //   x: 144,
  //   y: 25,
  //   z: 30,
  // };
  // img.scene.userData.cameraROT = {
  //   x: 0.1,
  //   y: 1.02,
  //   z: 0.019,
  // };
  scene.add(img.scene);
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

onmousemove = (e) => onPointerMove(e);

let currFocusObject;
function animation() {
  renderer.render(scene, camera);
  TWEEN.update();

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length) {
    if (intersects[0].object.userData.title) {
      console.log("hovering over " + intersects[0].object.userData.title + ".");
      currFocusObject = intersects[0].object;
      if (intersects[0].object.userData.title) {
        printInfo(intersects[0].object.userData);
      }
    } else {
      currFocusObject = undefined;
    }
  }

  requestAnimationFrame(animation);
}

animation();

onresize = (e) => {
  renderer.setSize(innerWidth, innerHeight);
};

console.log(scene.children);

onclick = (e) => {
  if (e.target.classList.contains("return-btn")) {
    returnUser(camera);
  } else if (e.target.classList.contains("compass-btn")) {
    changeDir(e.target.getAttribute("data-direction"), camera);
  } else {
    console.log(currFocusObject);
    // moveCameraTo(camera, currFocusObject);
    selectSample(camera, currFocusObject);
  }
};

enterBuilding(camera);
