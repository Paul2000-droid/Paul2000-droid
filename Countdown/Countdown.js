function IsLeapYear(year)
{
	//no need for else because once function returns something compiler immediately exits function

	if (year%4 == 0) {
		if (year%100 == 0) {
			if (year%400 == 0) {
				return true;
			}
			return false;
		}
		return true;
	}
	return false;	
}
function Countdown()
{
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();
	let date = today.getDate();

	TimeTillNextYear();

	document.getElementById("date").innerHTML = WordMonth(month) + " " + date + ", " + year;
}
function TimeTillNextYear()
{
	let today = new Date();
	let yr = today.getFullYear();
	let time = today.getTime();
	let countdownDate = new Date("Jan 1, " + (yr + 1) + " 12:00:00 AM").getTime();
	let distance = (countdownDate - time) / 1000;
	let numSecsInYr = 86400 * (365 + IsLeapYear(yr));
	let numSecsSinceYrStarted = Math.floor(numSecsInYr - distance);
	let timetillnextyear = document.getElementById("timetillnextyear");
	timetillnextyear.innerHTML = "<h2>Time Till Next Year</h2><div id=toptimer>" + TopTimer(distance) + "</div>";

	timetillnextyear.innerHTML = timetillnextyear.innerHTML + "<p>" + CommaFormat(numSecsSinceYrStarted) + " second(s) since this year (" + yr + ") started.</p>";
	timetillnextyear.innerHTML = timetillnextyear.innerHTML + "<p>" + CommaFormat(Math.ceil(distance)) + " seconds until " + (yr + 1) + ".</p>";
	timetillnextyear.innerHTML = timetillnextyear.innerHTML + "<p>" + CommaFormat(numSecsInYr) + " seconds total in " + yr + ".</p>";

	let percentofyrthatsover = (numSecsSinceYrStarted / numSecsInYr  * 100);
	timetillnextyear.innerHTML = timetillnextyear.innerHTML + "<p>" + percentofyrthatsover + "% of " + yr + " is over.</p>";


	document.getElementById("percentdone").style.width = percentofyrthatsover.toString() + "%";
	setTimeout(Countdown, 200);
}
function TopTimer(distance) {
	let d = Math.floor(distance / 86400);
	let h = Math.floor((distance % 86400) / 3600);
	let m = Math.floor((distance % 3600) / 60);
	let s = Math.ceil(distance % 60);
	
	if (s == 60) {
		s = 0;
		m++;
	}
	if (m == 60) {
		m = 0;
		h++;
	}
	
	let numSecsInYr = 86400 * (365 + IsLeapYear(new Date().getFullYear()));
	let numSecsSinceYrStarted = Math.floor(numSecsInYr - distance);
			
	if (numSecsSinceYrStarted < 86400)
		return "HAPPY NEW YEAR!!!";
	let stringM = "0" + m;
	let stringS = "0" + s;
	if (s > 9)
		stringS = s;
	if (m > 9)
		stringM = m;
	if (d > 0)
		return d + "d " + h + "h " + m + "m " + s + "s till " + (new Date().getFullYear() + 1);
	if (h > 0)
		return h + ":" + stringM + ":" + stringS;
	if (m > 0)
		return m + ":" + stringS;
	return s;
}
function WordMonth(month)
{
	switch(month%12) {
	case 0:
		return "January";
	case 1:
		return "February";
	case 2:
		return "March";
	case 3:
		return "April";
	case 4:
		return "May";
	case 5:
		return "June";
	case 6:
		return "July";
	case 7:
		return "August";
	case 8:
		return "September";
	case 9:
		return "October";
	case 10:
		return "November";
	case 11:
		return "December";
	}
	//just in case
	return "Error";
}
function CommaFormat(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
