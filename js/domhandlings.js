import { moveCameraTo } from "./tweens.js";
import * as TWEEN from "@tweenjs/tween.js";

export const printInfo = (info) => {
  document.querySelector("#title").innerHTML = info.title;
  document.querySelector("#description").innerHTML = info.description;
  let featuresHTML = "";
  info.features.forEach((feature) => {
    featuresHTML += `<li>${feature}</li>`;
  });
  document.querySelector("#features").innerHTML = featuresHTML;
};

export const selectSample = (camera, object) => {
  if (object == undefined) {
    console.log("please click on valid sample object!");
  } else {
    console.log("move user to view ", object.userData.title);
    moveCameraTo(camera, object.userData);
  }
};

export const returnUser = (camera) => {
  new TWEEN.Tween(camera.position)
    .to({ x: 125, y: 25, z: 150 }, 2000)
    .start()
    .onUpdate(() => {
      camera.position.x = camera.position.x;
      camera.position.y = camera.position.y;
      camera.position.z = camera.position.z;
    })
    .onComplete(() => {
      console.log("USER SHOULD BE RETURNED!!");
      // rotateUser(camera);
      // console.log(camera.rotation);
      new TWEEN.Tween(camera.rotation)
        .to({ x: -0.049, y: 0.12, z: 0.019 }, 1000)
        .start()
        .onUpdate(() => {
          camera.rotation.x = camera.rotation.x;
          camera.rotation.y = camera.rotation.y;
          camera.rotation.z = camera.rotation.z;
        });
    });
};

export const changeDir = (direction, camera) => {
  console.log("Direction", direction);
  switch (direction) {
    case "left":
      camera.rotation.y += 0.05;
      break;

    case "right":
      camera.rotation.y -= 0.05;
      break;

    case "up":
      camera.rotation.x += 0.05;
      camera.rotation.z -= 0.05;
      break;

    case "down":
      camera.rotation.x -= 0.05;
      camera.rotation.z += 0.05;
      break;
  }
};
