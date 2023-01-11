import {Slider} from './modules';

import type {ISliderSelectors} from './modules';

window.addEventListener('DOMContentLoaded', () => {
  const mainSliderSelectors = {
    pageSelector: '.page',
    buttonsSelector: '.next'
  } as ISliderSelectors;

  const mainSlider = new Slider(mainSliderSelectors);

  mainSlider.render();
});
