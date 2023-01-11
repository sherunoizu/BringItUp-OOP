export interface ISliderSelectors {
  pageSelector: string;
  buttonsSelector: string;
}

export class Slider {
  page: HTMLDivElement;
  slides: HTMLDivElement[];
  buttons: NodeListOf<HTMLButtonElement>;
  slideIndex: number;

  constructor({pageSelector, buttonsSelector}: ISliderSelectors) {
    this.page = document.querySelector(pageSelector);
    this.slides = Array.from(this.page.children) as HTMLDivElement[];
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.slideIndex = 1;
  }

  showSlides(currentSlide: number) {
    if (currentSlide > this.slides.length) {
      this.slideIndex = 1;
    }

    if (currentSlide < 1) {
      this.slideIndex = this.slides.length;
    }

    this.slides.forEach(slide => {
      slide.style.display = `none`;
    });

    this.slides[this.slideIndex - 1].style.display = `block`;
  }

  plusSlides(growth: number) {
    this.showSlides((this.slideIndex += growth));
  }

  render() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.plusSlides(1);
      });

      button.parentElement.previousElementSibling.addEventListener(
        'click',
        e => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        }
      );
    });

    this.showSlides(this.slideIndex);
  }
}
