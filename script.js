"use strict";

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("images/cover.svg");
  let svgData = await response.text();
  let menuResponse = await fetch("images/menu.svg");
  let menuSvgData = await menuResponse.text();
  document.querySelector("nav").innerHTML = menuSvgData;
  document.querySelector("#svgWrapper").innerHTML = svgData;
  manipulateSVG();
}

function manipulateSVG() {
  document.querySelectorAll("#a").forEach((elem) => {
    elem.addEventListener("mouseover", removeRight);
  });
  document.querySelectorAll("#circle, #bars").forEach((elem) => elem.addEventListener("mouseover", hover));
  document.querySelectorAll("#circle").forEach((elem) => elem.addEventListener("mouseout", hoverOut));
  document.querySelectorAll("#circle").forEach((elem) => elem.addEventListener("click", options));
  document.querySelectorAll("#b").forEach((elem) => {
    elem.addEventListener("mouseover", removeLeft);
  });
  console.log(menu);
}

function hover() {
  document.querySelector("#circle").classList.remove("hide");
}
function hoverOut() {
  document.querySelector("#circle").classList.add("hide");
}

function options() {
  console.log("lol");
}
const propA = {
  duration: 2000,
  iterations: 1,
  direction: "alternate",
  easing: "cubic-bezier(0, 1, 1, 1)",
};

const keyA = { transform: "translate3D(20%, 20%, 0)" };
const keyB = { transform: "translate3D(-20%, -20%, 0)" };

function removeRight() {
  const animation = document.querySelector("#a").animate(keyA, propA);
  document.querySelector("#mainNav").style.opacity = 1;
  animation.onfinish = (event) => {
    document.querySelector("#a").style.transform = "translate3D(20%, 20%, 0)";
    event.currentTarget.pause();
  };
}

function removeLeft() {
  const animation = document.querySelector("#b").animate(keyB, propA);
  animation.onfinish = (event) => {
    document.querySelector("#b").style.transform = "translate3D(-20%, -20%, 0)";
    event.currentTarget.pause();
  };
}

//functioner til animation af velkomsthilsen
document.addEventListener("DOMContentLoaded", startWelcome);
function startWelcome() {
  console.log("this is starting, les go");
  let text = getHtmlText();
  deleteHtmlText();
  let textArray = stringToArray(text);

  appendChar(textArray);
  /* setAnimationDelay(); */
}

function appendChar(array) {
  for (let i = 0; i < array.length; i++) {
    let charSpan = document.createElement("span");
    charSpan.append(array[i]);
    charSpan.classList.add("fadeIn");

    charSpan.style.animationDelay = `${i}` * 300 + "ms";

    document.querySelector("h1").appendChild(charSpan);
  }
}

function getHtmlText() {
  let htmlText = document.querySelector("h1").innerText;
  return htmlText;
}

function deleteHtmlText() {
  document.querySelector("#tekstAnimation").innerText = "";
  console.log("deleting text");
}

function stringToArray(string) {
  let charArray = string.split("");
  console.log(charArray);
  return charArray;
}
