export const elements = {
    clock: {
        hours: document.querySelector('.clock__hours'),
        minutes: document.querySelector('.clock__minutes'),
        seconds: document.querySelector('.clock__seconds')
    },
    weather: {
        list: document.querySelector('.weather__list')
    },
    calendar: document.querySelector('.calendar__list'),
    searchInput: document.querySelector('.city-input')
}

export const removeHTML = parent => {
    parent.innerHTML = '';
}

export const renderPreloader = parent => {
    parent.innerHTML = ' <div class="preloader"></div>';
}