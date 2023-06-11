import * as THREE from "three";

let loader = new THREE.TextureLoader();
let woodenFloorTexture = loader.load("/textures/woodenfloor.webp");
let blackTilesTexture = loader.load("/textures/blackfloortile.webp");
let grassTexture = loader.load("/textures/grass.jpeg");
let roofTexture = loader.load("/textures/rooftiles.jpeg");

export const printWalls = (scene) => {
  let circleGeo = new THREE.CircleGeometry(350, 50);
  let circleMaterial = new THREE.MeshLambertMaterial({
    // color: "green",
    map: grassTexture,
    side: THREE.DoubleSide,
  });
  let circle = new THREE.Mesh(circleGeo, circleMaterial);
  circle.rotation.x = Math.PI * 0.5;
  circle.receiveShadow = true;
  scene.add(circle);

  let floorGeo = new THREE.BoxGeometry(300, 300, 10);
  let floorMaterial = new THREE.MeshLambertMaterial({
    color: "",
    map: woodenFloorTexture,
    side: THREE.DoubleSide,
  });
  let floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = -Math.PI * 0.5;
  floor.receiveShadow = true;
  scene.add(floor);

  let leftGeo = new THREE.BoxGeometry(300, 75, 3);
  let leftMaterial = new THREE.MeshLambertMaterial({
    color: "white",
    map: blackTilesTexture,
    side: THREE.DoubleSide,
  });
  let left = new THREE.Mesh(leftGeo, leftMaterial);
  left.rotation.y = -Math.PI * 0.5;
  left.position.y = 32;
  left.position.x = -152;
  left.castShadow = true;
  left.receiveShadow = true;
  scene.add(left);

  let rightGeo = new THREE.BoxGeometry(300, 75, 3);
  let rightMaterial = new THREE.MeshLambertMaterial({
    color: "white",
    map: blackTilesTexture,

    side: THREE.DoubleSide,
  });
  let right = new THREE.Mesh(rightGeo, rightMaterial);
  right.rotation.y = -Math.PI * 0.5;
  right.position.y = 32;
  right.position.x = 152;
  right.castShadow = true;
  right.receiveShadow = true;

  scene.add(right);

  let backGeo = new THREE.BoxGeometry(304, 75, 3);
  let backMaterial = new THREE.MeshLambertMaterial({
    color: "white",
    map: blackTilesTexture,

    side: THREE.DoubleSide,
  });
  let back = new THREE.Mesh(backGeo, backMaterial);
  //   back.rotation.y = -Math.PI * 0.5;
  back.position.y = 32;
  back.position.z = -152;
  back.castShadow = true;
  back.receiveShadow = true;
  scene.add(back);

  let rightHallGeo = new THREE.BoxGeometry(224, 75, 3);
  let rightHallMaterial = new THREE.MeshLambertMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  let rightHall = new THREE.Mesh(rightHallGeo, rightHallMaterial);
  rightHall.rotation.y = -Math.PI * 0.5;
  rightHall.position.y = 32;
  rightHall.position.x = 100;
  rightHall.position.z = 38;
  rightHall.castShadow = true;
  rightHall.receiveShadow = true;
  scene.add(rightHall);

  let frontGeo = new THREE.BoxGeometry(255, 75, 3);
  let frontMaterial = new THREE.MeshLambertMaterial({
    color: "white",
    map: blackTilesTexture,

    side: THREE.DoubleSide,
  });
  let front = new THREE.Mesh(frontGeo, frontMaterial);
  front.position.y = 32;
  front.position.z = 151;
  front.position.x = -24;
  front.castShadow = true;
  front.receiveShadow = true;
  scene.add(front);

  let ceilingGeo = new THREE.BoxGeometry(304, 304, 3);
  let ceilingMaterial = new THREE.MeshLambertMaterial({
    color: "",
    map: roofTexture,
    side: THREE.DoubleSide,
  });

  let ceiling = new THREE.Mesh(ceilingGeo, ceilingMaterial);
  ceiling.rotation.x = Math.PI * 0.5;
  ceiling.position.y = 70;

  ceiling.castShadow = true;
  ceiling.receiveShadow = true;
  scene.add(ceiling);
};
