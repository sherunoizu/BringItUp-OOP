import {MainSlider, SmallSlider} from './modules';
import {VideoPlayer} from './modules';
import {Difference} from './modules';
import {Form} from './modules';

import type {ISliderSelectors} from './modules';
import type {IVideoPlayer} from './modules';
import type {IDifferenceSelectors} from './modules';

window.addEventListener('DOMContentLoaded', () => {
  const mainSliderSelectors = {
    containerSelector: '.page',
    buttonsSelector: '.next'
  } as ISliderSelectors;

  const moduleMainSliderSelectors = {
    containerSelector: '.moduleapp',
    buttonsSelector: '.next'
  } as ISliderSelectors;

  const showUpSliderSelectors = {
    containerSelector: '.showup__content-slider',
    prevButtonSelector: '.showup__prev',
    nextButtonSelector: '.showup__next',
    activeClass: 'card-active',
    animate: true
  } as ISliderSelectors;

  const modulesSliderSelectors = {
    containerSelector: '.modules__content-slider',
    prevButtonSelector: '.modules__info-btns .slick-prev',
    nextButtonSelector: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  } as ISliderSelectors;

  const feedSliderSelectors = {
    containerSelector: '.feed__slider',
    prevButtonSelector: '.feed__slider .slick-prev',
    nextButtonSelector: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  } as ISliderSelectors;

  const mainSlider = new MainSlider(mainSliderSelectors);
  mainSlider.init();

  const moduleMainSlider = new MainSlider(moduleMainSliderSelectors);
  moduleMainSlider.init();

  const showUpSlider = new SmallSlider(showUpSliderSelectors);
  showUpSlider.init();

  const modulesSlider = new SmallSlider(modulesSliderSelectors);
  modulesSlider.init();

  const feedSlider = new SmallSlider(feedSliderSelectors);
  feedSlider.init();

  const mainVideoPlayerSelectors = {
    triggersSelector: '.showup .play',
    overlaySelector: '.overlay'
  } as IVideoPlayer;

  const secondVideoPlayerSelectors = {
    triggersSelector: '.module__video-item .play',
    overlaySelector: '.overlay'
  } as IVideoPlayer;

  new VideoPlayer(mainVideoPlayerSelectors).init();
  new VideoPlayer(secondVideoPlayerSelectors).init();

  const oldOfficerSelectors = {
    officerSelector: '.officerold',
    cardItemsSelector: '.officer__card-item'
  } as IDifferenceSelectors;

  const newOfficerSelectors = {
    officerSelector: '.officernew',
    cardItemsSelector: '.officer__card-item'
  } as IDifferenceSelectors;

  new Difference(oldOfficerSelectors).init();
  new Difference(newOfficerSelectors).init();

  new Form('.form').init();
});
