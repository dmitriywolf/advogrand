import {navHeader} from './modules/navHeader.js';
import {modals} from './modules/modals.js';
import {scrolling} from "./modules/scrolling.js";
import {tariffs} from "./modules/tariffs.js";
import {forms} from "./modules/forms.js";
import {filter} from "./modules/filter.js";
import {carousel} from "./modules/carousel.js";


document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    navHeader();
    modals();
    scrolling();
    tariffs();
    forms();
    filter();
    carousel();

});