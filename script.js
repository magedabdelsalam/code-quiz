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
var currentQuestion = 0;

var questionOne = [
    "1. What planet do the Atreides occupy at the beginning of Dune?",
    "1. Arrakis",
    "2. Giedi Prime",
    "3. Caladan",
    "4. Salusa Secundus",
    "3. Caladan"
    ]; // Question 1
var questionTwo = [
    "2. Which of the following defines Jessica’s relationship with Duke Leto?",
    "1. She is his daughter",
    "2. She is his sister",
    "3. She is his wife",
    "4. She is his concubine",
    "4. She is his concubine"
    ];  // Question 2
var questionThree = [
    "3. Jessica is a member of which of the following?",
    "1. Bene Gesserit",
    "2. Spacing Guild",
    "3. Harkonnen",
    "4. New York Knicks",
    "1. Bene Gesserit"
    ];  // Question 3
var questionFour = [
    "4. Who betrays Duke Leto?",
    "1. Stilgar",
    "2. Jessica ",
    "3. Dr. Yueh",
    "4. Duncan Idaho",
    "3. Dr. Yueh"
    ];  // Question 4
var questionFive = [
    "5. What is Paul’s tribal name among the Fremen?",
    "1. Stilgar",
    "2. Usul",
    "3. Chani",
    "4. Muad’Dib",
    "2. Usul"
    ];  // Question 5
var questionSix = [
    "6. What is the name of the emperor’s prison planet?",
    "1. Salusa Secundus",
    "2. Arrakis",
    "3. Corrino",
    "4. Caladan",
    "1. Salusa Secundus"
    ];  // Question 6
var questions = [questionOne,questionTwo,questionThree,questionFour,questionFive,questionSix]; // Nested array of questions

for(var i=0;i<questions.length;i++){
    // Make a div, hide it, style it, and append it to main view
    var questionDiv= $("<div>"); 
    questionDiv.attr("style","display: none");
    questionDiv.attr("id",i);
    questionDiv.attr("data-question","#"+i);
    questionDiv.attr("class","quiz-question col-12 mx-auto mb-3");
    $("#main").append(questionDiv);
    for(var j=0;j<5;j++){ //Loop through the questions array
        if (j===0){ // Pull the question for each question array
            var questionH = $("<h2>");
            questionH.attr("class","question");
            $(questionDiv).append(questionH);
            questionH.text(questions[i][j]);
        } else { // Otherwise pull the option for each question array
            var questionP = $("<button>");
            questionP.attr("class","option btn btn-secondary btn-lg btn-block");
            $(questionDiv).append(questionP);
            questionP.text(questions[i][j]);
        }
    }
}

// Make game over view div, hide it, style it and append it to main view
var gameOverDiv= $("<div>");
gameOverDiv.attr("id","quiz-over");
gameOverDiv.attr("style","display: none");
gameOverDiv.attr("class","col-12 mx-auto mb-3");
$("#main").append(gameOverDiv);

// Make game over view title and append it to game over div
var gameOverTitle = $("<h2>");
$(gameOverDiv).append(gameOverTitle);
gameOverTitle.text("Game over");
$(gameOverDiv).append(gameOverTitle);

var tryAgainBtn = $("<button>");
tryAgainBtn.attr("class","option btn btn-secondary btn-lg");
tryAgainBtn.attr("id","start-quiz-again");
tryAgainBtn.attr("style","display: none");
$(gameOverDiv).append(tryAgainBtn);
tryAgainBtn.text("Try again");

$("#start-quiz-again").click(function(){
    location.reload();
});

// Make game over view description and append it to game over div
var gameOverDescription = $("<h3>");
gameOverDescription.attr("id","score-explain");
$(gameOverDiv).append(gameOverDescription);

// Make game over score form and append it to game over div
var gameOverForm = $("<form>");
gameOverForm.attr("id","score-form");
gameOverForm.attr("class","form-group");
gameOverForm.attr("style","margin-bottom: 2rem;");
$(gameOverDiv).append(gameOverForm);

// Make game over score input and append it to game over div
var gameOverInput = $("<input>");
gameOverInput.attr("id","score-input");
gameOverInput.attr("class","form-control");
gameOverInput.attr("placeholder","Enter your name to record your score.");
$(gameOverForm).append(gameOverInput);

