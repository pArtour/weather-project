import "./styles/main.scss";
// api.openweathermap.org/data/2.5/forecast?q=Sillamäe&appid=d15a197088a06aa374d6a32ba2857654

import Weather from './app/modules/weather';
import Clock from './app/modules/clock';
import * as clockView from './app/view/clock-view';
import * as weatherView from './app/view/weather-view';
import { elements } from './app/view/base';

const state = {}

const controlClock = () => {
    state.clock = new Clock();
};

setInterval(() => {
    controlClock();
    clockView.renderClock(state.clock);
}, 1000);


const weatherControl = async () => {
    state.weather = new Weather('Sillamäe');
    const res = await state.weather.getWeather();
    const data = res.data.list;

    // splitting one huge data array into orginized by days array 
    // resArr -> subArr (1 day) -> objects (weather info) 
    const organizedWeatherArray = organizeArray(data);
    weatherView.renderWeather(organizedWeatherArray);
    console.log(organizedWeatherArray, organizedWeatherArray.length);
    
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

window.addEventListener('DOMContentLoaded', weatherControl)






