"use strict";

document.addEventListener("DOMContentLoaded", start);

let elementsToPaint = [];

let optionsClicked = false;

let creationsClicked = false;

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
  


  removeRight();
  removeLeft();
  infoMessage();

  manipulateSVG();

  // mediaQueries();
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





  //SHOE CONFIG
  document.querySelectorAll("#shoeConfig svg path").forEach((element) => {
    element.style.fill = "rgba(0, 0, 0, 0)";
    element.addEventListener("click", pickPart);
  });


}

// function mediaQueries () {
//   const mediaQuerySmall = window.matchMedia('(max-width: 500px)')
//   const trekant = document.querySelector("#a")

//   if (mediaQuerySmall.matches) {
//     console.log("lol")
//     trekant.setAttribute("transform", "rotate(45)");
//   }
// }


const propA = {
  duration: 2000,
  iterations: 1,
  direction: "alternate",
  easing: "cubic-bezier(0, 1, 1, 1)",
  composite: "add",
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
}

function removeLeft() {
  const animation = document.querySelector("#b").animate(keyB, propA);
  animation.onfinish = (event) => {
    document.querySelector("#b").style.transform = "translate3D(-20%, 20%, 0)  rotateX(43deg)";
    document.querySelector("#contentContainer").classList.remove("hide");
    event.currentTarget.pause();
  };
}

async function infoMessage () {
  await writeMessage(
    `My name is Lasse Mark Smedegaard
    $i'm a frontend developer and multimediedesigner
    $
    $ My primary areas are:`);
  
  await writeMessage(`$`);
  await writeMessage(`-Graphics Design`);
  await writeMessage('- Front-End Development');
  await writeMessage('- Content Creation');
  await writeMessage('- Digital Marketing');
  await writeMessage('$');
  await writeMessage('-> Try some of my creations <-',
    {
      id: 'creations',
      eventListeners: {
        mouseover: () => {
          document.querySelectorAll("#creations > span").forEach(elem => {
            elem.style.textShadow = '0.1vw 0.1vw 0.03vw #39ff14, 0.5vw 0.5vw 0.5vw'
            elem.style.cursor = 'pointer'
          });
        },
        mouseout: () => {
          document.querySelectorAll("#creations > span").forEach(elem => {
            elem.style.textShadow = 'none'
          });
        },
        click: () => {
          creationsClicked = !creationsClicked
          document.querySelectorAll("#pil, #pil2").forEach(elem => elem.classList.toggle('hide'))
          document.querySelector("#shoeConfig").classList.toggle('hide')
          document.querySelector("#favColor").classList.add('hide')
          document.querySelector('#gameImg').classList.toggle('hide')
          if (!creationsClicked) {
            document.querySelector("#game").innerHTML = ''
            document.querySelector("#gameText").innerHTML = ''
            document.querySelector("#shoeText").innerHTML = ''
          }else {
            writeMessage('a South Park/Corona themed game', { appendId: '#gameText', eventListeners: {}})

            writeMessage('Try it here', { appendId: '#game', eventListeners: {
              click: () => window.location = "spil/index.html",
              mouseover: () => {
                document.querySelectorAll("#game > div > span").forEach(elem => {
                  elem.style.textShadow = '0.1vw 0.1vw 0.03vw #39ff14, 0.5vw 0.5vw 0.5vw'
                  elem.style.cursor = 'pointer'
                })
              },
              mouseout: () => {
                document.querySelectorAll("#game > div > span").forEach(elem => {
                  elem.style.textShadow = 'none'
                })
              }
            }}),
            writeMessage('A sneaker color configurator', { appendId: '#shoeText', eventListeners: {}})
          }
        }
      },
      appendId: '#tekstAnimation'
    })
}


// writeMessage tager message, som er en string og et valgfrit objekt, der kan indeholde eventListeners og id.
// Hvis eventListeners ikke passes er den = {}, og hvis id ikke passes er den = null

async function writeMessage(message, { eventListeners, id, appendId } = { eventListeners: {}, id: null, appendId: '#tekstAnimation' }) {
  
  // bruger split for at converte string til array
  const messageArray = message.split("");

  // det element som teksten skal sættes på i DOM
  const elementToAppendTo = document.querySelector(appendId);

  // der laves et wrapper-element, som teksten samles i, så bogstaverne grupperes ift. event listeners og styling
  const wrapperElement = document.createElement('div')

  // hvis id passes bliver det sat.
  if (id) wrapperElement.setAttribute('id', id)

  // looper keys i eventListeners objekt, fx "click", "mouseover" osv..
  // Hvis eventListeners ikke passes, er det lig med {} og har altså ingen keys og loopet kører derfor ikke
  for (const event in eventListeners) {
    wrapperElement.addEventListener(event, eventListeners[event])
  }

  // appender wrapperElementet i DOM
  elementToAppendTo.append(wrapperElement);

  // gradientIndex bruges til at nulstille gradient ved linjeskift
  let gradientIndex = 0;

  // looper alle bogstaver i messageArray
  // bruge <<for await ... of>> i stedet for .forEach fordi ellers kan jeg ikke await
  for await (const char of messageArray) {
    // $ repræsenterer et linebreak
    if (char === "$") {
      // laver et <br /> element og appender i DOM
      const linebreak = document.createElement("br");
      wrapperElement.append(linebreak);
      // nulstiller gradient
      gradientIndex = 0;
    // hvis bogstav ikke er et $, skal det skrives i DOM ved at appende på wrapperElement
    } else {
      // laver et span til hver enkelt bogstav, så deres animationer og styling kan adskilles
      const span = document.createElement("span");

      // animations-class
      span.classList.add("fadeFromBelow");

      // hvis mellemrum skrives der "&nbsp", som er et HTML-sikkert mellemrum.
      // ellers bliver det parsed som overflødig whitespace.
      span.innerHTML = char === " " ? "&nbsp" : char;

      // det første bogstav vil have farven rgb(25, 25, 255)
      // hvert bogstav i samme linje får herefter lagt 4 til r og g fordi gradientIndex stiger med 1
      // dvs. bogstav nummer 2 vil have farven (29, 29, 255) og så (33, 33, 255) osv.
      // det lavet en gradient effekt
      span.style.color = `rgb(${4 * (gradientIndex + 25)}, ${4 * (gradientIndex + 25)}, 255)`;

      // bogstaves appendes i DOM
      wrapperElement.append(span)

      // her laver jeg et timeout og venter med at gå videre i koden vha. await og et Promise.
      // await venter på at Promise har kaldt resolve(), som først sker inde i timeout.
      // timeout sker først efter 40 ms. og fjerner en class, som trigger en animation.
      await new Promise(resolve => setTimeout(() => {
        span.classList.add("fadeFromBelowActive")
        resolve()
      }, 40))
      // gradientIndex stiger så næste bogstav får en anden farve
      gradientIndex++;
    }
  };
}



function pickPart(event) {
  const input = document.querySelector("#favColor");
  input.classList.remove("hide")
  const elements = document.querySelectorAll(`#${event.currentTarget.id}`);
  elements.forEach(element => element.style.fill = 'yellow')
  elementsToPaint.push(...elements);

  
  input.addEventListener("input", function (event) {
    let color = event.target.value
    elementsToPaint.forEach(elem => {
      elem.style.fill = color
      elem.style.opacity = 0.6
    })
    elementsToPaint = []

  });
}

const mediaQuery = window.matchMedia('(max-width: 500px)')
const trekant = document.querySelector("#svgWrapper > svg")
console.log(trekant, "trekant")


