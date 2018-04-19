
// check if current tab is active or not
var vis = (function(){
    var stateKey, 
        eventKey, 
        keys = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})(); 

// Feature detects Navigation Timing API support.
if (window.performance) {
    var timeOutTimer = 0;
    var timeOutTotal = 0;
    var sendTiming = false;

    vis(function(){
        if(vis()){
        	setTimeout(function(){   
                // calculate timeout and add to total 
                timeOutTimer = Math.round(performance.now()) - timeOutTimer; 
                timeOutTotal = timeOutTotal + timeOutTimer;
            },300);													
        } else {
            // start timeout  
            timeOutTimer = Math.round(performance.now());
        }

        window.addEventListener("beforeunload", function (e) {
            // check if send already
            if(!sendTiming){ 
                var timeSincePageLoad = Math.round(performance.now()) - timeOutTotal;
                ga('send', 'timing', 'timeOnPage', 'load', timeSincePageLoad);
                sendTiming = true;
            }    
        });
    });
}
    
