/**
 *  @Class QuizzUtils
 *  @author Luis Augusto Machado Moretto
 *  @copyright https://morettic.com.br
 * */
var QuizzUtils = function() {

    /**
     * @ Init Quizzz
     * */
    this.initQuizzStats = function() {
        document.getElementById('btContinue').style.display = "none";
    }
    /**
     * Start Quizz
     * */
    this.startQuizz = function() {
        //Init Start Quizz Button
        document.querySelector('#myNavigator').pushPage('quizz.html', {data: {title: 'Start Quizz'}});
    }
    /**
     * @Pause Quizz
     * */
    this.pauseQuizz = function() {
        //If Confirm go to pause Screen
        if (confirm('Are you sure?')) {
            document.querySelector('#myNavigator').pushPage('home.html', {data: {title: 'HOME'}});
            //Enable back button
            document.getElementById('btContinue').style.display = "visible";
        }
    }
    /**
     * @Continue Quizz
     * */
    this.continueQuizz = function() {
        document.querySelector('#myNavigator').pushPage('quizz.html', {data: {title: 'Continue Quizz'}});
    }
    /**
     * @Previous navigation Quizz
     * */
    this.previousQuizz = function() {

    }
    /**
     * @Next navigation Quizz
     * */
    this.nextQuizz = function() {

    }
}