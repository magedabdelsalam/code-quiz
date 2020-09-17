// When I click start
// - Timer starts
// - Question gets generated
// - Multiple choice are given
// - Only one is correct
// - If correct, go to next question
// - if incorrect, remove 10 seconds
// - if timer is 0 or all questions are answered
// - Game is over
// - Display score and save it

var timer = 30;
var score = 0;
var qNa = {
    "questionOne":{
        question: "first question",
        options: [
            "wrong",
            "wrong",
            "wrong",
            "apple",
        ],
        answer: "apple"
    },
    "questionTwo":{
        question: "second question",
        options: [
            "wrong",
            "okokok",
            "wrong",
            "wrong",
        ],
        answer: "okokok"
    },
    "questionThree":{
        question: "third question",
        options: [
            "wrong",
            "wrong",
            "potato",
            "wrong",
        ],
        answer: "potato"
    }
}

$("#start-quiz").click(function(){

    $("#quiz-body").empty();

    var question = $("<h1>");
    $("#quiz-body").append(question);
    question.text(qNa.questionOne.question);
    for(var i=0;i<qNa.questionOne.options.length;i++){
        var options = $("<h3>");
        $("#quiz-body").append(options);
        options.text(qNa.questionOne.options[i]);
    }
    var timerDisplay = $("<h4>");
    $("#quiz-body").append(timerDisplay.text(timer));

    var countDown = setInterval(function(){ 
        timer = timer - 1;
        console.log(timer);
        if (timer <= 0){
            console.log("it's working");
            clearInterval(countDown);
            $("#quiz-body").empty();
            var gameOver = $("<h1>Game over</h1>");
            $("#quiz-body").append(gameOver);
            var tryAgain = $("<button id='start-quiz' class='btn btn-primary'>Try again?</button>");
            $("#quiz-body").append(tryAgain);
            
        }
        timerDisplay.text(timer)
    }, 1000);

    $("h3").click(function(){

        if($(this).text() === qNa.questionOne.answer){
            $("#quiz-body").empty();
            var question = $("<h1>");
            $("#quiz-body").append(question);
            question.text(qNa.questionTwo.question);
            for(var i=0;i<qNa.questionTwo.options.length;i++){
                var options = $("<h3>");
                $("#quiz-body").append(options);
                options.text(qNa.questionTwo.options[i]);
            }
        } else if ($(this).text() !== qNa.questionOne.answer){
            timer = timer - 10;
            console.log("Reduce " + timer + " second")
        }

        if($(this).text() === qNa.questionTwo.answer){
            console.log("yo it's wokrin")
            $("#quiz-body").empty();
            var question = $("<h1>");
            $("#quiz-body").append(question);
            question.text(qNa.questionThree.question);
            for(var i=0;i<qNa.questionThree.options.length;i++){
                var options = $("<h3>");
                $("#quiz-body").append(options);
                options.text(qNa.questionThree.options[i]);
            }
        } else if ($(this).text() !== qNa.questionOne.answer){
            timer = timer - 10;
            console.log("Reduce " + timer + " second")
        }


    })

});