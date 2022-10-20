//VARIABLES
var elem = document.getElementById("myBar");
var score = document.getElementById("loadedpercent");
var loaderContenainer = document.querySelector(".loaderContenainer");
var instructions = document.querySelector(".instructions");
var loader = document.querySelector("#loader");
var startGame = document.querySelector("#startGame");
var reloadGameBtn = document.querySelector("#reloadGame");
var game = document.querySelector("#game");
var inGame = false;
var isTyping = false;
var theAnswer = document.querySelector("#theAnswer");
var close = document.querySelector("#close");
var languageFound = document.querySelector(".languageFound");
// let languages = [
//   "javascript",//   "html",//   "css",//   "python",//   "java",//   "bash",//   "powershell",//   "c#",//   "php",//   "c++",//   "typescript",//   "c",//   "ruby",//   "go",//   "assembly",//   "swift",//   "kotlin",//   "r",//   "vba",//   "objective-c",//   "scala",//   "rust",//   "dart",//   "elixir",//   "clojure",//   "webassembly",//   "sql",//
//];
let languages = [];
let softwares = [];
var languageFounded = [];
let scoreFind = document.querySelector(".scoreFind");
let scoreFindS = document.querySelector(".scoreFindS");
let scoreFindL = document.querySelector(".scoreFindL");
let scoreToFindSoftware = document.querySelector(".score.software .scoreToFind");
let scoreToFindLanguages = document.querySelector(".score.languages .scoreToFind");
let scoreErrorOne = document.querySelector(".scoreErrorOne");
let scoreErrorTwo = document.querySelector(".scoreErrorTwo");
let scoreErrorThree = document.querySelector(".scoreErrorThree");
let zoomProgress = document.querySelector(".zoomProgress");
let checkBox = document.querySelector("#autocloseLabelCheckBox");
let instructionsNumber = document.querySelector("#instructionsNumber");
let checked = false;

// let founded = 0;
let foundedSoftware = 0;
let foundedLanguage = 0;
let errors = 0;

window.addEventListener("load", function() {
    // scoreFind.innerHTML = founded;
    scoreFindS.innerHTML = foundedSoftware;
    scoreFindL.innerHTML = foundedLanguage;
});

let hasPlayed = false;

function handleFirstPlay(event) {
    if (!hasPlayed) {
        hasPlayed = true;

        const vid = event.target;

        vid.onplay = null;

        // Start whatever you need to do after first playback has started
        vid.play();
    }
}

setInterval(myTimer, 1000);

function myTimer() {
    document.querySelector("video").play();
}

//FUNCTIONS

/******************************************************
 * REINITIALIZE ALL THE VARIALES WHEN RESTARTING GAME *
 ******************************************************/

function restartGame() {
    localStorage.clear();
    languageFounded = [];
    foundedSoftware = [];
    foundedLanguage = [];

    foundedSoftware = 0;
    foundedLanguage = 0;
    // founded = 0;
    errors = 0;
    inGame = true;
    document.querySelector("#youWin").style = "display:none;";
    document.querySelector("#youLose").style = "display:none;";
    // scoreFind.innerHTML = "00";
    scoreFindS.innerHTML = '0';
    scoreFindL.innerHTML = '0';

    scoreErrorOne.style = "color:#FFF";
    scoreErrorTwo.style = "color:#FFF";
    scoreErrorThree.style = "color:#FFF";

    document.querySelector("#explaination").style = "display:none";
    checked = false;
}

function showReloadOrNot() {
    let checkScore = localStorage.getItem("scrore");
    let reloadBtn = document.querySelectorAll("#reloadGame");
    if (checkScore) {
        //console.log("il y a une partie sauvegardé")
        reloadBtn.forEach((element) => {
            element.innerHTML = "CHARGER UNE PARTIE";
        });
    } else {
        //console.log("il n'y a pas de partie sauvegardée")
        reloadBtn.forEach((element) => {
            element.innerHTML = "";
        });
    }
}

/*************************
 * SCRIPT FOR THE LOADER *
 *************************/

function move() {
    showReloadOrNot();
    var width = 1;
    var id = setInterval(frame, 33);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + "%";
            score.innerHTML = width * 1 + "%";
        }
    }
}

/***********************************
 * ACTION TO SHOW OR HIDE SECTIONS *
 ***********************************/
// function showContent() {
//     loaderContenainer.style.display = "none";
//     instructions.style.display = "flex";
// }

