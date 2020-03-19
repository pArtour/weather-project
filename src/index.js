import "./styles/main.scss";

import Weather from './app/modules/weather';
import Clock from './app/modules/clock';
import * as clockView from './app/view/clock-view';
import elements from './app/view/base';

const state = {}

const controlClock = () => {
    state.clock = new Clock();
};

setInterval(() => {
    controlClock();
    clockView.renderClock(state.clock);
}, 1000);

// api.openweathermap.org/data/2.5/forecast?q=Sillamäe&appid=d15a197088a06aa374d6a32ba2857654



const weatherControl = async () => {
    const weather = new Weather('Sillamäe');
    const res = await weather.getWeather()
    const data = res.data.list;

    // splitting one huge data array into orginized by days array 
    // resArr -> subArr (1 day) -> objects (weather info) 
    const organizedArray = organizeArray(data);

    
    console.log(organizedArray);

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






