var z = 0, match = 1, p1S = 0, p2S = 0, drawS = 0;
var gameOver = false;
var p1 = "Iron Man", p2 = "Captain America";
$(".alert").fadeOut(1);
$("#newGame").fadeOut(1);
var pA = $("#playAgain");
pA.fadeOut(1);


//<editor-fold defaultstate="collapsed" desc="Basic Info about the players">
$("#start").click(function () {
    //Global variables
    window.p1 = prompt("Enter your name, Player 1:", "Player 1");
    window.p2 = prompt("Enter your name, Player 2:", "Player 2");
    $("h1").fadeOut();
    $("hr").fadeOut();
    $("#start").fadeOut(10);
    $(".alert").fadeIn();
    $("#newGame").fadeIn();
    if (match % 2 === 0)
        $("#orders").html(`${p2}, you are first! You can mark <span id='r'>X</span>`);
    else
        $("#orders").html(`${p1}, you are first! You can mark <span id='r'>X</span>`);
    $("#player1").text(p1);
    $("#player2").text(p2);
    updateScores(p1S, p2S, drawS);

    clickListeners();
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Apply Click listeners on the cells">
function clickListeners() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var cellID = "#c" + i + j;
            $(cellID).click(function () {
                var cid = this.id;
                putMark(cid);
                // console.log(cid);  //For debugging
            });
        }
    }
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Check the validity of the move">
function checkValidity(cid) {
    if (z >= 9 || window.gameOver) {
        alert("The result of the game has been declared!\nClick on 'Play Again'");
        return true;
    }
    if ($("#" + cid).text() !== "") {
        alert("This block already has a mark!\nPlease mark in a valid block");
        return true;
    }
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Put X or 0 in the given cell">
function putMark(cid) {
    if (checkValidity(cid))
        return;
    var chr;
    if (z % 2 === 0)
        chr = 'X';
    else
        chr = '0';
    $("#" + cid).text(chr);
    if (checkResults()) { // language=JQuery-CSS
        pA.fadeIn();
        match++;
    }
    // if(gameOver===false)
    //     pA.fadeOut(1);
    z++;
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Function to return the Cell ID">
function rm(a, b) {
    return $("#c" + a + b).text();
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="The Referee">
function theReferee() {
    //<editor-fold defaultstate="collapsed" desc="Give orders">
    /* **************Logic************** */
    /* Match    z       Order to    Mark */
    /* Odd      Odd     p1          X    */
    /* Odd      Even    p2          0    */
    /* Even     Odd     p2          X    */
    /* Even     Even    p1          0    */
    /* ********************************* */
    var nextPlayer, mark;
    var markX = "<span id='r'>X</span>", mark0 = "<span id='b'>0</span>";
    if ((match % 2 === 0) ^ (z % 2 === 0))
        nextPlayer = p2;
    else
        nextPlayer = p1;
    if (z % 2 === 0)
        mark = mark0;
    else
        mark = markX;
    $("#orders").html(`${nextPlayer}, it's your turn! You can mark ${mark}`);
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Check linearly">
    for (var i = 0; i < 3; i++) {
        var booH = true, booV = true, j;
        //<editor-fold defaultstate="collapsed" desc="Check Horizontally">
        for (j = 0; j < 3; j++) {
            booH = booH && (rm(i, 0) === rm(i, j));
        }
        if (rm(i, 0) !== "" && booH)
            return true;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Check Vertically">
        for (j = 0; j < 3; j++) {
            booV = booV && (rm(0, i) === rm(j, i));
        }
        if (rm(0, i) !== "" && booV)
            return true;
        //</editor-fold>
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Check diagonally">
    if (rm(0, 0) !== "")
        if (rm(0, 0) === rm(1, 1) && rm(1, 1) === rm(2, 2))
            return true;
    if (rm(0, 2) !== "")
        if (rm(0, 2) === rm(1, 1) && rm(1, 1) === rm(2, 0))
            return true;
    //</editor-fold>

    return false;
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Update Scoreboard">
function updateScores(s1, s2, draw) {
    $("#p1Score").text(s1);
    $("#p2Score").text(s2);
    $("#drawScore").text(draw);
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="checkResults">
function checkResults() {
    window.gameOver = theReferee();
    if (gameOver) {
        var winner;
        if ((match % 2 === 0) ^ (z % 2 === 0)) {
            winner = p1;
            p1S++;
        } else {
            winner = p2;
            p2S++;
        }
        /* ********Logic******** */
        /* match    z     Winner */
        /* Odd      Odd   p2     */
        /* Odd      Even  p1     */
        /* Even     Odd   p1     */
        /* Even     Even  p2     */
        /* ********************* */
        $("#orders").html(`<span id="purple">${winner}, you won the match!</span>`);
        updateScores(p1S, p2S, drawS);
    } else if (z === 8) {
        $("#orders").html(`<span id="purple">Oh! The match is a Draw!</span>`);
        drawS++;
        window.gameOver = true;
        updateScores(p1S, p2S, drawS);
    }
    return gameOver;
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Clear the board">
function clearBoard() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var cid = "#c" + i + j;
            $(cid).text("");
        }
    }
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Play Again">
pA.click(function () {
    clearBoard();
    if (match % 2 === 0)
        $("#orders").html(`${p2}, you are first! You can mark <span id='r'>X</span>`);
    else
        $("#orders").html(`${p1}, you are first! You can mark <span id='r'>X</span>`);
    window.gameOver = false;
    pA.fadeOut(1);
    z = 0;
});

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Show Off!">
$('#about').click(function () {
    alert("About:\nA project made for practising Web-development skills.\nDeveloper: Rahul Bera");
});
$('#ins').click(function () {
    alert("The object of Tic Tac Toe is to get three in a row. \n" +
        "The first player is given X and the second 0.\n" +
        "Players alternately place Xs and Os on the game board \n" +
        "until either opponent has three in a row or all nine squares are filled. \n" +
        "X always goes first, and in the event that no one has three in a row, \n" +
        "the stalemate is called a cat game or a Draw.\n" +
        "If you continue playing the game, the mark X will be toggled\n" +
        "between the players.\n\n" +
        "Enjoy playing :D");
});

//</editor-fold>