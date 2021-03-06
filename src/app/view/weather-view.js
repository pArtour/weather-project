import { elements } from "./base";

const formatTime = time => {
    let [hours, minutes] = time;
    let str = hours >= 12 ? 'PM' : 'AM';
    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes < 9 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${str}`;
}

const kelvinToCelcius = temperature => Math.round(temperature - 273);

export const renderWeather = (weatherList, dayNumber = 0) => {
    const day = weatherList[dayNumber];
    
    day.forEach(weatherObj => {
        const time = weatherObj.dt_txt.split(' ')[1].slice(0,5).split(':').map(item => parseInt(item)),
              temperature = kelvinToCelcius(weatherObj.main.temp),
              feelsTemp = kelvinToCelcius(weatherObj.main.feels_like),
              weatherCondition = weatherObj.weather[0].description,
              humidity = weatherObj.main.humidity,
              cloudiness = weatherObj.clouds.all,
              wind = weatherObj.wind.speed,
              imgUrl = weatherObj.weather[0].icon;
        const markup = `
            <li class="weather__item">
              <button class="weather__hour weather-toggle-btn">${formatTime(time)}</button>
              <div class="weather__info-block">
                <img src="http://openweathermap.org/img/wn/${imgUrl}@2x.png" alt="${weatherCondition}" class="weather__icon">
                <p class="weather__text">Temperature<span class="weather__temp">${temperature} C</span></p>
                <p class="weather__text">Feels like<span class="weather__feels">${feelsTemp} C</span></p>
                <p class="weather__text">Condition<span class="weather__condition">${weatherCondition}</span></p>
                <p class="weather__text">Humidity<span class="weather__humidity">${humidity}%</span></p>
                <p class="weather__text">Cloudiness<span class="weather__cloudiness">${cloudiness}%</span></p>
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
