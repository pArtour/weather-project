export default class Clock {
    constructor(offset) {
        [this.hours, this.minutes, this.seconds] = new Date( new Date().getTime() + offset * 1000).toUTCString().replace( / GMT$/, "" ).match(/\d{0,2}:\d{0,2}:\d{0,2}/g)[0].split(':');
    }
}
