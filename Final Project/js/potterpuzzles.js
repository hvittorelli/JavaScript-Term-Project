$(document).ready(function(){

    // Create puzzle pieces
    var pieces = createPieces(true)
    $("#puzzleContainer").html(pieces);
    
    //Start button click
    $("#btnStart").click(function(){
        var pieces = $("#puzzleContainer div");
        pieces.each(function(){
             var leftPosition = Math.floor(Math.random() * 290) + "px";
             var topPosition = Math.floor(Math.random() * 290) + "px";
             $(this).addClass("draggablePiece").css({
                position: "absolute",
                left: leftPosition,
                top: topPosition
            });
            $("#pieceContainer").append($(this));
        });
        
        //Create empty puzzle container
        var emptyString = createPieces(false);

        //Hide start button and show reset button
        $("#puzzleContainer").html(emptyString);
        $(this).hide();
        $("#btnReset").show();

        //Call implenent puzzle logic
        implementLogic();
    });

    $("#btnReset").click(function(){
        var newPieces = createPieces(true);
        $("#puzzleContainer").html(newPieces);
        $(this).hide();
        $("#btnStart").show();
        $("#pieceContainer").empty();

    });

    //Creates pizzle piece HTML strings
    function createPieces(withImage){
        var rows = 4, columns = 4;
        var pieces = "";
            for (var i = 0, top = 0, order = 0; i < rows; i++, top -= 100) {
                for (var j = 0, left = 0; j < columns; j++, left -= 100, order++) {
                    if(withImage)
                    {
                        pieces += "<div style='background-position:" + left + "px " + top + "px;' class='piece' data-order='" + order + "'></div>";
                    }
                    else
                    {
                        pieces += "<div style='background-image: none;' class='piece droppablePiece'></div>";

                    }
                }
            }

        return pieces;
    }

    //Checks for whether the puzzle was solved correctly
    function checkIfSolved(){
        if ($("#puzzleContainer .droppedPiece").length !== 16) {
            return false;
        }
        for (var i = 0; i < 16; i++) {
            var item = $("#puzzleContainer .droppedPiece:eq(" + i + ")");
            var order = item.data("order");
            if (i !== order) {
                $("#pieceContainer").text("Incorrect! Try again!");
                return false;
            }
        }
        $("#pieceContainer").text("Awesome Job! You got it right!");
        return true;
    }
    
    function implementLogic(){
        $(".draggablePiece").draggable({
            revert: "invalid",
            start: function(){
                if ($(this).hasClass("droppedPiece")) {
                    $(this).removeClass("droppedPiece");
                    $(this).parent().removeClass("piecePresent");
                }
            }
        });

        //Makes pieces droppable 
        $(".droppablePiece").droppable({
            accept: function(){
                return !$(this).hasClass("piecePresent");
            },
            drop: function(event, ui) {
                var draggableElement = ui.draggable;
                var droppedOn = $(this);
                droppedOn.addClass("piecePresent");
                $(draggableElement).addClass("droppedPiece")
                    .css({
                        top: 0, 
                        left: 0, 
                        position: "relative"
                    })
                    .appendTo(droppedOn);
                checkIfSolved();
            }
        });
    }
});