import axios from 'axios';
export default class Weather {
    constructor(cityName) {
        this.cityName = cityName
    }
    async getWeather() {
        try {
            const res = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=d15a197088a06aa374d6a32ba2857654`);
            return res;
        } catch (error) {
            throw new Error(`Somethin went wrong. ${error}`)
        }
    }
}