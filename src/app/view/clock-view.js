import { elements } from "./base";

const formatNumber = (number) => {
    return number < 10 ? number = '0' + number : number = number;
} 

export const renderClock = ({hours, minutes, seconds}) => {
    elements.clock.hours.textContent = formatNumber(hours);
    elements.clock.minutes.textContent = formatNumber(minutes);
    elements.clock.seconds.textContent = formatNumber(seconds);
}