import { elements } from "./base";

const formatNumber = number => {
    number = parseInt(number)
    return number < 10 ? number = '0' + number : number;
} 

export const renderClock = ({hours, minutes, seconds}) => {
    const markup = `
            <span class="clock__hours">${hours > 12 ? hours - 12 : hours}</span> :
            <span class="clock__minutes">${formatNumber(minutes)}</span> :
            <span class="clock__seconds">${formatNumber(seconds)}</span> ${hours >= 12 ? 'PM' : 'AM'}`;

    elements.clock.insertAdjacentHTML('beforeend', markup);
}


