import {Slider} from './modules';
import {VideoPlayer} from './modules';

import type {ISliderSelectors} from './modules';
import type {IVideoPlayer} from './modules';

window.addEventListener('DOMContentLoaded', () => {
  const mainSliderSelectors = {
    pageSelector: '.page',
    buttonsSelector: '.next'
  } as ISliderSelectors;

  const videoPlayerSelectors = {
    triggersSelector: '.showup .play',
    overlaySelector: '.overlay'
  } as IVideoPlayer;

  const mainSlider = new Slider(mainSliderSelectors);

  mainSlider.render();

  const player = new VideoPlayer(videoPlayerSelectors);
  player.init();
});
