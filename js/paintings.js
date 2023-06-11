import * as THREE from "three";

const loader = new THREE.TextureLoader();

export const printPaintings = async (scene) => {
  let response = await fetch("data.json");
  let { samples: data } = await response.json();
  console.log(data);

  data.forEach((item) => {
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
    }
    if (item.rotation == "turnRight") {
      painting.rotation.y = -Math.PI * 0.5;
      frame.rotation.y = -Math.PI * 0.5;
      imageX = item.pos.x - 2;
    }

    if (imageX == item.pos.x) {
      console.log("HUH???");
      imageZ += 2;
    }
    painting.position.x = imageX;
    painting.position.y = item.pos.y;
    painting.position.z = imageZ;
    painting.userData.title = item.name;
    painting.userData.builtWith = item.builtWith;
    painting.userData.description = item.description;
    painting.userData.features = item.features;
    frame.position.x = item.pos.x;
    frame.position.y = item.pos.y;
    frame.position.z = item.pos.z;
    frame.castShadow = true;
    frame.receiveShadow = true;

    scene.add(painting);
    scene.add(frame);
    console.log("scene added");
  });
};