function hideAlreadyFind() {
    document.querySelector("#aleradyFounded").style = "display:none";
    theAnswer.value = "";
}

function hideGameSaved() {
    document.querySelector("#gameSaved").style = "display:none";
    theAnswer.value = "";
}

function hideError() {
    document.querySelector("#errorDisplay").style = "display:none";
    theAnswer.value = "";
    showReloadOrNot();
}

function hideAlmost() {
    document.querySelector("#almostDisplay").style = "display:none";
    theAnswer.value = "";
    showReloadOrNot();
}

function autoHide() {
    document.querySelector("#explaination").style = "display:none";
    theAnswer.value = "";
    inGame = true;
}

function enterGame() {
    showReloadOrNot();
    localStorage.clear();
    loader.style.display = "none";
    game.style.display = "flex";
    inGame = true;
}

function reloadGame() {
    loader.style.display = "none";
    game.style.display = "flex";
    document.querySelector("#youWin").style = "display:none;";
    document.querySelector("#youLose").style = "display:none;";
    inGame = true;
    scoreErrorOne.style = "color:#FFF";
    scoreErrorTwo.style = "color:#FFF";
    scoreErrorThree.style = "color:#FFF";

    let scoreFromStorage = localStorage.getItem("scrore");
    let errorsFromStorage = localStorage.getItem("errors");
    let languageFoundedFromStorage = localStorage.getItem("languagesFounded");
    if (scoreFromStorage) {
        founded = parseInt(scoreFromStorage);
        if (founded < 10) {
            scoreFind.innerHTML = "0" + founded;
        } else {
            scoreFind.innerHTML = founded;
        }
    } else {
        console.log("Name is not found");
    }
    if (errorsFromStorage) {
        errors = parseInt(errorsFromStorage);
        switch (errors) {
            case 1:
                scoreErrorOne.style = "color:#0AEFF7";
                break;
            case 2:
                scoreErrorOne.style = "color:#0AEFF7";
                scoreErrorTwo.style = "color:#0AEFF7";
                break;
            case 3:
                scoreErrorThree.style = "color:#0AEFF7";
                showReloadOrNot();
                document.querySelector("#youLose").style =
                    "display:flex; background: url('./img/fond.jpg') center center / cover;; ";
                break;
        }
    }
    languageFounded = JSON.parse(languageFoundedFromStorage);
}

var speed = 50;

/*
 * Call this function with a string containing the ID name to
 * the element containing the number you want to do a count animation on.
 */
function incEltNbr(id, maxNum) {
    elt = document.getElementById(id);
    endNbr = Number(document.getElementById(id).innerHTML);
    incNbrRec(0, maxNum, elt);
}

/*A recursive function to increase the number.*/
function incNbrRec(i, endNbr, elt) {
    if (i <= endNbr) {
        elt.innerHTML = i;
        setTimeout(function() { //Delay a bit before calling the function again.
            incNbrRec(i + 1, endNbr, elt);
        }, speed);
    }
}

/***********************
 * FILL LANGUAGE ARRAY *
 ***********************/

async function getFillArray() {
    inGame = false;
    let response = await fetch("./js/languages.json");
    if (response.ok) {
        let data = await response.json();
        languages_json = data.languages.langage;

        languages_json.forEach((element) => {
            languages.push(element);
        });

        // ajout des éléments des logiciels dans le tableau languages
        let softwares_json = data.softwares.software;

        softwares_json.forEach((element) => {
            softwares.push(element);
        });

        // affichage in game du score
        scoreToFindSoftware.innerHTML = softwares.length;
        scoreToFindLanguages.innerHTML = languages.length;
        // affichage du nombre de logiciel & languages à trouver
        incEltNbr("instructionsNumberS", softwares.length);
        incEltNbr("instructionsNumberL", languages.length);

    } else {
        console.log("error");
    }
}

getFillArray();

/*******************************************
 * GET INFORMATIONS ABOUT FOUNDED LANGUAGE *
 *******************************************/

function getDescription(typeDescription) {

    inGame = false;

    let answerType = languages;

    if (typeDescription === 'software') {
        answerType = softwares;
    }


    let index = answerType.findIndex((object) => {
        return object.name === theAnswer.value || object.alternative === theAnswer.value;
    });

    /**
     * On affiche dans le DOM les détails du language trouvé du JSON
     */
    document.querySelector(".explainationTitle").innerHTML =
        answerType[index].name;

    document.querySelector(".explainationText").innerHTML =
        answerType[index].description;

    document.querySelector(".explainationPicture").innerHTML =
        "<img src='" + answerType[index].picture + "' />";

    theAnswer.value = "";

}

