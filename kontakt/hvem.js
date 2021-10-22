"use strict";
document.addEventListener("DOMContentLoaded", start);
async function start() {
  let response = await fetch("cover2.svg");
  let svgData = await response.text();
  let menuResponse = await fetch("menu.svg");
  let menuSvgData = await menuResponse.text();
  document.querySelector("nav").innerHTML = menuSvgData;
  document.querySelector("#svgWrapper").innerHTML = svgData;

  manipulateSVG();
}

function manipulateSVG() {
  document.querySelectorAll("#a").forEach((elem) => elem.addEventListener("mouseover", removeRight));
  document.querySelectorAll("#b").forEach((elem) => elem.addEventListener("mouseover", removeLeft));
  document.querySelectorAll("#circle, #bars").forEach((elem) => elem.addEventListener("mouseover", hover));
  document.querySelectorAll("#circle").forEach((elem) => elem.addEventListener("mouseout", hoverOut));
  // document.querySelector("#menu").addEventListener("click", options);
  console.log(menu);
}

function hover() {
  document.querySelector("#circle").classList.remove("hide");
}
function hoverOut() {
  document.querySelector("#circle").classList.add("hide");
}
const propA = {
  duration: 2000,
  iterations: 1,
  direction: "alternate",
  easing: "cubic-bezier(0, 1, 1, 1)",
};

const keyA = { transform: "translate3D(100%, -20%, 0)" };
const keyB = { transform: "translate3D(-20%, 20%, 0)" };

function removeRight() {
  const animation = document.querySelector("#a").animate(keyA, propA);
  document.querySelector("#mainNav").style.opacity = 1;
  animation.onfinish = (event) => {
    document.querySelector("#a").style.transform = "translate3D(100%, -20%, 0)";
    event.currentTarget.pause();
  };
  // if (!welcome) startWelcome();
}

function removeLeft() {
  const animation = document.querySelector("#b").animate(keyB, propA);
  animation.onfinish = (event) => {
    document.querySelector("#b").style.transform = "translate3D(-20%, 20%, 0)";
    event.currentTarget.pause();
  };
  // if (!welcome) startWelcome();
}
