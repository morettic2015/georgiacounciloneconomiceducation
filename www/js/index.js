/**
 * Init Event With JQuery
 * */


var quizzUtils;
var analytics;
/**
 * @Events from Mobile device App inicialization
 * */
ons.ready(function() {
    // Cordova APIs are ready
    console.log(window.device);
    //alert("");
    //Init Quizz Utils
    quizzUtils = new QuizzUtils();
    quizzUtils.initQuizzStats();
    //Init google Analytics
    //Need to change key
    //set the tracking id
    window.ga.startTrackerWithId('UA-57197864-6', 30);
});


