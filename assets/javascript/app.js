//API available: https://opentdb.com/api.php?amount=10&category=27&type=multiple
//GIFHY API: https://developers.giphy.com/dashboard/

//load vars&config
$.getJSON("assets/config.json",function(data){
    questionObjArray = data;
});
var questionId=0;
var timer=0;
var rightAns=0;
var wrongAns = 0;
var noAns = 0;
var showResultTime = 3000;//how long the git shows


//TODO hide use CSS
$("#quizMain").hide();

$(document).ready(function(){
    $("#start").on("click",function(){
        $("#start").addClass("active");
        setTimeout(() => {
            restartGame();
        }, 1000);
        
    })
})


function restartGame(){
    questionId=0;
    rightAns=0;
    wrongAns = 0;
    noAns = 0;
    $("#remainQuestions").text(questionObjArray.length);
    $("#startDiv").hide();
    $("#quizMain").show();
    displayNewQuestion();
}   
 //get a new question from array
//display new question and choices
//attach onclick
function displayNewQuestion(){
    if(questionId >= questionObjArray.length){
        console.error("questionsId",questionId," outside of index questionObjArray!");
        endGame();
        
    }else{
        $("#question").empty();
        $("#choices").empty();
        let thisquestion = questionObjArray[questionId].question;
        $("#question").html(`<h3>${thisquestion}<h3>`);
        questionObjArray[questionId].choices.forEach(function(element,index) {
            let thisChoice = $("<h4>");
            thisChoice.text(element);
            thisChoice.attr("id",index);
            thisChoice.addClass("choiceItem");
            $("#choices").append(thisChoice);
        });
        $(".choiceItem").on("click",choiceClicked)
    
        let timeRemaining = 3;

        $("#remainTime").text(timeRemaining +" Seconds");
        timer = setInterval(function(){
            $("#remainTime").text(--timeRemaining +" Seconds");
            if(timeRemaining === 0){
                // console.log("clear interval:",timer);
                clearInterval(timer);
                showTimeUpPage();
                questionId++;
                $("#remainQuestions").text(questionObjArray.length-questionId);
                setTimeout(() => {
                    displayNewQuestion();
                }, showResultTime);
            }
        },1000)
        // console.log("settimer: ",timer);
    }
}


function choiceClicked(){
    // $(this).off();
    // console.log("cleared timer:",timer);
    clearInterval(timer);
    if (this.id == questionObjArray[questionId].answer){
        showCorrectPage(questionId);
    }else{
        showWrongPage(questionId);
    }
    questionId++;
    $("#remainQuestions").text(questionObjArray.length-questionId);
    
    setTimeout(() => {
        displayNewQuestion();
    }, showResultTime);
}

function showCorrectPage(questionId){
    rightAns++;
    $("#question").html("<h3>Correct!!<h3>");
    $("#choices").html(`<img class="imgfit" src=${questionObjArray[questionId].gif} alt=${questionObjArray[questionId].keyword}>`)
}

function showWrongPage(questionId){
    wrongAns++;
    $("#question").html("<h3>Wrong Answer!!<h3>");
    $("#choices").html(`<h4>The Correct Answer was: ${questionObjArray[questionId].choices[questionObjArray[questionId].answer]}</h4><img class="imgfit" src=${questionObjArray[questionId].gif} alt=${questionObjArray[questionId].keyword}>`)
}
function showTimeUpPage(){
    noAns++;
    $("#question").html("<h3>Time's Up!!<h3>");
    $("#choices").html(`<h4>The Correct Answer was: ${questionObjArray[questionId].choices[questionObjArray[questionId].answer]}</h4><img class="imgfit" src=${questionObjArray[questionId].gif} alt=${questionObjArray[questionId].keyword}>`)
};

function endGame(){
    // alert("end"+rightAns+wrongAns+noAns);
    $("#question").html("<h3>All Done! Here is how you did:<h3>");
    $("#choices").html(`<h4>Correct Answers: ${rightAns}</h4> <h4>Wrong Answers: ${wrongAns}</h4><h4>Unanswered: ${noAns}</h4>`)
    // $("#choices").append(`<button id="restart">Try Again?</button>`);
    $("#start").removeClass("active");
    $("#start").text("Restart");
    $("#startDiv").show();
    $("#restart").on("click",restartGame);
}
