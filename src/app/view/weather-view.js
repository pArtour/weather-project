import { elements } from "./base";

const formatTime = time => {
    let [hours, minutes] = time.split(':');
    if (parseInt(hours) > 11) {
        if (hours === '12') {
            time += ' PM';
            return time;
        }
        hours = '0' + (hours - 12);
        time = `${hours}:${minutes} PM`;
    } else {
        time += ' AM'
    }
    return time;
}
const kelvinToCelcius = temperature => Math.round(temperature - 273);

export const renderWeather = (weatherList, dayNumber = 0) => {

    const day = weatherList[dayNumber];


    day.forEach(weatherObj => {
        console.log(weatherObj);
        
        const time = weatherObj.dt_txt.split(' ')[1].slice(0,5),
              temperature = kelvinToCelcius(weatherObj.main.temp),
              feelsTemp = kelvinToCelcius(weatherObj.main.feels_like),
              weatherCondition = weatherObj.weather[0].description,
              humidity = weatherObj.main.humidity,
              wind = weatherObj.wind.speed,
              imgUrl = weatherObj.weather[0].icon;
        const markup = `
            <li class="weather__item">
    
              <button class="weather__hour weather-toggle-btn">${formatTime(time)}</button>
    
              <div class="weather__info-block">
    
                <img src="http://openweathermap.org/img/wn/${imgUrl}@2x.png" alt="" class="weather__icon">
      
                <p class="weather__text">Temperature<span class="weather__temp">${temperature} C</span></p>
    
                <p class="weather__text">Feels like<span class="weather__feels">${feelsTemp} C</span></p>
      
                <p class="weather__text">Condition<span class="weather__condition">${weatherCondition}</span></p>
      
                <p class="weather__text">Humidity<span class="weather__humidity">${humidity}%</span></p>
      
                <p class="weather__text">Wind<span class="weather__wind">${wind} m/s</span></p>
    
              </div>
              
            </li>`;
        elements.weather.list.insertAdjacentHTML('beforeend', markup);
    });
}

export const toggleWeatherBlock = event => {
    const target = event.target;
    if (target.classList.contains('weather-toggle-btn')) {
        target.parentNode.classList.toggle('weather__item_active');
    }
}
