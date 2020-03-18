import "./styles/main.scss";

// import Weather from './app/modules/weather';
import Clock from './app/modules/clock';
import * as clockView from './app/view/clock-view';
import elements from './app/view/base';

const state = {}

const controlClock = () => {
    state.clock = new Clock();
};

setInterval(() => {
    controlClock();
    clockView.renderClock(state.clock);
}, 1000);


