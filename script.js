"use strict";

document.addEventListener("DOMContentLoaded", start);

let optionsClicked = false;

let welcome = false;

async function start() {
  let response = await fetch("images/cover.svg");
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
      document.querySelector('#options > img').classList.add("fadeIn");
      document.querySelector('#options > img').addEventListener("animationend", () => document.querySelector("#kontakt").classList.remove("hide"));
      document.querySelector('#options > img').addEventListener("animationend", () => document.querySelector("#startside").classList.remove("hide"));
      document.querySelector('#options > img').addEventListener("animationend", () => document.querySelector("#hvem").classList.remove("hide"));
    }else {
      document.querySelector('#options > img').classList.remove("fadeIn");
      document.querySelector('#kontakt').classList.add("hide");
      document.querySelector('#hvem').classList.add("hide");
      document.querySelector('#startside').classList.add("hide");

    }})




}

function options() {
  document.querySelector("#options > img").classList.add("fadeIn");
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
  if (!welcome) startWelcome();
}

function removeLeft() {
  const animation = document.querySelector("#b").animate(keyB, propA);
  animation.onfinish = (event) => {
    document.querySelector("#b").style.transform = "translate3D(-20%, -20%, 0)";
    event.currentTarget.pause();
  };
  if (!welcome) startWelcome();

}

function startWelcome() {
  welcome = true;
  const message = "Hi! Welcome to my site".split("");
  const h1 = document.querySelector("#tekstAnimation");
  message.forEach((char, index) => {
    if (char === '$') {
      const linebreak = document.createElement("br")
      h1.append(linebreak)
    } else {
      const span = document.createElement("span");
      span.classList.add("fadeFromBelow");
      span.innerHTML = char === " " ? "&nbsp" : char;
      span.style.color = `rgb(${5 * index}, ${5 * index}, 255)`;
      h1.append(span);
      setTimeout(() => span.classList.add("fadeFromBelowActive"), 100 * index);
    }
  });
}

// function startWelcome() {
//     const message = 'Welcome to my site'
//     document.querySelector("#tekstAnimation").style.width = message.length + 'ch'
//     const interval = setInterval(() => {
//         const messageLength = document.querySelector("#tekstAnimation").innerHTML.length
//         if (messageLength === message.length) clearInterval(interval)
//         else if (message[messageLength] === ' ') document.querySelector("#tekstAnimation").innerHTML += ` ${message[messageLength + 1]}`
//         else document.querySelector("#tekstAnimation").innerHTML += message[messageLength]
//     }, 200)
// }

//functioner til animation af velkomsthilsen
// document.addEventListener("DOMContentLoaded", startWelcome);
// function startWelcome() {
//   console.log("this is starting, les go");
//   let text = getHtmlText();
//   deleteHtmlText();
//   let textArray = stringToArray(text);

//   appendChar(textArray);
//   /* setAnimationDelay(); */
// }

// function appendChar(array) {
//   for (let i = 0; i < array.length; i++) {
//     let charSpan = document.createElement("span");
//     charSpan.append(array[i]);
//     charSpan.classList.add("fadeIn");

//     charSpan.style.animationDelay = `${i}` * 300 + "ms";

//     document.querySelector("h1").appendChild(charSpan);
//   }
// }

// function getHtmlText() {
//   let htmlText = document.querySelector("h1").innerText;
//   return htmlText;
// }

// function deleteHtmlText() {
//   document.querySelector("#tekstAnimation").innerText = "";
//   console.log("deleting text");
// }

// function stringToArray(string) {
//   let charArray = string.split("");
//   console.log(charArray);
//   return charArray;
// }
