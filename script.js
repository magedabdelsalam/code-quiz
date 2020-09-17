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
var name = []
var score = 0;
var currentQuestion = 0;

var storedName = JSON.parse(localStorage.getItem("name"));
var storedScore = JSON.parse(localStorage.getItem("score"));

var questionOne = ["What does Arrakis mean?","A dog","A rabbit","A planet","A man","A planet"];
var questionTwo = ["What happens when shield and lazer gun interact?","Explode","Deflect","Penetrate","Nothing","Explode"];
var questionThree = ["What house is Paul from?","Emperor","Fremen","Harkonnen","Bene gesserit","Bene gesserit"];
var questions = [questionOne,questionTwo,questionThree];

for(var i=0;i<questions.length;i++){
    var questionDiv= $("<div>");
    questionDiv.attr("style","display: none");
    questionDiv.attr("id",i);
    questionDiv.attr("data-question","#"+i);
    questionDiv.attr("class","quiz-question col-12 mx-auto mb-3");
    $("#main").append(questionDiv);
    for(var j=0;j<5;j++){
        if (j===0){
            var questionH = $("<h1>");
            questionH.attr("class","question");
            $(questionDiv).append(questionH);
            questionH.text(questions[i][j]);
        } else {
            var questionP = $("<button>");
            questionP.attr("class","option btn btn-secondary btn-lg btn-block");
            $(questionDiv).append(questionP);
            questionP.text(questions[i][j]);
        }
    }
}

var gameOverDiv= $("<div>");
gameOverDiv.attr("style","display: none");
gameOverDiv.attr("class","quiz-over col-12 mx-auto mb-3");
$("#main").append(gameOverDiv);

var gameOverH = $("<h1>");
$(gameOverDiv).append(gameOverH);
gameOverH.text("Game over");

var gameOverP = $("<p>");
$(gameOverDiv).append(gameOverP);

var gameOverForm = $("<form>");
gameOverForm.attr("class","form-group");
$(gameOverDiv).append(gameOverForm);

var gameOverInput = $("<input>");
gameOverInput.attr("class","form-control");
$(gameOverForm).append(gameOverInput);

var scoreP = $("<h2>");
$(gameOverDiv).append(scoreP);
gameOverForm.submit(function(event){
    event.preventDefault()
    name = gameOverInput.val();
    storeName = localStorage.setItem("name",JSON.stringify(name));
    storeScore = localStorage.setItem("score",JSON.stringify(score));
    scoreP.text(name + " - " +score);
});
if(storedName || storedScore){
    scoreP.text(storedName + " - " +storedScore);
}


var timerDiv= $("<div>");
timerDiv.attr("style","display: none");
timerDiv.attr("class","quiz-timer col-12 mx-auto mb-3");
$("#main").append(timerDiv);

var timerH = $("<h4>");
$(timerDiv).append(timerH);
timerH.text(timer);

$("#start-quiz").click(function(){

    $("#quiz-body").attr("style","display: none");
    $(".quiz-timer").attr("style","display: block");
    $("#0").attr("style","display: block");

    var timeLeft = setInterval(function(){ 
        if (timer <= 0 || score === questions.length){
            $(".quiz-question").attr("style","display: none");
            $(".quiz-timer").attr("style","display: none");
            $(".quiz-over").attr("style","display: block");
            gameOverP.text("Your final score is " + score + ". Enter your name to record your score.");
            clearInterval(timeLeft);
        }
        $(".quiz-timer h4").text(timer);
        timer = timer - 1;
    }, 1000);

});
    
$(".option").click(function(){
    if($(this).text() === questions[currentQuestion][5]){
        var that = $(this).parent().attr("data-question");
        $(that).attr("style","display: none");
        $(that).next().attr("style","display: block");
        score++;
        console.log(score);
        currentQuestion++;
    } else if($(this).text() != questions[currentQuestion][5]){
        timer = timer - 10;
    }
});



