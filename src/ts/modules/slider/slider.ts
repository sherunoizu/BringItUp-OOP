export interface ISliderSelectors {
  containerSelector: string;
  buttonsSelector?: string;
  nextButtonSelector?: string;
  prevButtonSelector?: string;
  activeClass?: string;
  animate?: boolean;
  autoplay?: boolean;
}

export class Slider {
  container: HTMLDivElement;
  slides: HTMLDivElement[];
  buttons: NodeListOf<HTMLButtonElement>;
  prevButton: HTMLButtonElement;
  nextButton: HTMLButtonElement;
  activeClass: string;
  animate: boolean;
  autoplay: boolean;

  slideIndex: number;

  autoPopupImage: HTMLDivElement;

  constructor({
    containerSelector = null,
    buttonsSelector = null,
    nextButtonSelector = null,
    prevButtonSelector = null,
    activeClass = null,
    animate = false,
    autoplay = false
  }: ISliderSelectors) {
    this.container = document.querySelector(containerSelector);
    this.slides = Array.from(this.container.children) as HTMLDivElement[];
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.prevButton = document.querySelector(prevButtonSelector);
    this.nextButton = document.querySelector(nextButtonSelector);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;

    this.slides = this.slides.filter(slide => slide.tagName != 'BUTTON');
  }
}
