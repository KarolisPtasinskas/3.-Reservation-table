function currentDate() {
  let date = new Date();
  return date;
}

function daysInMonth() {
  let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  return daysInMonth;
}

////////////////////////////////////////////////
////////////
//////////// Starting functions on page load.
////////////
////////////////////////////////////////////////

printDaysHTML();
printWeekHTML();
printContentHTML();
checkSessionStorage();
mouseClick();

//Checking sessionStorage. Creating if null or coloring reserved cells.

function checkSessionStorage() {
  let reservationTimes = JSON.parse(sessionStorage.getItem('reservationData'));
  if (reservationTimes === null) {
    sessionStorage.setItem( 'reservationData', JSON.stringify([]) );
    return;
  }
  for (let i = 0; i < reservationTimes.length; i++) {
    let activeCell = document.getElementsByClassName('active').namedItem(`${reservationTimes[i].id}`);
    changeBG(activeCell);
  }
}

////////////////////////////////////////////////
////////////
//////////// Creating HTML table
////////////
////////////////////////////////////////////////

//Printing all days of current month in HTML

function printDaysHTML() {
  let days = daysInMonth();
  let HTML = '';
  for (let i = 1; i <= days; i++) {
    let div = `<div id="day-${i}">${i}</div>`;
    HTML += div;
  }
  document.querySelector('.days-wrapper').innerHTML = HTML;
}

//Printing all days names of current month in HTML

function printWeekHTML() {
  let HTML = '';
  for (let i = 1; i <= daysInMonth(); i++){
    let dayNumber = new Date(currentDate().getFullYear(), currentDate().getMonth(), i).getDay();
    let dayName = returnDayName(dayNumber);
    let div = `<div>${dayName}</div>`;
    HTML += div
    }
    document.querySelector('.week-wrapper').innerHTML = HTML;
}

function returnDayName(dayNumber) {
  switch (dayNumber) {
    case 0:
      return dayName = "Sun";
      break;
    case 1:
      return dayName = "Mon";
      break;
    case 2:
      return dayName = "Tue";
      break;
    case 3:
      return dayName = "Wed";
      break;
    case 4:
      return dayName = "Thu";
      break; 
    case 5:
      return dayName = "Fri";
      break;
    case 6:
      return dayName = "Sat";
      break;
  }
}

//Printing all content DIV's/Cell's in HTML

function printContentHTML() {
  let rowHTML = '';
  for (let i = 1; i <= 17; i++) {
    let cellHTML = '';
    for (let e = 1; e <= daysInMonth(); e++) {
      let dayNumber = new Date(currentDate().getFullYear(), currentDate().getMonth(), e).getDay();
      let dayName = returnDayName(dayNumber);
      let filteredDay = filterDays(e, dayName);
      let div = `<div class="cell ${filteredDay}" id="${i + 5}-${e}-${dayName}"></div>`;
      cellHTML += div;
    }
    rowHTML += `<div class="content-row-wrapper">${cellHTML}</div>`;
  }
  document.querySelector('.output-wrapper').innerHTML = rowHTML;
}

//Filtering days. Adding premade style with class.

function filterDays(dayNumber, dayName) {
  if (dayNumber <= currentDate().getDate() && (dayName == 'Sat' || dayName == 'Sun')) {
    return `disabled weekend`;
  } else if (dayNumber <= currentDate().getDate()) {
    return `disabled`;
  } else if (dayName == 'Sat' || dayName == 'Sun') {
    return `weekend`;
  } else {
    return `active`;
  }
}

////////////////////////////////////////////////
////////////
//////////// Managing user actions
////////////
////////////////////////////////////////////////

//Registering mouse click on active days.

function mouseClick() {
  document.addEventListener('click', function(event){
    let choosenCell = event.target;
    if (!isActive(choosenCell)) {
      return;
    }
    if (cellReservated(choosenCell)) {
      return;
    }
    if (!checkReservationLimit()) {
      return;
    }
    
    addReservation(choosenCell);
    changeBG(choosenCell);
  });
}

//Adding reservation object to sessionStorage.

function addReservation(choosenCell) {

  let reservationData = JSON.parse(sessionStorage.getItem('reservationData'));
  let reservation = {
    id : choosenCell.id
  }
  reservationData.push(reservation);
  sessionStorage.setItem('reservationData', JSON.stringify(reservationData));
}

////////////////////////////////////////////////
////////////
//////////// Validating user input.
////////////
////////////////////////////////////////////////

//Checking if user pressed on active cell.

function isActive(choosenCell) {
  if (choosenCell.classList.contains('active')) {
    return true;
  }
  return false;
}

//Checking if there is les then 3 objects in sessionStorage data file ('reservationData')

function checkReservationLimit() {
  let reservationData = JSON.parse(sessionStorage.getItem('reservationData'));
  if (reservationData.length < 3) {
    return true;
  }
  return false;
}

//Checking if user pressed reserved cell. If YES reservation is removed. And DATA object of that cell is removed.

function cellReservated(choosenCell) {
  let reservationData = JSON.parse(sessionStorage.getItem('reservationData'));
  for (let i = 0; i < reservationData.length; i++) {
    if (reservationData[i].id == choosenCell.id) {
      reservationData.splice(i,1);
      sessionStorage.setItem('reservationData', JSON.stringify(reservationData));
      changeBG(choosenCell);
      return true;
    }
  }
  return false;
}

////////////////////////////////////////////////
////////////
//////////// Style management.
////////////
////////////////////////////////////////////////


//Changing clicked cell BG color.

function changeBG(choosenCell) {
  if (choosenCell.style.backgroundColor === 'green') {
    choosenCell.style.backgroundColor = '#dff0ff';
  } else choosenCell.style.backgroundColor = 'green';
  
}