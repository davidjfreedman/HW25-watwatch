window.onload = app;

function padThaime(number) {
    if (number < 10) {
        var n = "0" + number;
        return n;
    } else {
        return number;
    }
}

function padThaimeMS(number) {
    if (number < 10) {
        number = "00" + number;
    } else if (number > 10 && number < 100) {
        number = "0" + number;
    }
    return number;
}
var timePassed = function(numbers) {
  
}
function Stopwatch() {
    this.times = []; // has the newDates saved in it
    this.interval = null; // sets the interval as null to start
    this.interval_window = 16; //sets the interval to be as quick as can be
    this.html_element = document.querySelector('h1');
    this.startElement = document.querySelector('#startPause');
    this.stopElement = document.querySelector('#stop');
    this.resetElement = document.querySelector('#reset');
    this.watElement = document.querySelector('#WAT');
    this.handleClickEvents();
    this.started = false; // is the stopwatch on? 
    this.atZero = true; // is the stopwatch at zero or not?
}


Stopwatch.prototype.handleClickEvents = function() {
    var self = this; //’this’ statement set to ‘self’ variable for inner function

    //-------------------------------------//
    // start button event listener         //
    // -this will call out to the          //
    // Start, Pause, and Resume functions  //
    //-------------------------------------//

  
    this.startElement.addEventListener('click', function() {
        console.log('click');
        if (!self.started && self.atZero) { // if FALSE (if it hasn’t started) and time = 0, then start anew
            self.start();
            self.startElement.innerText = "Pause";//this.START
        } else if (self.started) {
            self.pause();
            self.startElement.innerText = "Resume";// if the watch is started, pause it
        } else if (!self.started && !self.atZero) {
            self.resume();
            self.startElement.innerText = "Pause";// if not started and time != 0, resume from current time
        }    
         
    }) 
   

    //-------------------------------------//
    // stop button event listener    //
    //-------------------------------------//

    this.stopElement.addEventListener('click', function() {
        if (!!self.started) { // if TRUE (if the watch is started)
            self.stop();           
        };
        self.startElement.innerText = "Start";//this.STOP

    }) //it should run no matter what

    //-------------------------------------//
    // RESET  button event listener
    //-------------------------------------//

    this.resetElement.addEventListener('click', function() {
        self.reset();
    })


    //-------------------------------------//
    // WAAAAAAT  button event listener
    //-------------------------------------//

    this.watElement.addEventListener('click', function() {
        self.wat();
    })
}



//-------------------------------------//
// Stopwatch functions            //
//-------------------------------------//

// function = self.pause() {
//     poop
// }

Stopwatch.prototype.start = function() {
    var self = this;
    this.times[0] = new Date()
    this.times[1] = new Date();
    this.started = true; //setting it to TRUE, that we’ve started
    this.interval = setInterval(function() { //~60 times a second...
        self.times[1].setTime( // set the time in milliseconds….
            self.times[1].getTime() + self.interval_window
        ); // to add time onto the saved time
        self.printElapsedTime(); //prints the newly saved time
    }, this.interval_window)
};

Stopwatch.prototype.stop = function() {
    clearInterval(this.interval);
    this.started = false;
    this.atZero = true; //keeps the clock at the current time, but resets it when start is pressed
};


Stopwatch.prototype.pause = function() {
    clearInterval(this.interval);
    this.started = false;
    this.atZero = false;
}; // all this does is clear the inteval, and set the values for further functions.

Stopwatch.prototype.resume = function() {
    var self = this;
    this.started = true; //setting it to TRUE, that we’ve started
    this.interval = setInterval(function() { //~60 times a second...
        self.times[1].setTime( // set the time in milliseconds….
            self.times[1].getTime() + self.interval_window //this probably won't work because of this line.
        ); // to add time onto the saved time
        self.printElapsedTime(); //prints the newly saved time
    }, this.interval_window)
};

Stopwatch.prototype.reset = function() {
    this.atZero = true;
    this.times[0] = new Date()
    this.times[1] = new Date(); //putting in new dates, otherwise it still grabs from the old ones
    this.html_element.innerText = ("00:00:00:000");
};
Stopwatch.prototype.wat = function() {};


//-------------------------------------//
// Function to print out time          //
//-------------------------------------//


Stopwatch.prototype.printElapsedTime = function() {
    var hr_elapsed = parseInt((this.times[1] - this.times[0]) / 3600000);
    var min_elapsed = parseInt((this.times[1] - this.times[0]) / 60000);
    var sec_elapsed = parseInt((this.times[1] - this.times[0]) / 1000);
    var ms_elapsed = (this.times[1] - this.times[0]);
    // if (ms_elapsed > 999) {
    //     ms_elapsed = 0
    // };

    //-------------------------------------//
    // events to keep the time within parameters            //
    //-------------------------------------//

    var ms_lap = parseInt(ms_elapsed / 999);
    var ms_elapsed = (ms_elapsed - (999 * ms_lap));

    function lap(input) {
        var lap = parseInt(input / 60);
        return (input - (60 * lap));
    };

    var sec_elapsed = lap(sec_elapsed);
    var min_elapsed = lap(min_elapsed);
    var hr_elapsed = lap(hr_elapsed);



    //-------------------------------------//
    // Pads the time if under a certain length            //
    //-------------------------------------//

    var hr_elapsed = padThaime(hr_elapsed);
    var min_elapsed = padThaime(min_elapsed);
    var sec_elapsed = padThaime(sec_elapsed);
    var ms_elapsed = padThaimeMS(ms_elapsed);

    //-------------------------------------//
    // Places the time in the DOM          //
    //-------------------------------------//

    this.html_element.innerText = (hr_elapsed + ":" + min_elapsed + ":" + sec_elapsed + ":" + ms_elapsed);
};

////////////////////////////////////
// ALL YOUR BASE ARE BELONG TO US //
////////////////////////////////////

function app() {
    var watch = new Stopwatch();
}
