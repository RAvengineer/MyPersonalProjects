
var noRows = 6, noCols = 7,p1="IRON MAN",p2="Captain America";
var gray = "rgb(128, 128, 128)",red = "rgb(255, 0, 0)",blue = "rgb(0, 0, 255)";
var z = 0,n = 4;//n = 4 for the game is Connect 4
var gameFinished = false;

//<editor-fold defaultstate="collapsed" desc="Basic Info about the users">
$("#start").click(function () {
    window.p1 = prompt("Enter your name, Player 1.");
    alert(p1+", you are assigned color blue!");
    window.p2 = prompt("Enter your name, Player 2.");
    alert(p2+", you are assigned color red!");
    $('h1').fadeOut();
    $('hr').fadeOut();
    $('p').html(`${p1}, its your turn. Your color is <span id='b'>blue</span>!`);
    $("#start").fadeOut();
    letsPlay();
});
//</editor-fold>

//<editor-fold defaultstate-"collapsed" desc="Prepare the board"
var boardRow = [];
for (var i = 0; i < noCols; i++) {
    boardRow.push(noRows);
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Return Cell ID">
function rcID(a,b){
    return ("#"+a+b);
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Return the color of the cell">
function rColor(a,b) {
    return $(rcID(a,b)).css('background-color');
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Function for listening the clicks">
function letsPlay() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            var cellID = "#" + i + j;
            $(cellID).on("click",function () {
                var cid = this.id;
                changeColor(cid);
                // console.log(cid);  //For debugging
            });
        }
    }
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Change the color and give instructions">
function changeColor(cid) {
    if(gameFinished){
        alert("The result of the game has been declared!\nPlease click on 'Play Again!' to restart the game.");
        return;
    }
    var colChosen = cid[1];
    // console.log(colChosen); //For Debugging
    if(boardRow[colChosen] <= 0){
        alert("Column "+(parseInt(colChosen)+1)+" has no space for dots");
        return;
    }
    var cellID = rcID(boardRow[colChosen]-1,colChosen);
    boardRow[colChosen]--;
    if (z % 2 === 0){
        // language=HTML
        $('p').html(`${p2}, its your turn. Your color is <span id='r'>red</span>!`);
        // $('p').text(p1 + ", its your turn. Your color is blue!");
        $(cellID).css('background-color',blue);
    }
    else{
        // language=HTML
        $('p').html(`${p1}, its your turn. Your color is <span id='b'>blue</span>!`);
        $(cellID).css('background-color',red);
    }
    if(theReferee()===true){
        var winner = "Iron Man";
        if(z%2==0) winner = p1;
        else winner = p2;
        $('h1').fadeOut();
        $('hr').fadeOut();
        $('p').text(winner + ", you won the game!")
        //console.log(winner + " Won!"); //For Debugging
        gameFinished = true;
    }
    else{
        $('h1').fadeOut();
        $('hr').fadeOut();
        if(z>=(noCols*noRows-1)){
            $('p').text("Oh! It's a Draw");
            gameFinished = true;
        }
    }
    z++;
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="The Referee">
function theReferee() {
    //<editor-fold defaultstate="collapsed" desc="Horizontal">
    for (var i = 0; i < noRows; i++) {
        for (var j = 0; j < noCols - n + 1; j++) {
            var theColor = rColor(i,j),boo = true;
            if(theColor===gray)
                continue;
            for (var k = j; k < j+n; k++) {
                boo = boo && (theColor===rColor(i,k));
            }
            if(boo===true){
                console.log("Horizontally!");
                return true;
            }
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Vertically">
    for (var i = 0; i < noRows - n + 1; i++) {
        for (var j = 0; j < noCols; j++) {
            var theColor = rColor(i,j),boo = true;
            if(theColor===gray)
                continue;
            for (var k = i; k < i+n; k++) {
                boo = boo && (theColor===rColor(k,j));
            }
            if(boo===true){
                console.log("Vertically!");
                return true;
            }
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Backward Slash Pattern">
    for (var i = 0; i < noRows - n + 1; i++) {
        for (var j = 0; j < noCols - n + 1; j++) {
            var theColor = rColor(i,j),boo = true;
            if(theColor===gray)
                continue;
            var row = i,col = j;
            for (var k = 0; k < n; k++) {
                boo = boo && (theColor===rColor(row,col));
                row++; col++;
            }
            if(boo===true){
                console.log("Backward Slash Pattern!");
                return true;
            }
        }
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Forward Slash Pattern">
    for (var i = 0; i < noRows - n + 1; i++) {
        for (var j = 0; j < noCols - n + 1; j++) {
            var row = i,col = noCols - j - 1;
            var theColor = rColor(row,col),boo = true;
            if(theColor===gray)
                continue;
            for (var k = 0; k < n; k++) {
                boo = boo && (theColor===rColor(row,col));
                row++; col--;
            }
            if(boo===true){
                console.log("Forward Slash Pattern!");
                return true;
            }
        }
    }
    //</editor-fold>

    /* The Forward and Backward slash checking could have been done in a shorter way!
    * I just felt lazy for doing that!  */
    return false;
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Show Off!">
$('#about').click(function () {
    alert("About:\nA project made for practising Web-development skills.\nDeveloper: Rahul Bera");
});
$('#ins').click(function () {
   alert("The object of this game is to connect four of your chips/dots in a row!\n" +
       "Just click on the column you want to insert the dot/chip.\n" +
       "The one who creates a segment of 4 dots first, wins the game.\n" +
       "Click on 'Play Again!' to restart the game.\n" +
       "Keep the zoom at 80% - 90% for better experience\n" +
       "Enjoy playing :D");
});

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Further possible additions!">
/*
1. Highlighting the segment of dots that led to the win (Sol: JQuery animations can be used!)
2. Allowing to play again, without asking the name of the players repeatedly.
    (Sol: Clearing the board, without refreshing the page)
 */
//</editor-fold>



