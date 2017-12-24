
function notifyMe(msg) {
    var option = {
        icon: 'style/NotifyTomato.png'
    };
    // check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
  
    // check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(msg, option);
    }
  
    // we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(msgm, option);
        }
      });
    }

    setTimeout(notification.close.bind(notification), 2000);
   
  }