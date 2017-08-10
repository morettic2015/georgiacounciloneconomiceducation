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

        var myLastAnswers = localStorage.getItem("answers");
        //only continue if has previous session
        if (myLastAnswers === undefined || myLastAnswers === null) {
            document.getElementById('btContinue').style.display = "none";
        }
        //Listener for Page load
        document.addEventListener('init', function(event) {
            //alert(event);
            var page = event.target;
            if (page.matches('#quizz')) {
                //ons.notification.alert('Lets Start!');
                quizzUtils.showQuizzUI();
                showModal('modal');
                $("#btBack").css("background-color", "#deb406");
                $("#btNext").css("background-color", "#deb406")
                //Restart only if has finished it or exit
                document.getElementById('btRestart').style.display = "none";
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
        if (this.qI.img !== null) {
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
        $("#txtExcerpt").html(this.qI.excerpt);
        $("#txtTitle").html(this.qI.title);
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

        /* var myLastAnswers = localStorage.getItem("answers");
         var myLastQuestions = localStorage.getItem("questions");
         //Has LocalStorage older question??
         if (myLastAnswers !== undefined && myLastAnswers !== null) {
         myLastAnswers = JSON.parse(myLastAnswers);
         myLastQuestions = JSON.parse(myLastQuestions);
         this.qz.lQuizzes = myLastQuestions;
         this.qz.answers = myLastAnswers;
         this.qI = this.qz.nextQuizz(0);
         this.qz.currentPosition = this.qz.answers.length;
         } else {*/
        this.qz.currentPosition = 0;
        this.qz.createQuizze(questions);
        this.qz.fillQuizze();
        //First one //set as undefined
        this.qI = this.qz.nextQuizz(undefined);
        // }

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
        // if (confirm('Are you sure?')) {
        localStorage.setItem("answers", JSON.stringify(this.qz.answers));
        localStorage.setItem("questions", JSON.stringify(this.qz.lQuizzes));
        localStorage.setItem("position", this.qz.currentPosition--);
        //document.querySelector('#myNavigator').pushPage('home.html', {data: {title: 'HOME'}});
        //Enable back button
        //document.getElementById('btContinue').style.display = "visible";

        showModal('modal1');
        //  }
    }
    /**
     * @Continue Quizz
     * */
    this.continueQuizz = function() {
        this.qz = new Quizze();
        //Show on UI
        //setTimeout(this.showQuizzUI(), 3000);

        //get from localstorage
        var myLastAnswers = localStorage.getItem("answers");
        var myLastQuestions = localStorage.getItem("questions");
        var myLastPosition = localStorage.getItem("position");

        //Parse continued questions
        myLastAnswers = JSON.parse(myLastAnswers);
        myLastQuestions = JSON.parse(myLastQuestions);

        //init local objects
        this.qz.lQuizzes = myLastQuestions;
        this.qz.answers = myLastAnswers;
        this.qI = this.qz.nextQuizz(this.qz.answers[myLastPosition - 1]);
        this.qz.currentPosition = myLastPosition;

        //track quiz continue event
        var action = "quiz continue";
        window.ga.trackEvent(action, action, action, 1);
        document.querySelector('#myNavigator').pushPage('quizz.html', {data: {title: 'Continue Quizz'}});
    }
    /**
     * @CheckRadio
     * */
    this.checkRadio = function(checkPos) {
        var radio12 = null;
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
        return radio12;
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
        var radio12 = this.checkRadio(checkPos);

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
     *  @Navigate
     * */
    this.navigate = function(range) {
        hideModal('modal');
        ons.notification.alert('Lets start!');
        this.qz.currentPosition = range + 1;
        this.qI = this.qz.lQuizzes[this.qz.currentPosition];
        this.showQuizzUI();
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
            var radio12 = this.checkRadio(checkPos);
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
    this.qTT = [0, 0, 0, 0, 0];
    this.qTP = [1, 2, 3, 4, 5];
    this.quizzSize = 50;
    this.lQuizzes = new Array();
    this.rightAnswer = -1;
    this.currentPosition = 0;
    this.lPosRandom = new Array();
    this.fullQuizzes = questions; //Json File with Quizz questions
    this.IR = 0;
    this.gSize = 10;
    this.createQuizze = function(questions) {
        this.fullQuizzes = questions; //Json File with Quizz questions
    }
//}
//Get vector of 50 questions to start quizz
    this.getRandomPos = function(list) {
        var tp = this.qTT[this.IR];
        var posTmp = Math.floor((Math.random() * list.length));
        if (this.lPosRandom[posTmp] === undefined) {//Dont have que Quizz item sorted on list

            qz1 = this.fullQuizzes[posTmp];//get current sorted
            if (qz1.group === this.qTP[this.IR]) {//belongs to the current group?
                if (tp < this.gSize) {//
                    this.qTT[this.IR]++;
                    this.lQuizzes.push(qz1);
                    this.lPosRandom[posTmp] = -1; //set pos as existing one to mark as a flag
                } else {
                    this.IR++;
                    this.getRandomPos(list);
                }
            } else {
                this.getRandomPos(list);
            }
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

    this.navigateTo = function(range) {
        this.currentPosition = range;
    }

    this.nextQuizz = function(answ) {
        /**
         *  @if question answer not undefined and current answer is undefined update set answer.
         *  Can answer only one time
         * */
        if (this.answers[this.currentPosition] === undefined && answ !== undefined)
            this.calcScore(this.currentPosition - 1, answ);


        var totalAnswers = 0;
        var hasAllAnswers = false;
        for (i = 0; i < this.answers.length; i++) {
            if (this.answers[i] < 0) {
                break;
            }
            totalAnswers++;
        }

        hasAllAnswers = totalAnswers >= 50 ? true : false;

        if (hasAllAnswers) {//FINISH
            //show restart option
            document.getElementById('btRestart').style.display = "block";

            $("#btRestart").on("click", function() {
                navigator.splashscreen.show();
                setTimeout(function() {
                    navigator.splashscreen.hide();
                    window.location.href = 'index.html';
                }, 3000);
            });

            document.getElementById('btBackScr').style.display = 'none';
            //track quiz completed event
            window.ga.trackEvent('quiz completed', 'quiz completed', 'quiz completed', 1);
            //High Score
            if (this.score >= 50) {
                window.ga.trackEvent('perfect score', 'perfect score', 'perfect score', 1);
            }

            //Save current state
            localStorage.setItem("completed", true);

            //Remove pause status
            localStorage.removeItem("answers");
            localStorage.removeItem("questions");

            //return objeto
            this.currentPosition++;
            return this.lQuizzes[this.lQuizzes.length - 1];
            //}
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
            //todo animate
            document.getElementById('icoAnime').style.display = 'block';
            if (questionItem.answers[parseInt(answer)].isFine) {
                // document.$
                $("#icoAnime").html('<img  src="img/star.png" width="30"/>');


                //this.score++; //
                //@todo
                //   $("#statusMsg").html("Thats it! You got it");
            } else {
                $("#icoAnime").html('<img  src="img/frowing.png" width="30"/>');
                //  $("#statusMsg").html("Wrong answer!");
                //Todo
            }
            $("#icoAnime").effect("shake", {times: 4}, 1000);
            //$("#icoAnime").fadeOut("slow").delay(800).fadeIn("slow").delay(800);
            /*  $("#divAnimation1").animate({
             left: '250px',
             height: '+=150px',
             width: '+=150px'
             });*/
            //Show Explanation
            $("#statusMsg").html(questionItem.explanation);
            showPopover();
        } catch (e) {
            console.log(e);
        } finally {
            var limit1;
            var limit2;
            var str = "";
            switch (this.currentPosition) {
                case 10:
                    showModal('scoreMdl');
                    str = "Fundamentals";
                    limit1 = 0;
                    limit2 = 10;
                    break;
                case 20:
                    showModal('scoreMdl');
                    str = "Microeconomics";
                    limit1 = 10;
                    limit2 = 20;
                    break;
                case 30:
                    showModal('scoreMdl');
                    str = "Macroeconomics";
                    limit1 = 20;
                    limit2 = 30;
                    break;
                case 40:
                    showModal('scoreMdl');
                    str = "International";
                    limit1 = 30;
                    limit2 = 40;
                    break;
                case 50:
                    showModal('scoreMdl');
                    str = "Personal Finance";
                    limit1 = 40;
                    limit2 = 50;
                    break;
            }
            if (limit1 !== null) {

                this.score = 0;
                for (i = limit1; i < limit2; i++) {
                    var pAnswer = this.answers[i];
                    if (pAnswer === undefined || pAnswer === null)//Havent ansered it yet
                        continue;
                    if (this.lQuizzes[i].answers[pAnswer].isFine) {
                        this.score++;
                    } else {
                        console.log("Errrorr");
                    }
                }
                $("#txtScoreDash").html("<h1>" + str + "</h1><h3>Score:" + this.score + "</h3>");
            }
            limit1 = null;
            limit2 = null;
            /**this.score = 0;//Set score 0
             var total = this.answers.length;//For each answer verify is fine or not
             for (i = 0; i < total; i++) {
             var pAnswer = this.answers[i];
             if (pAnswer === undefined)//Havent ansered it yet
             continue;
             if (this.lQuizzes[i].answers[pAnswer].isFine) {
             this.score++;
             } else {
             console.log("Errrorr");
             }
             }*/
        }
    }
}