// Error Alert
var errorAlert = $("<p>")
$("#quiz-over").prepend(errorAlert);
errorAlert.attr("style","display: none");
errorAlert.attr("class","alert alert-danger");
errorAlert.text("Your name is too spicy. Please enter between 4-12 characters")


// Score Board Vars
var names = []; //names
var scores = []; //scores
var score = 0;
var isSubmitted = false;

function displayNameScore(){ //Go through names and scores and display them
    for(i=0;i<names.length;i++){
        var name = names[i];
        var score = scores[i];

        // Make game over recorded label and append it to game over div
        var scoreP = $("<h3>");
        scoreP.attr("class","quiz-score-board");
        $(gameOverDiv).append(scoreP);
        scoreP.text(i+1 + ". " + name + ": " + score*100);
    }
}

function start(){ //Pull stored names and scores and display them
    var storedNames = JSON.parse(localStorage.getItem("names"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if(storedNames != null || storedNames === 0){
        names = storedNames;
        scores = storedScores;
    }
    storeNameScore();
    displayNameScore();
}

function storeNameScore(){ //Store names and scores
    var storeNames = localStorage.setItem("names",JSON.stringify(names));
    var storeScores = localStorage.setItem("scores",JSON.stringify(scores));
}

gameOverForm.submit(function(event){ //Add a new name to the new score and update the scoreboard
    event.preventDefault()
    var newNameContent = $("#score-input").val().trim();
    var newScoreContent = score;
    if (!newNameContent || isSubmitted){
        return
    } else if(newNameContent.length >= 4 && newNameContent.length <= 12){
        names.unshift(newNameContent);
        scores.unshift(newScoreContent);
        $("#score-input").val("");
        $(".quiz-score-board").remove();
        $("#score-form").remove();
        $("#score-explain").remove();
        errorAlert.attr("style","display: none");
        tryAgainBtn.attr("style","display: block");
        isSubmitted = true;
        storeNameScore();
        displayNameScore();
    } else {
        errorAlert.attr("style","display: block");
    }
});

start();

// Make timer div, hide it, and add it to main view
var timerDiv= $("<div>");
timerDiv.attr("style","display: none");
timerDiv.attr("id","quiz-timer");
timerDiv.attr("class","col-12 mx-auto mb-3");
$("#main").append(timerDiv);

// Make timer counter and add it to timer div
var timerTitle = $("<h3>");
timerTitle.attr("style","font-size: 4rem;");
$(timerDiv).append(timerTitle);
timerTitle.text(timer + "s");

$("#start-quiz").click(function(){ // When you click start quiz button

    // Hide starting quiz body and display the timer
    $("#quiz-body").attr("style","display: none");
    $("#quiz-timer").attr("style","display: block");
    $("#0").attr("style","display: block");

    var timeLeft = setInterval(function(){ //Start the timer and stop when it reaches 0 or when you answer all the questions.
        if (timer <= 0 || score === questions.length){
            if (score === 0){
                $("#score-form").attr("style","display: none");
                $("#start-quiz-again").attr("style","display: block");
            }
            $("#quiz-timer").attr("style","display: none");
            $(".quiz-question").attr("style","display: none");
            $("#quiz-over").attr("style","display: block");
            clearInterval(timeLeft);
        }
        gameOverDescription.text("Score: " + score*100);
        timer = timer - 1;
        timerTitle.text(timer + "s");
    }, 1000);

});
    
$(".option").click(function(){ //
    if($(this).text() === questions[currentQuestion][questions[currentQuestion].length - 1]){ //if the option selected is equal to the answer then hide that current question and display the next one
        var that = $(this).parent().attr("data-question");
        $(that).attr("style","display: none");
        $(that).next().attr("style","display: block");
        score++; // Add 1 to score
        console.log(score);
        currentQuestion++; // Go to the next question
    } else if($(this).text() != questions[currentQuestion][5]){ // Reduce timer by 10 seconds if you select the wrong option
        $(this).attr("style","background:red;");
        timer = timer - 5;
    }
});



