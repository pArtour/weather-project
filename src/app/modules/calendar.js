export default class Calendar {
    constructor(daysList) {
        this.days = daysList
    }
    getDays() {
       return this.days.map(item => item[0].dt_txt.split(' ')[0].split('-').slice(1).join('.'))
    }
    getDaysNumber() {
        return this.days.length;
    }

}