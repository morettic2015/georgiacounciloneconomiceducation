/**
 *  @Class QuizzUtils
 *  @author Luis Augusto Machado Moretto
 *  @copyright https://morettic.com.br
 * */
var isReadOnly = false;

var QuizzUtils = function() {
    this.qz = null;
    this.qI = null;
    this.currentAnswer = null;
    /**
     * @ Init Quizzz
     * */

    /**
     * Set marked indice
     * */
    this.choose = function(i) {
        this.currentAnswer = i;
    }

    this.initQuizzStats = function() {
        document.getElementById('btContinue').style.display = "none";
        //Listener for Page load
        document.addEventListener('init', function(event) {
            //alert(event);
            var page = event.target;
            if (page.matches('#quizz')) {
                ons.notification.alert('Lets Start!');
                quizzUtils.showQuizzUI();

                $("#btBack").css("background-color", "#deb406");
                $("#btNext").css("background-color", "#deb406")

            } else {//Init States
                quizzUtils = new QuizzUtils();
                //quizzUtils.initQuizzStats();
            }
        });
    }
    /**
     *  @Display Behavior
     * */
    this.showQuizzUI = function() {
        if (this.qI.img != null) {
            document.getElementById('imgQItem').src = this.qI.img;
            document.getElementById('imgQItem').style.visibility = 'visible';
            document.getElementById('imgQItem').style.width = '240px';
            document.getElementById('imgQItem').style.height = '120px';
        } else {
            document.getElementById('imgQItem').src = '#';
            document.getElementById('imgQItem').style.visibility = 'hidden';
        }
        var groupQz = null;
        var headerColor = "";
        switch (this.qI.group) {
            case 1:
                groupQz = "Fundamentals";
                headerColor = "#2d3092";
                break;
            case 2:
                groupQz = "Microeconomics";
                headerColor = "#2d3092";
                break;
            case 3:
                groupQz = "Macroeconomics";
                headerColor = "#2d3092";
                break;
            case 4:
                groupQz = "International";
                headerColor = "#2d3092";
                break;
            case 5:
                groupQz = "Personal Finance";
                headerColor = "#2d3092";
                break;
        }
        $("#txtQuizzType").text(groupQz);
        $("#txtExcerpt").text(this.qI.excerpt);
        $("#txtOpt1").text(this.qI.answers[0].opt);
        $("#txtOpt2").text(this.qI.answers[1].opt);
        $("#txtOpt3").text(this.qI.answers[2].opt);
        $("#txtOpt4").text(this.qI.answers[3].opt);
        //Unckeck
        if (!isReadOnly) {//havent answered question yet
            document.getElementById("radio-1").checked = false;
            document.getElementById("radio-2").checked = false;
            document.getElementById("radio-3").checked = false;
            document.getElementById("radio-4").checked = false;
        }
        var pos = this.qz.currentPosition;
        var counterStats = pos + " of " + this.qz.quizzSize;
        $("#txtCounter").text(counterStats);
        //@todo load questions
        this.currentAnswer = null;
    }
    /**
     * Start Quizz
     * */
    this.startQuizz = function(questions) {
        //Init Start Quizz Button

        this.qz = new Quizze();
        //Show on UI
        //setTimeout(this.showQuizzUI(), 3000);

        var myLastAnswers = localStorage.getItem("answers");
        var myLastQuestions = localStorage.getItem("questions");
        //Has LocalStorage older question??
        if (myLastAnswers !== undefined && myLastAnswers !== null) {
            myLastAnswers = JSON.parse(myLastAnswers);
            myLastQuestions = JSON.parse(myLastQuestions);
            this.qz.lQuizzes = myLastQuestions;
            this.qz.answers = myLastAnswers;
            this.qI = this.qz.nextQuizz(0);
            this.qz.currentPosition = this.qz.answers.length;
        } else {
            this.qz.currentPosition = 0;
            this.qz.createQuizze(questions);
            this.qz.fillQuizze();
            //First one //set as undefined
            this.qI = this.qz.nextQuizz(undefined);
        }

        //track quiz started event
        var isRetake = localStorage.getItem("completed");
        var action = isRetake ? "quiz retaken" : "quiz started";
        window.ga.trackEvent(action, action, action, 1);
        //Open QUiz page
        document.querySelector('#myNavigator').pushPage('quizz.html', {data: "none"});
    }
    /**
     * @Pause Quizz
     * */
    this.pauseQuizz = function() {
//If Confirm go to pause Screen
        if (confirm('Are you sure?')) {
            localStorage.setItem("answers", JSON.stringify(this.qz.answers));
            localStorage.setItem("questions", JSON.stringify(this.qz.lQuizzes));
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

        this.qI = this.qz.beforeQuizz();
        this.showQuizzUI();
        var pos = this.qz.currentPosition;
        pos = pos > 0 ? pos - 1 : 0;
        var checkPos = this.qz.answers[pos];
        this.currentAnswer = checkPos;
        var radio12 = "";
        switch (checkPos) {
            case 0:
                radio12 = "radio-1";
                break;
            case 1:
                radio12 = "radio-2";
                break;
            case 2:
                radio12 = "radio-3";
                break;
            case 3:
                radio12 = "radio-4";
                break;
            default:
                radio12 = null;
                break;
        }
        try {
            document.getElementById(radio12).checked = true;
        } catch (e) {
            console.log(e);
        }
        document.getElementById("radio-1").disabled = true;
        document.getElementById("radio-2").disabled = true;
        document.getElementById("radio-3").disabled = true;
        document.getElementById("radio-4").disabled = true;

    }
    /**
     * @Next navigation Quizz
     * */
    this.nextQuizz = function() {

        var a1 = this.qz.answers[this.qz.currentPosition];
        if (a1 !== undefined) {//Already been answered
            isReadOnly = true;
            var pos = this.qz.currentPosition - 1;
            var checkPos = this.qz.answers[pos];
            this.currentAnswer = checkPos;
            var radio12 = "";
            switch (checkPos) {
                case 0:
                    radio12 = "radio-1";
                    break;
                case 1:
                    radio12 = "radio-2";
                    break;
                case 2:
                    radio12 = "radio-3";
                    break;
                case 3:
                    radio12 = "radio-4";
                    break;
                default:
                    radio12 = null;
                    break;
            }
            try {
                document.getElementById(radio12).checked = true;
                document.getElementById("radio-1").disabled = true;
                document.getElementById("radio-2").disabled = true;
                document.getElementById("radio-3").disabled = true;
                document.getElementById("radio-4").disabled = true;
            } catch (e) {
                console.log(e);
            }
        } else { //Not yet
            isReadOnly = false;
            document.getElementById("radio-1").disabled = false;
            document.getElementById("radio-2").disabled = false;
            document.getElementById("radio-3").disabled = false;
            document.getElementById("radio-4").disabled = false;
        }
        //Verify from memory
        this.currentAnswer = this.qz.answers[this.qz.currentPosition] !== undefined ? this.qz.answers[this.qz.currentPosition] : this.currentAnswer;
        if (this.currentAnswer === null) {
            ons.notification.alert('Choose an option before proceed');
        } else {
            this.qI = this.qz.nextQuizz(this.currentAnswer);
            this.showQuizzUI();
            this.currentAnswer = null;
        }
    }
}
/**
 * Quizz rules
 * */
var Quizze = function() {
    this.answers = new Array();
    this.score = 0;
    this.quizzSize = 10;
    this.lQuizzes = new Array();
    this.rightAnswer = -1;
    this.currentPosition = 0;
    this.lPosRandom = new Array();
    this.fullQuizzes = questions; //Json File with Quizz questions

    this.createQuizze = function(questions) {
        this.fullQuizzes = questions; //Json File with Quizz questions
    }
//}
//Get vector of 10 questions to start quizz
    this.getRandomPos = function(list) {
        var posTmp = Math.floor((Math.random() * list.length));
        if (this.lPosRandom[posTmp] === undefined) {//Dont have que Quizz item sorted on list
            this.lQuizzes.push(this.fullQuizzes[posTmp]);
            this.lPosRandom[posTmp] = -1; //set pos as existing one to mark as a flag
        } else {
            this.getRandomPos(list); //recursive;
        }
    }
//Sort 10 questions each session// this.quizzSize value
    this.fillQuizze = function() {
        for (i = 0; i < this.quizzSize; i++) {
            this.getRandomPos(this.fullQuizzes);
        }
    }

    this.beforeQuizz = function() {
        this.currentPosition--;

        this.currentPosition = this.currentPosition >= 0 ? this.currentPosition : 0;

        return this.currentPosition > 0 ? this.lQuizzes[this.currentPosition] : this.lQuizzes[0];
    }
    this.nextQuizz = function(answ) {
        /**
         *  @if question answer not undefined and current answer is undefined update set answer.
         *  Can answer only one time
         * */
        if (this.answers[this.currentPosition] === undefined && answ !== undefined)
            this.calcScore(this.currentPosition - 1, answ);

        if (this.currentPosition >= this.lQuizzes.length) {//FINISH

            //track quiz completed event
            window.ga.trackEvent('quiz completed', 'quiz completed', 'quiz completed', 1);
            //High Score
            if (this.score >= 10) {
                window.ga.trackEvent('perfect score', 'perfect score', 'perfect score', 1);
            }

            //Alert Score.
            ons.notification.alert('Your Score:' + this.score);

            //Save current state
            localStorage.setItem("completed", true);

            //Remove pause status
            localStorage.removeItem("answers");
            localStorage.removeItem("questions");

            // Reload original app url (ie your index.html file)
            if (confirm("Wish to finish Quizz??")) {
                navigator.splashscreen.show();
                window.location.href = 'index.html';
                setTimeout(navigator.splashscreen.hide(), 5000);
            } else {
                //return objeto

                return this.lQuizzes[this.lQuizzes.length - 1];
            }
        } else {//NEXT QUIZZ
            //Store Answer
            return this.lQuizzes[this.currentPosition++];
        }
    }
    /**
     *  @Calculate User Score
     * */
    this.calcScore = function(pos, answer) {
        if (pos < 0) {//negative position
            return;
        }
        var questionItem = this.lQuizzes[pos];
        this.answers[pos] = answer;
        try {
            if (questionItem.answers[parseInt(answer)].isFine) {
                this.score++; //
                //@todo
                $("#statusMsg").html("Thats it! You got it");
            } else {
                $("#statusMsg").html("Wrong answer!");
                //Todo
            }
            showPopover($("#btNext"));
        } catch (e) {
            console.log(e);
        }
    }
}