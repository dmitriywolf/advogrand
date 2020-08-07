import navHeader from './modules/navHeader';
import modals from './modules/modals';
import scrolling from "./modules/scrolling";
import tariffs from "./modules/tariffs";
import forms from "./modules/forms";
import filter from "./modules/filter";
import carousel from "./modules/carousel";

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