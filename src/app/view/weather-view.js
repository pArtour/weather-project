import { elements } from "./base";

const formatTime = time => {
    let [hours, minutes] = time.split(':');
    if (parseInt(hours) > 11) {
        if (hours == 12) {
            time += ' PM';
            return time;
        }
        hours = hours - 12;
        time = `${hours}:${minutes} PM`;
    } else {
        time += 'AM'
    }
    return time;
}
const kelvinToCelcius = temperature => Math.round(temperature - 273);

export const renderWeather = weatherList => {
    const day = weatherList[0];
    day.forEach((weatherObj, index) => {
        const time = weatherObj.dt_txt.split(' ')[1].slice(0,5),
              temperature = kelvinToCelcius(weatherObj.main.temp),
              feelsTemp = kelvinToCelcius(weatherObj.main.feels_like),
              weatherCondition = weatherObj.weather[0].description,
              humidity = weatherObj.main.humidity,
              wind = weatherObj.wind.speed;
        const markup = `
            <li class="weather__item">
    
              <button class="weather__hour">${formatTime(time)}</button>
    
              <div class="weather__info-block weather__info-block_active">
    
                <img  alt="" class="weather__icon">
      
                <p class="weather__text">Temperature<span class="weather__temp">${temperature} C</span></p>
    
                <p class="weather__text">Feels like<span class="weather__feels">${feelsTemp} C</span></p>
      
                <p class="weather__text">Condition<span class="weather__condition">${weatherCondition}</span></p>
      
                <p class="weather__text">Humidity<span class="weather__humidity">${humidity}%</span></p>
      
                <p class="weather__text">Wind<span class="weather__wind">${wind} m/s</span></p>
    
              </div>
              
            </li>
        `
        console.log(weatherObj);
        
        elements.weather.list.insertAdjacentHTML('beforeend', markup);
    });
}

export const toggleWeatherBlock = (parent, event) => {
    
}
