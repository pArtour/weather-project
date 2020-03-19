import "./styles/main.scss";
// api.openweathermap.org/data/2.5/forecast?q=Sillamäe&appid=d15a197088a06aa374d6a32ba2857654

import Weather from './app/modules/weather';
import Clock from './app/modules/clock';
import Calendar from './app/modules/calendar';
import * as clockView from './app/view/clock-view';
import * as weatherView from './app/view/weather-view';
import * as calendarView from './app/view/calendar-view';
import { elements, removeHTML } from './app/view/base';

const state = {}

const controlClock = () => {
    state.clock = new Clock();
};

setInterval(() => {
    controlClock();
    clockView.renderClock(state.clock);
}, 1000);



const calendarControl = (weatherArr) => {
    state.calendar = new Calendar(weatherArr);
    console.log(state.calendar);
    const daysArr = state.calendar.getDays();

    calendarView.renderCalendar(daysArr);

}
// Since the whole calendar data and view depends on the weather array,
// it is necessary to put calendarControl into the weatherControl function


const weatherControl = async () => {
    state.weather = new Weather('Sillamäe');
    const res = await state.weather.getWeather();
    const dataArr = res.data.list;

    // splitting one huge data array into orginized by days array 
    // resArr -> subArr (1 day) -> objects (weather info) 

    state.weatherArray = organizeArray(dataArr);
    weatherView.renderWeather(state.weatherArray);
    // console.log(state.weatherArray , state.weatherArray .length);

    calendarControl(state.weatherArray);
    

    
    elements.weather.list.addEventListener('click', weatherView.toggleWeatherBlock);
    
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
        console.log(dayNumber);
        removeHTML(elements.weather.list);
        weatherView.renderWeather(state.weatherArray, dayNumber);
        // Array.from(el.parentNode.children).indexOf(el)
        
    };
});

window.addEventListener('DOMContentLoaded', weatherControl)
// window.addEventListener('DOMContentLoaded', calendarControl)






