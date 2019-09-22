class Calendar {
  static MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  static WEEKS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  static MONTHSDAYS = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  constructor() {
    this.date = new Date();
    this.today = new Date();
  }
  get month () {
    return this.date.getMonth()
  }
  get year() {
    return this.date.getFullYear();
  }
  get day() {
    return this.date.getDate();
  }
  get years() {
      const years = [];
      for(let i = 1900; i < 2100; i++ ) {
        years.push(i);
      }
    return years
  }
  get days() {
    const len =  Calendar.MONTHSDAYS[this.month] ?Calendar.MONTHSDAYS[this.month] : this._chekLeapYear() ? 29 : 28;
    const list = [];
    for(let i = 1; i <= len; i++) {
      list.push(i);
    }
    return list;
  }
  get months() {
    return Calendar.MONTHS;
  }
  get weeks () {
    return Calendar.WEEKS;
  }
  set day(value) {
    this.date = new Date(`${this.year}-${this.month + 1}-${value}`);
  }
  set month(value) {
    this.date = new Date(`${this.year}-${value + 1}-${this.day}`);
  }
  set year(value) {
    this.date = new Date(`${value}-${this.month + 1}-${this.day}`)
  }
  _chekLeapYear() {
    return this.year % 400 === 0 || !(this.year % 4 === 0 && this.year % 100 !==0);
  }
};

const calendar = new Calendar();

const calendarBlock = document.querySelector('.calendar');
class CalendarDrawer {
  static drawHeader() {
    const header = document.createElement('header');
    const months = document.createElement('select');
    const years = document.createElement('select');
    months.className = 'months';
    years.className = 'years';

    months.onchange = event => {
     calendar.month = parseInt(event.target.value);
     calendarBlock.innerHTML = null;
     CalendarDrawer.drawCalendar();
    }
    years.onchange = event => {
      calendar.year = parseInt(event.target.value);
      calendarBlock.innerHTML = null;
      CalendarDrawer.drawCalendar();
    }
    calendar.months.forEach((month, index) => {
      const item = document.createElement('option');
      item.value = index;
      item.innerHTML = month;
      if(index === calendar.month) {
        item.setAttribute('selected', '');
      }
      months.appendChild(item);
    })

    calendar.years.forEach(elem => {
      const item = document.createElement('option');
      item.value = elem;
      item.innerHTML = elem;
      if(elem === calendar.year) {
        item.setAttribute('selected', '');
      }
      years.appendChild(item);
    })
    header.appendChild(months);
    header.appendChild(years);
    return header;
  }
  static drawMain() {
    const mainWrapper = document.createElement('div');
    const weeks = document .createElement('ul');
    const daysContainer = document.createElement('ul');
    mainWrapper.className = 'mainWrapper';
    weeks.className = 'weeks';
    daysContainer.className = 'daysContainer';

    calendar.weeks.forEach(e => {
      const week = document.createElement('li');
      week.innerHTML = e;
      weeks.appendChild(week);
    })
    calendar.days.forEach(e => {
      const day = document.createElement('li');
      day.innerHTML = e;
      e === calendar.day &&
       calendar.today.getMonth() === calendar.month &&
       calendar.today.getFullYear() === calendar.year ?
       day.style.backgroundColor = 'orange' : null;
      daysContainer.appendChild(day);
    })
    let dayPos = new Date(`${calendar.year}-${calendar.month + 1}-1`).getDay();
    dayPos === 0 ? dayPos = 6 : dayPos -= 1; 
    mainWrapper.appendChild(weeks);
    mainWrapper.appendChild(daysContainer);
    mainWrapper.lastChild.firstChild.style.marginLeft = `calc(100%/7*${dayPos})`; 
    return mainWrapper;
  }
  static drawCalendar() {
    calendarBlock.appendChild(CalendarDrawer.drawHeader());
    calendarBlock.appendChild(CalendarDrawer.drawMain());
    
  }
}

CalendarDrawer.drawCalendar();
