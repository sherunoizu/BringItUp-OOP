export interface ISliderSelectors {
  pageSelector: string;
  buttonsSelector: string;
  nextButton?: string;
  prevButton?: string
}

export class Slider {
  page: HTMLDivElement;
  slides: HTMLDivElement[];
  buttons: NodeListOf<HTMLButtonElement>;
  slideIndex: number;

  autoPopupImage: HTMLDivElement;

  constructor({pageSelector = '', buttonsSelector = '', nextButton = '', prevButton = ''}: ISliderSelectors) {
    this.page = document.querySelector(pageSelector);
    this.slides = Array.from(this.page.children) as HTMLDivElement[];
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.slideIndex = 1;
  }

  
}
