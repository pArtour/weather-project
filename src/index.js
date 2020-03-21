import "./styles/main.scss";
import Weather from './app/modules/weather';
import Clock from './app/modules/clock';
import Calendar from './app/modules/calendar';
import * as clockView from './app/view/clock-view';
import * as weatherView from './app/view/weather-view';
import * as calendarView from './app/view/calendar-view';
import * as searchView from './app/view/search-view';
import { elements, removeHTML, renderPreloader } from './app/view/base';

const state = {}

const controlClock = () => {
    state.clock = new Clock(state.locationObj.timezone);
        clockView.renderClock(state.clock);

};

const calendarControl = (weatherArr) => {
    state.calendar = new Calendar(weatherArr);
    const daysArr = state.calendar.getDays();
    calendarView.renderCalendar(daysArr);
}
// Since the whole calendar and clock data and view depends on the weather array,
// it is necessary to put their controls into the weatherControl function


const weatherControl = async () => {
    renderPreloader(elements.weather.list);
    checkIntervalId(state.counter);
    
    state.weather = new Weather(searchView.getInputValue(elements.searchInput));
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
        const dayNumber = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
        removeHTML(elements.weather.list);
        weatherView.renderWeather(state.weatherArray, dayNumber);
        // Array.from(el.parentNode.children).indexOf(el)
        
    };
});
elements.searchInput.addEventListener('change', weatherControl);
window.addEventListener('DOMContentLoaded', searchView.focusInput)
// window.addEventListener('DOMContentLoaded', calendarControl)






