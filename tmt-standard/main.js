//this script use (P)OOP for manage the behavior of tomato.

window.onload = function(){
    var span = document.createElement('span');
    span.textContent = 'Pomodoro is ready';
    span.className += "spanTomato";
    span.id = "spanTom";

    var app = document.getElementById('spanBox');
    app.insertBefore(span,app.firstChild);

    tomato.init();      
}

var tomato = {
    minutes : 0,
    seconds: 0,
    started: false,
    minutesDom : 0,
    secondsDom : 0,
    countShortBreak: 0,
    countLongBreak:0,
    countTomato:1,

    init: function(){
        minutesDom = document.getElementById('minuti');
        secondsDom = document.getElementById('secondi');

        document.getElementById('start').onclick = function(){
           tomato.startWork();
        };

        document.getElementById('stop').onclick = function(){
            tomato.stopWork();
        };
        
        this.interval = setInterval(function() {
            tomato.intervallCallback();
        }, 1000);
    },

    startWork: function(){
        spanel = document.getElementById('spanTom');
        spanel.innerHTML ="Pomdoro number " + this.countTomato;

        this.resetVariables(25, 0, true);
    },

    stopWork: function(){
        if(this.countTomato == 1){
            spanel.innerHTML =this.countTomato + " pomodoro today";
        }else{
            spanel.innerHTML =this.countTomato + " pomodori today"; 
        }
        this.resetVariables(25, 0, false);
        tomato.updateDom();
    },

    resetVariables: function(mins, secs, started){
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
    },

    toDoubleDigit: function(num){     
        if (num < 10) {
            return "0" + parseInt(num, 10);      
        }
        return num;
    },

    updateDom: function(){
        minutesDom.innerHTML = this.toDoubleDigit(tomato.minutes);
        secondsDom.innerHTML = this.toDoubleDigit(tomato.seconds);
    },

    intervallCallback: function(){
        if(!tomato.started) return false;
        if(tomato.seconds == 0){
            if(tomato.minutes == 0){
                tomato.audio();
                tomato.break();
                return;
            }

            tomato.seconds = 59;
            tomato.minutes--;
        }else{
            tomato.seconds--;
        }
        tomato.updateDom();
    },

    audio:function(){
        var audio = new Audio('style/zapsplat_impact_metal_hollow_tube_002_15934.mp3');
        audio.play();
    },

    break: function(){
        if(this.countShortBreak == 0 &&  this.countLongBreak == 3){
            tomato.notifica("Go outside!");
            this.resetVariables(15, 0, true);
            this.countLongBreak = 0;
            this.countShortBreak = 1;
        }else{
            if(this.countShortBreak == 0){
                tomato.notifica("What about Coffee?");
                spanel.innerHTML ="Short break";
                this.resetVariables(5, 0, true);

                this.countShortBreak = 1;
                this.countLongBreak += 1;
            }else{
                tomato.notifica("Come to Work!");
                this.countTomato = this.countTomato+ 1;
                spanel.innerHTML ="Pomodoro number " + this.countTomato;
                this.resetVariables(25, 0, true);
                this.countShortBreak = 0;
            }
        }
    }, 

    notifica: function(msg){
        notifyMe(msg);
    },

    timerComplete: function(){
        tomato.started= false;
    }
};
