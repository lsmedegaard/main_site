"use strict";

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("images/cover.svg");
  let svgData = await response.text();
  document.querySelector("#animation").innerHTML = svgData;
  manipulateSVG();
}

function manipulateSVG() {
  console.log("lol");
  document.querySelectorAll("#a").forEach((elem) => {
    elem.style.fill = "green";
    elem.addEventListener("mouseover", removeRight);
  });
  document.querySelectorAll("#b").forEach((elem) => {
    elem.style.fill = "green";
    elem.addEventListener("mouseover", removeLeft);
  });
}

const propA = {
  duration: 1000,
  iterations: 1,
  direction: "alternate",
  easing: "ease-in-out",
};

const keyB = { transform: "translate3D(50%, 50%, 0)", color: "#000" };
const keyA = { transform: "translate3D(-50%, -50%, 0)", color: "#000" };

function removeRight() {
  console.log("lol");
  document.querySelectorAll("#a").forEach((elem) => elem.animate(keyB, propA));
}

function removeLeft() {
  console.log("lol");
  document.querySelectorAll("#b").forEach((elem) => elem.animate(keyA, propA));
}

// const propA = {
//   duration: 3000,
//   iterations: Infinity,
// };

// const keyA = [
//   { transform: "rotate(0) translate3D(-50%, -50%, 0)", color: "#000" },
//   { color: "#431236", offset: 0.2 },
// ];

// function manipulateSVG() {
//   document.querySelectorAll("#star_1").forEach((elem) => elem.addEventListener("mouseover", smallA));
//   document.querySelectorAll("#star_2").forEach((elem) => elem.addEventListener("mouseover", smallB));
//   document.querySelectorAll("#star_3").forEach((elem) => elem.addEventListener("mouseover", smallC));
// }

// function smallA() {
//   document.querySelectorAll("#star_1").forEach((elem) => elem.animate(keyA, propA));
// }
// function smallB() {
//   document.querySelectorAll("#star_2").forEach((elem) => elem.animate(keyA, propA));
// }
// function smallC() {
//   document.querySelectorAll("#star_3").forEach((elem) => elem.animate(keyA, propA));

/* 
const propA = {
  duration: 1000,
  iterations: 1,
  direction: "alternate",
  easing: "ease-in-out",
};

const keyA = [{ transform: "scale(0)" }, { transform: "scale(1)" }];

const propB = {
  duration: 3000,
  iterations: 1,
  direction: "alternate",
  easing: "ease-in-out",
};

const keyB = [{ transform: "scale(1)" }, { transform: "scale(0)" }];

const trekantA = document.querySelector("#trekantA");
const trekantC = document.querySelector("#trekantC");

trekantA.addEventListener("mouseover", small);

function small() {
  trekantA.animate(keyB, propB);
  trekantC.animate(keyB, propB);
}
 */
