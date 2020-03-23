export const elements = {
    clock: document.querySelector('.clock'),
    weather: {
        list: document.querySelector('.weather__list')
    },
    calendar: document.querySelector('.calendar__list'),
    searchInput: document.querySelector('.city-input'),
}

export const removeHTML = parent => {
    parent.innerHTML = '';
}

export const renderPreloader = parent => {
    parent.innerHTML = ' <div class="preloader"></div>';
}