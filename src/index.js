import "./main.scss";

import Weather from './app/modules/weather';
import * as weatherview from './app/view/weather-view';
import { elements, citiesId } from './app/view/base';

weatherview.alertHi();

for (const key in citiesId) {
    if (citiesId.hasOwnProperty(key)) {
        const element = citiesId[key];
        console.log(key + ' - ' + element);
    }
}
// console.log(citiesId['narva'])