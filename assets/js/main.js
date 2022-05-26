const rounds5 = document.getElementById('rounds5');
const rounds10 = document.getElementById('rounds10');
const rounds15 = document.getElementById('rounds15');
const rounds20 = document.getElementById('rounds20');
const roundsCounterOutput = document.getElementById('roundsCounterText')
const btnScissors = document.getElementById('btnScissors');
const btnRock = document.getElementById('btnRock');
const btnPaper = document.getElementById('btnPaper');
const roundsContainer = document.getElementById('roundsContainer');
const letsPlay = document.getElementById('letsPlay');
const makeChoiceOutput = document.getElementById('makeChoiceOutput');
const roundResultOutput = document.getElementById('roundResultOutput');
const matchResultOutput = document.getElementById('matchResultOutput');
const vsTextOutput = document.getElementById('userVsKiText');

let roundsPlayed = "1";
let roundsTotal = "";
let resultPlayer = "0";
let resultKI = "0";

// ================================
// prüft die gewünschte Anzahl der Runden und gibt den Wert an roundsTotal
// ================================
let setRounds = () => {
    switch (true) {
        case rounds5.checked:
            roundsTotal = rounds5.value;
            break;
        case rounds10.checked:
            roundsTotal = rounds10.value;
            break;
        case rounds15.checked:
            roundsTotal = rounds15.value;
            break;
        case rounds20.checked:
            roundsTotal = rounds20.value;
            break;
        default:
            console.log('Funzt nicht');
            break;
    }
}

// ================================
// Funktion aktiviert oder deaktiviert die Icons
// ================================

let makePicsClickable = () => {
    console.log('makePicsClickable gestartet');
    btnScissors.setAttribute("onclick", "startGame('Schere')");
    btnRock.setAttribute("onclick", "startGame('Stein')");
    btnPaper.setAttribute("onclick", "startGame('Papier')");
}

let stopPicsClickable = () => {
    console.log('makePicsClickable gestartet');
    btnScissors.setAttribute("onclick", "");
    btnRock.setAttribute("onclick", "");
    btnPaper.setAttribute("onclick", "");
}

// ================================
// Prüft ob alle Spielrunden abgeschlossen sind und gibt am Ende das Endergebnis aus
// ================================
let chkGameStatus = () => {
    if (roundsPlayed < roundsTotal) {
        roundsPlayed++
        roundsCounterOutput.innerHTML = `Runde ${roundsPlayed} von ${roundsTotal}`;
    }
    else if (roundsPlayed == roundsTotal) {
        roundsCounterOutput.innerHTML = `Runde ${roundsPlayed} von ${roundsTotal}`;
        stopPicsClickable();

        // Ausgabe Gesamtergebnis
        if
            (resultKI == resultPlayer) {
            roundResultOutput.innerHTML = `${resultPlayer} zu ${resultKI} - Keine Entscheidung - noch ne Runde?!`;
        }
        else if (resultPlayer > resultKI) {
            roundResultOutput.innerHTML = `CONGRATULATIONS!! Du hast mit einem Ergebnis von ${resultPlayer} zu ${resultKI} das Spiel gewonnen!`;
        }
        else roundResultOutput.innerHTML = `MÖÖÖP!! Setzen 6! Üb ein bisschen vor dem Spiegel und komm nochmal wieder - die Partie hier hast du jedenfalls mit ${resultPlayer} zu ${resultKI} verloren!`;
    }
}

// ================================
// Refresh der Ergebnisanzeige
// ================================
let refreshScore = () => {
    matchResultOutput.innerHTML = `Player ${resultPlayer} / ${resultKI} KI`;
}

// ================================
// Auswertung der gespielten Runde und Ausgabe des Ergebnis
// ================================

let setRoundWinner = (user, KI) => {
    console.log(user + KI);
    makeChoiceOutput.style.visibility = 'hidden';
    vsTextOutput.innerHTML = `${user} gegen ${KI}`;
    if (user == KI) {
        console.log('Unentschieden');
        roundResultOutput.innerHTML = `Wenn ihr beide immer ${user} wählt, wird das ein langer Abend hier!`;
    }
    else if (user == 'Stein') {
        if (KI == 'Schere') {
            resultPlayer++
            console.log(`${user} gewinnt gegen ${KI}!`);
            roundResultOutput.innerHTML = `Die Runde geht an dich! ${user} zerschmettert die ${KI}!`;
        }
        else if (KI == 'Papier') {
            resultKI++
            console.log(`${user} verliert gegen ${KI}!`);
            roundResultOutput.innerHTML = `Damn it! ${KI} wickelt ${user} ein!`;
        }
    }
    else if (user == 'Schere') {
        if (KI == 'Papier') {
            resultPlayer++
            console.log(`${user} gewinnt gegen ${KI}!`);
            roundResultOutput.innerHTML = `SchnippSchnapp! ${user} schneidet ${KI}!`;
        }
        else if (KI == 'Stein') {
            resultKI++
            console.log(`${user} verliert gegen ${KI}!`);
            roundResultOutput.innerHTML = `${user} gegen ${KI}?! Du hupst bestimmt auch wenn du gegen einen Baum fährst!`;
        }
    }
    else if (user == 'Papier') {
        if (KI == 'Stein') {
            resultPlayer++
            console.log(`${user} gewinnt gegen ${KI}!`);
            roundResultOutput.innerHTML = `YES! So wie du mit deinem ${user} den ${KI} einwickelst, könntest du auch bei der Post anfangen!`;
        }
        else if (KI == 'Schere') {
            resultKI++
            console.log(`${user} verliert gegen ${KI}!`);
            roundResultOutput.innerHTML = `Autsch! Da ging die ${KI} aber durch dein ${user} wie durch Butter!`;
        }
    }
}


// ================================
// Wert für die KI wird per Zufall ermittelt und festgelegt
// ================================
let KI = ""
let setKI = () => {
    let random = Math.floor(Math.random(1, 3) * 3);
    switch (random) {
        case 0:
            KI = 'Schere'
            console.log(`KI hat ${KI} gewählt`);
            break;
        case 1:
            KI = 'Papier'
            console.log(`KI hat ${KI} gewählt`);
            break;
        case 2:
            KI = 'Stein'
            console.log(`KI hat ${KI} gewählt`);
            break;

        default:
            break;
    }
}

// ================================
// Startet die nächste Spielrunde, legt Wert für User und KI fest
// ================================
let startGame = (choice) => {
    setKI();
    setRoundWinner(choice, KI);
    refreshScore()
    chkGameStatus();
}

// ================================
// Startet das Spiel
// ================================
let start = () => {
    console.log('Game started');
    setRounds();
    roundsCounterOutput.innerHTML = `Runde ${roundsPlayed} von ${roundsTotal}`;
    letsPlay.style.visibility = 'hidden';
    roundsContainer.style.display = 'none';
    makeChoiceOutput.style.visibility = 'visible';
    roundResultOutput.style.visibility = 'visible';
    refreshScore();
    makePicsClickable();
}