import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import { printWalls } from "./walls.js";
import { printPaintings } from "./paintings.js";

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

const spotLight = new THREE.AmbientLight();
spotLight.position.set(0, 170, 35);
scene.add(spotLight);
// spotLight.castShadow = true;

const spot2Light = new THREE.SpotLight("white", 0.3);
let spot2Helper = new THREE.SpotLightHelper(spot2Light);
spot2Light.position.set(175, 105, 5);
// spot2Light.rotation.x = -0.5;
// spot2Light.rotation.y = -2.5;
// spot2Light.rotation.z = 5;
scene.add(spot2Light);
// scene.add(spot2Helper);
spot2Light.castShadow = true;

const directLight = new THREE.DirectionalLight("white");
let directHelper = new THREE.DirectionalLightHelper(directLight);

directLight.position.set(0, 100, 0);
directLight.castShadow = true;

// scene.add(directLight);
// scene.add(directHelper);

printWalls(scene);
printPaintings(scene);

let sphereGeo = new THREE.SphereGeometry(8, 55, 25);
let sphereMaterial = new THREE.MeshLambertMaterial({ color: "red" });
let sphere = new THREE.Mesh(sphereGeo, sphereMaterial);

sphere.castShadow = true;

sphere.position.y = 15;
scene.add(sphere);

let oc = new OrbitControls(camera, renderer.domElement);
oc.update();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

onmousemove = (e) => onPointerMove(e);

function animation() {
  renderer.render(scene, camera);
  TWEEN.update();

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length) {
    if (intersects[0].object.userData.title) {
      console.log("hovering over " + intersects[0].object.userData.name);
      printInfo(intersects[0].object.userData);
    }
  }

  requestAnimationFrame(animation);
}

animation();

onresize = (e) => {
  renderer.setSize(innerWidth, innerHeight);
};

function enterBuilding() {
  let cameraStart = { x: 395, y: 345, z: 685 };
  new TWEEN.Tween(cameraStart)
    .to({ x: 125, y: 25, z: 150 }, 2000)
    .start()
    .onUpdate(() => {
      camera.position.x = cameraStart.x;
      camera.position.y = cameraStart.y;
      camera.position.z = cameraStart.z;
    })
    .onComplete(() => {
      rotateUser();
      console.log(camera.rotation);
    });
}

function rotateUser() {
  let cameraStart = { x: -0.46, y: 0.47, z: 0.226 };
  new TWEEN.Tween(cameraStart)
    .to({ x: -0.05, y: 0.12, z: 0.02 }, 2000)
    .start()
    .onUpdate(() => {
      camera.rotation.x = cameraStart.x;
      camera.rotation.y = cameraStart.y;
      camera.rotation.z = cameraStart.z;
    })
    .onComplete(() => {
      //   rotateUser()
    });
}

function printInfo(info) {
  document.querySelector("#title").innerHTML = info.title;
  document.querySelector("#description").innerHTML = info.description;
  let featuresHTML = "";
  info.features.forEach((feature) => {
    featuresHTML += `<li>${feature}</li>`;
  });
  document.querySelector("#features").innerHTML = featuresHTML;
}

enterBuilding();