/*******************************
 * RECALL FUNCTION DESCRIPTION *
 *******************************/

async function reGetDescription(what) {
    inGame = false;
    let response = await fetch("./js/languages.json");
    if (response.ok) {
        let data = await response.json();
        //console.log(data.languages.langage)
        const index = data.languages.langage.findIndex((object) => {
            return object.name === what;
        });

        console.log(data.languages.langage[index]);
        document.querySelector(".explainationTitle").innerHTML =
            data.languages.langage[index].name;
        document.querySelector(".explainationText").innerHTML =
            data.languages.langage[index].description;
        document.querySelector(".explainationPicture").innerHTML =
            "<img src='" + data.languages.langage[index].picture + "' />";

        theAnswer.value = "";
    } else {
        console.log("error");
    }
}

/**********************
 * FUNCTION GETLEGALS *
 **********************/

async function getLegals() {
    inGame = false;
    let response = await fetch("./js/languages.json");
    if (response.ok) {
        let data = await response.json();
        let explainationTitle = document.querySelectorAll(".explainationTitle");
        let explainationText = document.querySelectorAll(".explainationText");
        explainationTitle[1].innerHTML = data.legals.legal[0].title;
        explainationText[1].innerHTML = data.legals.legal[0].content;
    } else {
        console.log("error");
    }
}

/****************************
 * FUNCTION GETCONFIDENTIAL *
 ****************************/

async function getConfidential() {
    let response = await fetch("./js/languages.json");
    if (response.ok) {
        let data = await response.json();
        let explainationTitle = document.querySelectorAll(".explainationTitle");
        let explainationText = document.querySelectorAll(".explainationText");
        explainationTitle[1].innerHTML = data.legals.confidential[0].title;
        explainationText[1].innerHTML = data.legals.confidential[0].content;
    } else {
        console.log("error");
    }
}

/**************************************************
 * CHECK IF THE LANGUAGE IS IN THE ORIGINAL ARRAY *
 **************************************************/

//LEVENSHTEIN FUNCTIONS ********************************

const calculateLevenshteinDistance = (a, b) => {
    const aLimit = a.length + 1;
    const bLimit = b.length + 1;
    const distance = Array(aLimit);
    for (let i = 0; i < aLimit; ++i) {
        distance[i] = Array(bLimit);
    }
    for (let i = 0; i < aLimit; ++i) {
        distance[i][0] = i;
    }
    for (let j = 0; j < bLimit; ++j) {
        distance[0][j] = j;
    }
    for (let i = 1; i < aLimit; ++i) {
        for (let j = 1; j < bLimit; ++j) {
            const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
            distance[i][j] = Math.min(
                distance[i - 1][j] + 1,
                distance[i][j - 1] + 1,
                distance[i - 1][j - 1] + substitutionCost
            );
        }
    }
    return distance[a.length][b.length];
};

const calculateImprovedLevenshteinDistance = (a, b) => {
    return calculateLevenshteinDistance(a.toLowerCase(), b.toLowerCase());
};


function getNameLanguages() {
    const arrayNameOfLanguages = [];

    languages.forEach(language => {
        arrayNameOfLanguages.push(language.name);
        if (language.alternative === '') {
            arrayNameOfSoftwares.push(language.alternative);
        }
    });

    return arrayNameOfLanguages;
}

function getNameSoftwares() {
    const arrayNameOfSoftwares = [];
    arrayNameOfSoftwares['alternative'] = [];

    softwares.forEach(software => {
        arrayNameOfSoftwares.push(software.name);
        if (software.alternative !== '') {

            arrayNameOfSoftwares['alternative'].push(software.alternative)
        }
    });

    return arrayNameOfSoftwares;
}

