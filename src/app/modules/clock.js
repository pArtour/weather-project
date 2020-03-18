export default class Clock {
    constructor() {
        this.time = new Date();
        this.hours = this.time.getHours();
        this.minutes = this.time.getMinutes();
        this.seconds = this.time.getSeconds();
    }
    getHours() {
        return this.hours;
    }
    getMinutes() {
        return this.minutes;
    }
    getSeconds() {
        return this.seconds;
    }
}