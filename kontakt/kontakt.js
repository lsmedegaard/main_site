"use strict";

document.addEventListener("DOMContentLoaded", start);

let optionsClicked = false;



async function start() {
  let response = await fetch("coverKontakt.svg");
  let svgData = await response.text();
  let menuResponse = await fetch("/hvem/menu.svg");
  let menuSvgData = await menuResponse.text();
  document.querySelector("#mainNav").innerHTML = menuSvgData;
  document.querySelector("#svgWrapper").innerHTML = svgData;
  removeRight()
  removeLeft()

  manipulateSVG();
}

function manipulateSVG() {
  document.querySelectorAll("#circle, #bars").forEach((elem) => elem.addEventListener("mouseover", () => document.querySelectorAll('#circle, #bars').forEach(elem => elem.classList.remove('hide'))));
  document.querySelectorAll("#circle, #bars").forEach((elem) => elem.addEventListener("mouseout", () => document.querySelectorAll('#circle').forEach(elem => elem.classList.add('hide'))));

  document.querySelector("#menu").addEventListener("click", () => {
    optionsClicked = !optionsClicked
    if (optionsClicked === true) {
      document.querySelector('#options > img').classList.add("fadeInActive");
      setTimeout(() => {
        document.querySelector("#kontakt").classList.remove("hide")
        document.querySelector("#startside").classList.remove("hide")
        document.querySelector("#hvem").classList.remove("hide")
      }, 100);
    }else {
      document.querySelector('#options > img').classList.remove("fadeInActive");
      document.querySelector('#kontakt').classList.add("hide");
      document.querySelector('#hvem').classList.add("hide");
      document.querySelector('#startside').classList.add("hide");

    }})

}

const propA = {
    duration: 2000,
    iterations: 1,
    direction: "alternate",
    easing: "cubic-bezier(0, 1, 1, 1)",
  };
  
  const keyA = { transform: "translate3D(0, 55%, 0)" };
  const keyB = { transform: "translate3D(0, -70%, 0)" };
  
  function removeRight() {
    const animation = document.querySelector("#a").animate(keyA, propA);
    document.querySelector("#mainNav").style.opacity = 1;
    animation.onfinish = (event) => {
      document.querySelector("#a").style.transform = "translate3D(0, 55%, 0)";
      event.currentTarget.pause();
    };
  }
  
  function removeLeft() {
    const animation = document.querySelector("#b").animate(keyB, propA);
    animation.onfinish = (event) => {
      document.querySelector("#b").style.transform = "translate3D(0, -70%, 0)";
      document.querySelector("#kontaktBlok").classList.remove("hide")
      document.querySelector("#name").classList.remove("hide")
      document.querySelector("#mail").classList.remove("hide")
      document.querySelector("#linkedIn").classList.remove("hide")
      document.querySelector("#pb").classList.remove("hide")
      event.currentTarget.pause();
    };
  }