function checkAnswer() {

    let answer = theAnswer.value;
    let find = false;
    let almost = false;
    let alreadyFounded = false;

    const arrayOfLanguages = getNameLanguages();
    const arrayOfSoftwares = getNameSoftwares();

    if (languageFounded.includes(answer) === false) {
        // languages
        if (arrayOfLanguages.includes(answer) === true) {

            find = true;

            document.querySelector("#explaination").style = "display:flex";
            document.querySelector(".explainationTitle").innerHTML = answer;
            getDescription('language');

            foundedLanguage += 1;
            scoreFindL.innerHTML = foundedLanguage;
        }
        // mot alternatif ou le mot normal 
        else if ((arrayOfSoftwares['alternative'].includes(answer.toLowerCase()) === true) || (arrayOfSoftwares.includes(answer) === true)) {

            find = true;

            document.querySelector("#explaination").style = "display:flex";
            document.querySelector(".explainationTitle").innerHTML = answer;
            getDescription('software');

            foundedSoftware += 1;
            scoreFindS.innerHTML = foundedSoftware;
        }
        // mauvaise réponse
        else if (find === false && alreadyFounded === false && almost === false) {
            theAnswer.value = "";
            errors += 1;
            switch (errors) {
                case 1:
                    document.querySelector("#errorDisplay").style = "display:flex";
                    setTimeout(hideError, 800);
                    scoreErrorOne.style = "color:#0AEFF7";
                    break;
                case 2:
                    document.querySelector("#errorDisplay").style = "display:flex";
                    setTimeout(hideError, 800);
                    scoreErrorTwo.style = "color:#0AEFF7";
                    break;
                case 3:
                    scoreErrorThree.style = "color:#0AEFF7";
                    document.querySelector("#youLose").style =
                        "display:flex; background: url('./img/fond.jpg') center center / cover;; ";
                    break;
            }
            console.log("loupé - " + errors + "commises");
        }
    } else {
        alreadyFounded = true;
    }

    if (find === true && alreadyFounded === false) {
        languageFounded.push(answer);
        theAnswer.value = "";
    }

    if (foundedSoftware === arrayOfSoftwares.length && foundedLanguage === arrayOfLanguages.length) {
        document.querySelector("#youWin").style =
            "display:flex;    background: url('./img/fond.jpg') center center / cover; ";

        inGame = false;
    }

    if (checked == true) {
        autoHide();
    }
}

function checkLanguage() {

    let language = theAnswer.value;
    let find = false;
    let almost = false;
    let alreadyFounded = false;

    languages.forEach((element) => {

        element = element.name;

        switch (calculateImprovedLevenshteinDistance(language, element)) {
            case 0:
                if (languageFounded.indexOf(element) === -1 && language === element) {
                    setTimeout(hideAlmost, 800);
                    languageFounded.push(element);
                    find = true;
                    alreadyFounded = false;
                    almost = false;
                    document.querySelector("#explaination").style = "display:flex";
                    document.querySelector(".explainationTitle").innerHTML = language;
                    getDescription();
                    founded += 1;

                    if (founded < 10) {
                        scoreFind.innerHTML = "0" + founded;
                    } else {
                        scoreFind.innerHTML = founded;
                    }

                    if (founded == 27) {
                        document.querySelector("#youWin").style =
                            "display:flex;    background: url('./img/fond.jpg') center center / cover; ";
                        inGame = false;
                    }

                    if (checked == true) {
                        autoHide();
                    }
                } else {
                    setTimeout(hideAlmost, 800);
                    find = true;
                    alreadyFounded = true;
                    almost = false;
                    document.querySelector("#aleradyFounded").style = "display:flex";
                    setTimeout(hideAlreadyFind, 800);
                }

                break;
            case 1:
                setTimeout(hideAlmost, 800);
                almost = true;
                break;
        }
    });

    if (find === false && alreadyFounded === false && almost === true) {
        theAnswer.value = "";
        document.querySelector("#almostDisplay").style = "display:flex";
    } else if (find === true && alreadyFounded === true && almost === false) {

    } else if (find === false && alreadyFounded === false && almost === false) {
        theAnswer.value = "";
        errors += 1;
        switch (errors) {
            case 1:
                document.querySelector("#errorDisplay").style = "display:flex";
                setTimeout(hideError, 800);
                scoreErrorOne.style = "color:#0AEFF7";
                break;
            case 2:
                document.querySelector("#errorDisplay").style = "display:flex";
                setTimeout(hideError, 800);
                scoreErrorTwo.style = "color:#0AEFF7";
                break;
            case 3:
                scoreErrorThree.style = "color:#0AEFF7";
                document.querySelector("#youLose").style =
                    "display:flex; background: url('./img/fond.jpg') center center / cover;; ";
                break;
        }
        console.log("loupé - " + errors + "commises");
    }
    // console.log(languageFounded);
}

/************************
 * SAVE IN LOCALSTORAGE *
 ************************/

function saveGame() {
    document.querySelector("#gameSaved").style = "display:flex";
    setTimeout(hideGameSaved, 800);
    localStorage.setItem("languagesFounded", JSON.stringify(languageFounded));
    localStorage.setItem("scrore", founded);
    localStorage.setItem("errors", errors);
}

