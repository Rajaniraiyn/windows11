//CALENDAR
//FOR CALENDAR POPUP
let popup_calendar = document.getElementsByClassName("calendar")[0];

function pop(){
  console.log("hello")
  if(popup_calendar.style.bottom == "-655px")
  {
    popup_calendar.style.bottom = "50px";
  }else{
    popup_calendar.style.bottom = "-655px";
  }
}

// DARK MODE TOGGLE
document.querySelector(".dark-mode-switch").onclick = () => {
  document.querySelector("div").classList.toggle("dark");
  document.querySelector("div").classList.toggle("light");
};

// CHECK LEAP YEAR
isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector(".calendar");

let month_picker = document.querySelector("#month-picker");

const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

month_picker.onclick = () => {
  month_list.classList.add("show");
};
// GENERATE CALENDAR

generateCalendar = (month, year) => {
  let calendar_days = document.querySelector(".calendar-days");
  calendar_days.innerHTML = "";
  let calendar_header_year = document.querySelector("#year");

  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currDate = new Date();

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  let first_day = new Date(month, year, 1);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");
    if (i >= first_day.getDay()) {
      day.classList.add("calendar-day-hover");
      day.innerHTML = i - first_day.getDay() + 1;
      day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add("curr-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");

month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;
  month.onclick = () => {
    month_list.classList.remove("show");
    curr_month.value = index;
    generateCalendar(curr_month.value, curr_year.value);
  };
  month_list.appendChild(month);
});

document.querySelector("#prev-year").onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector("#next-year").onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

function reset_month() {
  curr_month = { value: currDate.getMonth() };
  curr_year = { value: currDate.getFullYear() };
  generateCalendar(curr_month.value, curr_year.value);
}

// JAVASCRIPT FOR TIME
setInterval(() => {
  const time = document.querySelector("#time");
  const tbtime = document.querySelector("#taskbar_time")
  let date_time = new Date();
  let hours = date_time.getHours();
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();
  //   let day_night = "AM";
  //   if (hours > 12) {
  //     day_night = "PM";
  //     hours = hours - 12;
  //   }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  time.textContent = hours + ":" + minutes + ":" + seconds;
  tbtime.textContent = hours + ":" + minutes;

  //DATE
  let date = document.querySelector("#date");
  let tbdate = document.querySelector("#taskbar_date")

  let months = new Array();
  months[0] = "Jan";
  months[1] = "Feb";
  months[2] = "Mar";
  months[3] = "Apr";
  months[4] = "May";
  months[5] = "Jun";
  months[6] = "Jul";
  months[7] = "Aug";
  months[8] = "Sep";
  months[9] = "Oct";
  months[10] = "Nov";
  months[11] = "Dec";

  let date_no = date_time.getDate();
  let month_no = months[date_time.getMonth()];
  let year_no = date_time.getFullYear();

  date.textContent = date_no + " " + month_no + " " + year_no;
  tbdate.textContent = date_no + " " + month_no + " " + year_no;
});