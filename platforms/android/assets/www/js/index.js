/**
 * Init Event With JQuery
 * */


var quizzUtils;

ons.ready(function() {
    // Cordova APIs are ready
    console.log(window.device);
    //alert("");
    //Init Quizz Utils
    quizzUtils = new QuizzUtils();
    quizzUtils.initQuizzStats();
});