//ACTIONS

// window.onload = move;
//LOADER DISEAPEAR
// setTimeout(showContent, 1000);
// showContent();
startGame.addEventListener("click", enterGame);
reloadGameBtn.addEventListener("click", reloadGame);

//ANSWER SECTION

window.addEventListener("keydown", function(event) {
    var keysAllowed = "abcdefghijklmnopqrstuvwxyz+-#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var key = event.key;

    if (keysAllowed.includes(key) && inGame == true) {
        document.querySelector("#answer").style = "display:flex";
        theAnswer.value += event.key;
    }

    if (key == "Enter" && theAnswer.value != "") {
        document.querySelector("#answer").style = "display:flex";
        inGame = true;
        // checkLanguage();
        checkAnswer();
        document.querySelector("#answer").style = "display:none";
    }

    //CORRECT ANSWER
    if (key == "Backspace") {
        inGame = false;
        theAnswer.focus();
    }

    //CORRECT ANSWER
    if (key == "Meta") {
        // console.log(languageFounded);
    }

    //ESCAPE ANSWER SECTION
    if (key == "Escape") {
        inGame = true;
        theAnswer.value = "";
        document.querySelector("#answer").style = "display:none";
        document.querySelector("#languageFounded").style = "display:none";
        document.querySelector("#aleradyFounded").style = "display:none";
        document.querySelector("#explaination").style = "display:none";
        document.querySelector("#legals").style = "display:none";
    }
});

document.querySelector("#theAnswer").addEventListener("click", function() {
    inGame = false;
    // console.log(inGame);
});

languageFound.addEventListener("click", function() {
    inGame = false;
    document.querySelector("#languageFounded").style = "display:flex";
    // console.log(languageFounded.length);
    if (languageFounded.length == 0) {
        document.querySelector(".languageFoundedText").innerHTML =
            "Aucun langage trouvé";
    } else {
        let itemFound = "";
        languageFounded.forEach((element) => {
            itemFound += "<span class='item'>" + element + "</span>";
        });
        document.querySelector(".languageFoundedText").innerHTML = itemFound;

        let itemsFounded = document.querySelectorAll(".item");
        // console.log(itemsFounded);
        itemsFounded.forEach((element) => {
            element.onclick = function() {
                document.querySelector("#explaination").style = "display:flex";
                document.querySelector(".explainationTitle").innerHTML =
                    element.textContent;
                reGetDescription(element.textContent);
            };
        });

        // document.querySelector(".languageFoundedText").innerHTML =languageFounded.join(" - ");
    }
});

//LEGALS CLICK
document.querySelector(".legal").addEventListener("click", function() {
    document.querySelector("#legals").style = "display:flex";
    getLegals();
});

//BUTTON CLOSE
let closeBtn = document.querySelectorAll(".closeBtn");
closeBtn.forEach((btn) => {
    btn.addEventListener("click", function() {
        inGame = true;
        document.querySelector("#explaination").style = "display:none";
        document.querySelector("#legals").style = "display:none";
        document.querySelector("#answer").style = "display:none";
        document.querySelector("#languageFounded").style = "display:none";
        document.querySelector("#aleradyFounded").style = "display:none";
        theAnswer.value = "";
    });
});

// CHECKBOX

checkBox.addEventListener("change", function() {
    if (this.checked) {
        checked = true;
    } else {
        checked = false;
        console.log("Checkbox is not checked..");
    }
});

// CURSOR

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    cursor.setAttribute(
        "style",
        "top:" + (e.pageY - 20) + "px; left:" + (e.pageX - 20) + "px;"
    );
});

document.addEventListener("click", () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500);
});

let restart = document.querySelectorAll("#startGame");
restart.forEach((restartBtn) => {
    restartBtn.addEventListener("click", restartGame);
});

document.querySelector(".restartGame").addEventListener("click", restartGame);

let reGame = document.querySelectorAll("#reloadGame");
reGame.forEach((restartBtn) => {
    restartBtn.addEventListener("click", reloadGame);
});

document.querySelector(".saveGame").addEventListener("click", saveGame);

// SLIDER BEFORE AFTER
jQuery("#slider").on("input change", (e) => {
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    jQuery('.foreground-img').css('width', `${sliderPos}%`)
        // Update the position of the slider button
    jQuery('.slider-button').css('left', `calc(${sliderPos}% - 18px)`)
});