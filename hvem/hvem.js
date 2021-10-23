"use strict";

document.addEventListener("DOMContentLoaded", start);

let elementsToPaint = [];
let welcome = false; 

async function start() {
  let response = await fetch("cover2.svg");
  let svgData = await response.text();
  let menuResponse = await fetch("menu.svg");
  let menuSvgData = await menuResponse.text();
  let ShoeResponse = await fetch("shoeSVG.svg");
  let ShoeSvgData = await ShoeResponse.text();
  document.querySelector("nav").innerHTML = menuSvgData;
  document.querySelector("#svgWrapper").innerHTML = svgData;
  document.querySelector("#shoeConfig").innerHTML = ShoeSvgData;
 
  removeRight()
  removeLeft()

  manipulateSVG();
}

function manipulateSVG() {
  document.querySelectorAll("#circle, #bars").forEach((elem) => elem.addEventListener("mouseover", hover));
  document.querySelectorAll("#circle").forEach((elem) => elem.addEventListener("mouseout", hoverOut));
  document.querySelector("#menu").addEventListener("click", options);
  document.querySelector("#options > img").addEventListener("animationend", () => document.querySelector("#options a").classList.remove("hide"));
  document.querySelector("#options > img").addEventListener("animationend", () => document.querySelector("#kontakt").classList.remove("hide"));

  // document.querySelector("#tekstanimation").addEventListener("animationend", () => document.querySelector("#portraet").classList.add("fadeUp"))

  //SHOE CONFIG
  document.querySelectorAll("#shoeConfig svg path").forEach(element => {
    element.style.fill = 'rgba(0, 0, 0, 0)'
    element.addEventListener("mouseover", mouseOver)
    element.addEventListener("mouseout", mouseOut)
    element.addEventListener("click", pickPart)
})

  // document.querySelector("#menu").addEventListener("click", options);
}

function hover() {
  document.querySelector("#circle").classList.remove("hide");
}
function hoverOut() {
  document.querySelector("#circle").classList.add("hide");
}
function options() {
  document.querySelector("#options > img").classList.add("fadeIn");
}
const propA = {
  duration: 2000,
  iterations: 1,
  direction: "alternate",
  easing: "cubic-bezier(0, 1, 1, 1)",
  composite: 'add'
};

const keyA = { transform: "translate3D(100%, -20%, 0)" };
const keyB = { transform: "translate3D(-20%, 20%, 0) rotateX(43deg)" };

function removeRight() {
  const animation = document.querySelector("#a").animate(keyA, propA);
  document.querySelector("#mainNav").style.opacity = 1;
  animation.onfinish = (event) => {
    document.querySelector("#a").style.transform = "translate3D(100%, -20%, 0)";
    event.currentTarget.pause();
  };
  if (!welcome) infoMessage();
}

function removeLeft() {
  const animation = document.querySelector("#b").animate(keyB, propA);
  animation.onfinish = (event) => {
    document.querySelector("#b").style.transform = "translate3D(-20%, 20%, 0)  rotateX(43deg)";
    document.querySelector("#contentContainer").classList.remove("hide")
    event.currentTarget.pause();
  };
  if (!welcome) infoMessage();
}

function infoMessage() {
  welcome = true;
  const message = 
    `My name is Lasse Mark Smedegaard
    $i'm a frontend developer and multimediedesigner
    $
    $ My primary areas are:
    $
    $- Graphics Design
    $- Front-End Development
    $- Content Creation
    $- Digital Marketing`.split("");
  const p = document.querySelector("#tekstAnimation");
  let gradientIndex = 0
  message.forEach((char, index) => {
    if (char === '$') {
      const linebreak = document.createElement("br")
      p.append(linebreak)
      gradientIndex = 0
    } else {
      const span = document.createElement("span");
      span.classList.add("fadeFromBelow");
      span.innerHTML = char === " " ? "&nbsp" : char;
      span.style.color = `rgb(${4 * (gradientIndex + 25)}, ${4 * (gradientIndex + 25)}, 255)`;
      p.append(span);
      setTimeout(() => span.classList.add("fadeFromBelowActive"), 40 * index);
      gradientIndex++

    }
  });
  document.querySelector("#portraet").classList.add("fadeUp")
}





//SHOE CONFIG
function mouseOver (event) {
  console.log(event.currentTarget.id)
  event.target.style.fill = "rgba(0, 255, 0, 0.1)"
  if(event.currentTarget.id === "sole"){
      document.querySelectorAll("#sole").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } else if(event.currentTarget.id === "LOGO"){
      document.querySelectorAll("#LOGO").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } else if(event.currentTarget.id === "backlayer"){
      document.querySelectorAll("#backlayer").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } else if(event.currentTarget.id === "shoelace"){
      document.querySelectorAll("#shoelace").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } else if(event.currentTarget.id === "frontLayer"){
      document.querySelectorAll("#frontLayer").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } else if(event.currentTarget.id === "ribbon"){
      document.querySelectorAll("#ribbon").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } else if(event.currentTarget.id === "ribbonTag"){
      document.querySelectorAll("#ribbonTag").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } else if(event.currentTarget.id === "topSole"){
      document.querySelectorAll("#topSole").forEach(element => element.style.fill = "rgba(0, 255, 0, 0.1)")
  } 
}

function mouseOut () {
      document.querySelectorAll("#shoeConfig > svg path").forEach(element => {
          if (!elementsToPaint.includes(element)) element.style.fill = "rgba(0, 0, 0 , 0)"
      })

}
function pickPart (event) {
  const elements = document.querySelectorAll(`#${event.target.id}`)
  elementsToPaint.push(...elements)
  console.log("elementstopaint", elementsToPaint)
}