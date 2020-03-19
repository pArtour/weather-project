import { elements } from "./base";

export const renderCalendar = daysArr => {
    daysArr.forEach(day => {
        const markup = `
            <li class="calendar__item">
                <button class="calendar__btn">${day}</button>
            </li>`;
        elements.calendar.insertAdjacentHTML('beforeend', markup);
    });
};





