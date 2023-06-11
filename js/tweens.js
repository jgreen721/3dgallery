import * as TWEEN from "@tweenjs/tween.js";

export const enterBuilding = (camera) => {
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
      rotateUser(camera);
      console.log(camera.rotation);
    });
};

export const rotateUser = (camera) => {
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
};

export const moveCameraTo = (camera, object) => {
  console.log("move camera!!", object, camera.position, camera.rotation);
  new TWEEN.Tween(camera.position)
    .to(
      {
        x: object.cameraVector.x,
        y: object.cameraVector.y,
        z: object.cameraVector.z,
      },
      2000
    )
    .start()
    .onUpdate(() => {
      camera.position.x = camera.position.x;
      camera.position.y = camera.position.y;
      camera.position.z = camera.position.z;
    })
    .onComplete(() => {
      console.log("user should be looking at exhibit now!");
      let startCameraROT = {
        x: camera.rotation._x,
        y: camera.rotation._y,
        z: camera.rotation._z,
      };
      new TWEEN.Tween(startCameraROT)
        .to(
          {
            x: parseFloat(object.cameraROT.x),
            y: parseFloat(object.cameraROT.y),
            z: parseFloat(object.cameraROT.z),
          },
          2000
        )
        .start()
        .onUpdate(() => {
          camera.rotation.x = startCameraROT.x;
          camera.rotation.y = startCameraROT.y;
          camera.rotation.z = startCameraROT.z;
        });
    });
};
