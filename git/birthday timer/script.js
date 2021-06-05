
let bd_date, v;
function checkEntry() {
    
    bd_date = document.getElementById('ddate').value;
    const Date_now = new Date();
    const b_date = new Date(bd_date);

    if (bd_date == "") {
        document.getElementById("demo").innerHTML = "Required* Enter a date";

    } else if (b_date.getFullYear() > Date_now.getFullYear()) {

        document.getElementById("demo").innerHTML = "Invalid date entered* <br/> Birth year can't be greater than current year!<br/> Try again";

    }

    else if ((b_date.getFullYear() == Date_now.getFullYear()) && (b_date.getMonth() > Date_now.getMonth())) {

        document.getElementById("demo").innerHTML = "Invalid date entered* <br/> Birth year month can't be greater than current year Month!<br/> Try again";
    }
    else if ((b_date.getFullYear() == Date_now.getFullYear()) && (b_date.getMonth() == Date_now.getMonth())) {

        if (b_date.getDate() >= Date_now.getDate()) {
            document.getElementById("demo").innerHTML = "Invalid date entered* <br/> Birth year Date can't be greater than current year Date!<br/> Try again";
        } else {
            document.getElementById("demo").innerHTML = "";
            document.getElementById("ddate").style.display = "none";

            v = new Date(Date_now.getFullYear() + 1, b_date.getMonth(), b_date.getDate());
            countdown();

            setInterval(countdown, 1000);

        }
    }

    else if ((b_date.getFullYear() < Date_now.getFullYear()) && (b_date.getMonth() == Date_now.getMonth())) {

        if (b_date.getDate() > Date_now.getDate()) {
            v = new Date(Date_now.getFullYear(), b_date.getMonth(), b_date.getDate());
            
        }
         else {
            v = new Date(Date_now.getFullYear() + 1, b_date.getMonth(), b_date.getDate());
            
        }
        document.getElementById("demo").innerHTML = "";
        document.getElementById("ddate").style.display = "none";

        countdown();

        setInterval(countdown, 1000);
    }

    else {

        document.getElementById("demo").innerHTML = "";
        document.getElementById("ddate").style.display = "none";

        countdown();

        setInterval(countdown, 1000);
        
    }


}

function countdown() {

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('mins');
    const secondsEl = document.getElementById('sec');

    const currentDate = new Date();
    
    const totalSeconds = (v - currentDate) / 1000;
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = setTime(hours);
    minutesEl.innerHTML = setTime(minutes);
    secondsEl.innerHTML = setTime(seconds);

}


function setTime(time) {
    return time < 10 ? `0${time}` : time;
}




