document.querySelector("#playKnapSprite").addEventListener("mousedown", playGame);
document.querySelector("#playAgain").addEventListener("mousedown", playGame);
document.querySelector("#rules").addEventListener("mousedown", reglerne);
document.querySelector("#lydIcon").addEventListener("mousedown", musicOn);
document.querySelector("#pauseIcon").addEventListener("mousedown", musicOff);


let points = 0;

let liv = 3;



const figurer = document.querySelector('#game_elements').children


for (let figur of figurer) {
    figur.addEventListener('animationend', figurAnimationendHandler)
    figur.addEventListener('mousedown', figurMousedownHandler)
}



// funktion der bliver kaldt hver gang de er færdige med at gå. 
function figurAnimationendHandler() {
    // gemmer Karens sprite-id i en konstant. 
    const karensId = "figur5_sprite"
    // sørger for jeg får fat i spriten på den figur, der er trykket på
    const sprite = this.children[0]

    // Betingelse for om det er Karen, der er blevet færdig med at gå.
    if (karensId == sprite.id && !sprite.classList.contains('flyv')) {
       
        // adder min game_over skærm og playAgain knap
        document.querySelector("#game_over").classList.add("game_over2")
        document.querySelector("#playAgain").classList.add("playAgain")
        // adder min lost sound
        document.querySelector("#lostSound").play();
        // kalder min pause game function
        pauseGame();

        
    }

    
    // fjerner mine animationer og position
    this.classList.remove("kunde_ankommer")
    this.classList.remove("pos0")
    this.classList.remove("pos1")
    this.classList.remove("pos2")
    sprite.classList.remove('flyv')
    this.style.display = 'none'
        
    // funktion der genstarter min kundeankommer animation hver 100ms efter den er færdig.
    setTimeout(() => {
        // betingelse der gør at hvis point er under 15 og liv er over 0, så bliver min kundeankommer startet.
        if (points < 15 && liv > 0) kundeAnkommer(this);
    }, 100)
}
// function der håndterer museklik på en figur
function figurMousedownHandler() {
    document.querySelector("#lydEffekt").play();
    // adder flyv direkte på spriten
    this.children[0].classList.add('flyv')
    // laver en konstant, udenMaske, og giver den et array med mine kunde uden maske
    const udenMaske = ['figur2_sprite', 'figur3_sprite', 'figur5_sprite']

    // laver en betingelse, der tjekker om det element, der er blevet trykket på findes i mit array
    if (udenMaske.includes(this.children[0].id)) {
        // adder point
        points++
        document.querySelector("#point_number").innerHTML = points
    } else {
        // hvis ikke har man trykket på en med maske, så får man minus point og add gray class til mit hjerte. 
        points--
        document.querySelector("#point_number").innerHTML = points
        document.querySelector("#heart" + liv).classList.add("gray")
        liv--
    }
        // betingelse der tjekker om liv er mindre end 1 
    if (liv < 1) {
        pauseGame();
        // adder min lost screen og playagain knap
        document.querySelector("#game_over").classList.add("game_over")
        document.querySelector("#playAgain").classList.add("playAgain")
        document.querySelector("#lostSound").play();
        document.querySelector("#lostSound").volume = 0.4;

    }
        // --||--
    if (points >= 15) {
        pauseGame();
        //adder win
        document.querySelector("#winSound").play();
        document.querySelector("#winSound").volume = 0.4;
        document.querySelector("#level_complete").classList.add("level_complete")
        document.querySelector("#playAgain").classList.add("playAgain")
    }
}



// Den her gør at man kan skrive .getRandomValue() på alle Arrays og få et random element fra Array
// Hvis man fx. har:
//
// const liste = [1, 2, 3]
//
// og skriver liste.getRandomValue()
// kan man få 1, 2 eller 3

Array.prototype.getRandomValue = function () {
    return this[Math.floor(Math.random() * this.length)]
}

const frequency = 500

//laver et vilkårlig array
const lastArrived = [null, null, null]

//Function der håndterer min kunde_ankommer Animation

function kundeAnkommer(figur) {
    // det her stykke sikrer, at der ikke kommer figurer i samme lane inden for 0.5 sekunder af hinanden 

    //laver en konstant variabel "nu" og sætter den lig med tidspunktet for lige nu.
    const nu = new Date().getTime()
    //laver en konstant variabel "all lanes" og giver den et array med mine 3 baner. 
    const allLanes = [0, 1, 2]
    //laver en konstant variabel "availableLanes" der skal tjekke om der er ledige baner
    const availableLanes = allLanes.filter(lane => nu - (lastArrived[lane] || 0) > frequency)
    if (!availableLanes.length) {
        setTimeout(() => kundeAnkommer(figur), frequency)
        return null
    }
    
    const lane = availableLanes.getRandomValue()
    lastArrived[lane] = new Date().getTime()
    //giver min figurer forskellige hastigheder. 
    figur.style['animation-duration'] = (Math.floor(Math.random() * 3) + 2) + 's'
    figur.classList.add("kunde_ankommer");
    figur.classList.add('pos' + lane)
    figur.style.display = 'block'


}
//function der starter mit game når den bliver kaldt. 
function playGame() {
    //nulstiller point
    points = 0;
    liv = 3;
    //Viser  point på skærmen
    //setTimeout(stopSpillet, 30000)

    document.querySelector("#tid_sprite").classList.add("time");

    document.querySelector("#point_number").innerHTML = points;

    //for loop der giver alle mine spil elementer min kundeankommer animation på hver 4 sek. 
    for (let figur of figurer) {
        setTimeout(() => kundeAnkommer(figur), Math.random() * 4000)
    }
    //fjerner diverse skærme og ui-elementer
    document.querySelector("#heart1").classList.remove("gray");
    document.querySelector("#heart2").classList.remove("gray");
    document.querySelector("#heart3").classList.remove("gray");
    document.querySelector("#playAgain").classList.remove("playAgain")
    document.querySelector("#level_complete").classList.remove("level_complete");
    document.querySelector("#game_over").classList.remove("game_over");
    document.querySelector("#game_titelscreen").style.display = 'none';
    document.querySelector("#playKnapContainer").style.display = 'none';
    document.querySelector("#game_over").classList.remove("game_over2")
    document.querySelector("#trykpaarules").classList.remove("regler")
    document.querySelector("#rules").style.display = 'none';

    //pause min Tab eller vind musik. 
    document.querySelector("#winSound").pause();
    document.querySelector("#lostSound").pause();

}

function stopSpillet() {
    // console.log("stopSpillet");
    pauseGame();
    if (points >= 15) {
        //adder min win screen
        document.querySelector("#winSound").play();
        document.querySelector("#winSound").volume = 0.2;
        document.querySelector("#level_complete").classList.add("level_complete")
    } 
}

function pauseGame() {
    
    //fjerner diverse animationer og display
    for (let figur of figurer) {
        figur.classList.remove("kunde_ankommer"); 
        figur.children[0].classList.remove("flyv");    
        figur.style.display = 'none';
    }
    document.querySelector("#tid_sprite").classList.remove("time");   
}

function reglerne() {
    document.querySelector("#trykpaarules").classList.add("regler");
}

function musicOn() {
    document.querySelector("#musik").play();
    document.querySelector("#musik").volume = 0.05;
    document.querySelector("#pauseIcon").classList.add("pauseIcon");
}

function musicOff() {
    document.querySelector("#musik").pause();
    document.querySelector("#pauseIcon").classList.remove("pauseIcon");
}