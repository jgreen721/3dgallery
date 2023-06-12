import * as THREE from "three";

const loader = new THREE.TextureLoader();

export const printPaintings = async (scene) => {
  let response = await fetch("data.json");
  let { samples: data } = await response.json();
  console.log(data);

  data.forEach((item) => {
    const spotLight = new THREE.SpotLight("white");
    const slHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(slHelper);
    spotLight.intensity = 0.23;

    spotLight.position.y = 70;
    spotLight.position.x = item.pos.x += 1;
    spotLight.position.z = item.pos.z += 1;
    let boxGeometry = new THREE.BoxGeometry(
      item.size.x + 5,
      item.size.y + 5,
      2
    );
    let boxMaterial = new THREE.MeshLambertMaterial({ color: "tan" });
    let frame = new THREE.Mesh(boxGeometry, boxMaterial);

    let paintingTexture = loader.load(item.image);
    let paintingGeometry = new THREE.PlaneGeometry(item.size.x, item.size.y);
    let paintingMaterial = new THREE.MeshLambertMaterial({
      map: paintingTexture,
    });
    let painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.y = 10;
    let imageX = item.pos.x;
    let imageZ = item.pos.z;
    if (item.rotation == "turnLeft") {
      painting.rotation.y = Math.PI * 0.5;
      frame.rotation.y = Math.PI * 0.5;
      imageX = item.pos.x + 2;
      spotLight.position.x = item.pos.x + 5;
    }
    if (item.rotation == "turnRight") {
      painting.rotation.y = -Math.PI * 0.5;
      frame.rotation.y = -Math.PI * 0.5;
      imageX = item.pos.x - 2;
      spotLight.position.x = item.pos.x - 5;
    }

    if (imageX == item.pos.x) {
      console.log("HUH???");
      imageZ += 2;
      // spotLight.position.z = item.pos.z - 5;
    }
    painting.position.x = imageX;
    painting.position.y = item.pos.y;
    painting.position.z = imageZ;
    painting.userData.title = item.name;
    painting.userData.builtWith = item.builtWith;
    painting.userData.description = item.description;
    painting.userData.features = item.features;
    // painting.userData.cameraPOS.x = item.cameraPOS.x;
    // painting.userData.cameraPOS.y = item.cameraPOS.y;
    // painting.userData.cameraPOS.z = item.cameraPOS.z;
    painting.userData.cameraVector = {
      x: item.cameraPOS.x,
      y: item.cameraPOS.y,
      z: item.cameraPOS.z,
    };

    painting.userData.cameraROT = {
      x: item.cameraROT.x,
      y: item.cameraROT.y,
      z: item.cameraROT.z,
    };
    frame.position.x = item.pos.x;
    frame.position.y = item.pos.y;
    frame.position.z = item.pos.z;
    frame.castShadow = true;
    frame.receiveShadow = true;

    scene.add(painting);
    scene.add(frame);
    console.log("scene added");

    scene.add(spotLight);
  });
};
