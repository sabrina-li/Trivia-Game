$.getJSON("assets/config.json",function(data){
    questionObjArray = data;
    // console.log(questionObjArray);
});
var questionId=0;
$("#quizMain").hide();

$(document).ready(function(){
    $("#start").on("click",function(){
        restartGame();
    })
})

function restartGame(){
    questionId=0;
    $("#start").hide();
    $("#quizMain").show();
    displayNewQuestion();
}   
 //get a new question from array
//display new question and choices
//attach onclick
function displayNewQuestion(){
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
    $(".choiceItem").on("click",function(){
        console.log(this);
    })
    
}

//onclick answer
//if this.id == questionObjArray[questionId].answer
//correct
//else
//wrong
//questionsid ++ get another question