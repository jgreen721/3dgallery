import { moveCameraTo } from "./tweens.js";

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
