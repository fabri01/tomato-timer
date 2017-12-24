window.onload=function(){var t=document.createElement("span");t.textContent="Pomodoro is ready",t.className+="spanTomato",t.id="spanTom";var o=document.getElementById("spanBox");o.insertBefore(t,o.firstChild),tomato.init()};var tomato={minutes:0,seconds:0,started:!1,minutesDom:0,secondsDom:0,countShortBreak:0,countLongBreak:0,countTomato:1,init:function(){minutesDom=document.getElementById("minuti"),secondsDom=document.getElementById("secondi"),document.getElementById("start").onclick=function(){tomato.startWork()},document.getElementById("stop").onclick=function(){tomato.stopWork()},this.interval=setInterval(function(){tomato.intervallCallback()},1e3)},startWork:function(){spanel=document.getElementById("spanTom"),spanel.innerHTML="Pomdoro number "+this.countTomato,this.resetVariables(25,0,!0)},stopWork:function(){1==this.countTomato?spanel.innerHTML=this.countTomato+" pomodoro today":spanel.innerHTML=this.countTomato+" pomodori today",this.resetVariables(25,0,!1),tomato.updateDom()},resetVariables:function(t,o,n){this.minutes=t,this.seconds=o,this.started=n},toDoubleDigit:function(t){return 10>t?"0"+parseInt(t,10):t},updateDom:function(){minutesDom.innerHTML=this.toDoubleDigit(tomato.minutes),secondsDom.innerHTML=this.toDoubleDigit(tomato.seconds)},intervallCallback:function(){if(!tomato.started)return!1;if(0==tomato.seconds){if(0==tomato.minutes)return tomato.audio(),void tomato["break"]();tomato.seconds=59,tomato.minutes--}else tomato.seconds--;tomato.updateDom()},audio:function(){var t=new Audio("style/zapsplat_impact_metal_hollow_tube_002_15934.mp3");t.play()},"break":function(){0==this.countShortBreak&&4==this.countLongBreak?(tomato.notifica("Go outside!"),this.resetVariables(15,0,!0),this.countLongBreak=0,this.countShortBreak=1):0==this.countShortBreak?(tomato.notifica("What about Coffee?"),spanel.innerHTML="Short break",this.resetVariables(5,0,!0),this.countShortBreak=1,this.countLongBreak+=1):(tomato.notifica("Come to Work!"),this.countTomato=this.countTomato+1,spanel.innerHTML="Pomodoro number "+this.countTomato,this.resetVariables(25,0,!0),this.countShortBreak=0)},notifica:function(t){notifyMe(t)},timerComplete:function(){tomato.started=!1}};