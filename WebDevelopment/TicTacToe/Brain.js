var z = 0, match = 1;
var gameOver = false;
var p1 = "Iron Man", p2 = "Captain America";

//<editor-fold defaultstate="collapsed" desc="Basic Info about the players">
$("#start").click(function () {
    //Global variables
    window.p1 = prompt("Enter your name, Player 1:", "Player 1");
    window.p2 = prompt("Enter your name, Player 2:", "Player 2");
    $("h1").fadeOut();
    $("hr").fadeOut();
    if (match % 2 === 0)
        $("p").html(`${p2}, it's your turn! You can mark <span id='r'>X</span>`);
    else
        $("p").html(`${p1}, it's your turn! You can mark <span id='r'>X</span>`);
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
                console.log(cid);  //For debugging
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

    window.gameOver = theReferee();
    if (gameOver) {
        var winner;
        if ((match % 2 === 0) ^ (z % 2 === 0))
            winner = p1;
        else
            winner = p2;
        /* ********Logic******** */
        /* match    z     Winner */
        /* Odd      Odd   p2     */
        /* Odd      Even  p1     */
        /* Even     Odd   p1     */
        /* Even     Odd   p2     */
        /* ********************* */

        $("p").html(`${winner}, you won the match!`);
    } else if (z == 8) {
        $("p").html(`Oh! The match is a Draw!`);
        window.gameOver = true;
    }
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
