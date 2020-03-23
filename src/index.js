import "./styles/main.scss";
import Weather from './app/modules/weather';
import Clock from './app/modules/clock';
import Calendar from './app/modules/calendar';
import * as clockView from './app/view/clock-view';
import * as weatherView from './app/view/weather-view';
import * as calendarView from './app/view/calendar-view';
import { elements, removeHTML, renderPreloader } from './app/view/base';

const state = {}

const controlClock = () => {
    state.clock = new Clock(state.locationObj.timezone);
    removeHTML(elements.clock)
    clockView.renderClock(state.clock);
};

const calendarControl = weatherArr => {
    state.calendar = new Calendar(weatherArr);
    const daysArr = state.calendar.getDays();
    calendarView.renderCalendar(daysArr);
}
// Since the whole calendar and clock data as well as view depends on the weather array,
// it is necessary to put their controls into the weatherControl function

const weatherControl = async () => {
    renderPreloader(elements.weather.list);
    checkIntervalId(state.counter);
    
    state.weather = new Weather(elements.searchInput.value);
    const res = await state.weather.getWeather();
    const dataObj = res.data;
    // splitting one huge data array into orginized by days array 
    // resArr -> subArr (1 day) -> objects (weather info) 
    state.weatherArray = organizeArray(dataObj.list);
    state.locationObj = dataObj.city;
    state.counter = setInterval(() => {
        controlClock();
    }, 1000);

    removeHTML(elements.weather.list);
    removeHTML(elements.calendar);
    weatherView.renderWeather(state.weatherArray);
    calendarControl(state.weatherArray);
    elements.weather.list.addEventListener('click', weatherView.toggleWeatherBlock);
}

function checkIntervalId(id) {
    if (id) {
        clearInterval(id);
    }
}

function organizeArray(array) {
    const resArr = [];
    array.forEach(elem => {
        let last = resArr[resArr.length - 1];
        if (!last || elem.dt_txt.match('00:00:00')) {
            resArr.push([elem])
        } else {
            last.push(elem)
        }
    });
    return resArr;
}

elements.calendar.addEventListener('click', event => {
    if (event.target.closest('.calendar__btn')) {

        const dayNumbersArr = Array.from(event.target.parentNode.parentNode.children),
              dayIndex = dayNumbersArr.indexOf(event.target.parentNode);

        dayNumbersArr.forEach(item => item.children[0].classList.remove('calendar__btn_active'));
        dayNumbersArr[dayIndex].children[0].classList.add('calendar__btn_active');
        
        removeHTML(elements.weather.list);
        weatherView.renderWeather(state.weatherArray, dayIndex);
    };
});
elements.searchInput.addEventListener('change', weatherControl);
window.addEventListener('DOMContentLoaded', () => elements.searchInput.focus());
