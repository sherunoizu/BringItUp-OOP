import {Slider} from './slider';
import type {ISliderSelectors} from './slider';

export class MainSlider extends Slider {
  constructor({containerSelector, buttonsSelector}: ISliderSelectors) {
    super({containerSelector, buttonsSelector});
  }

  showSlides(currentSlide: number) {
    if (currentSlide > this.slides.length) {
      this.slideIndex = 1;
    }

    if (currentSlide < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.autoPopupImage.style.opacity = `0`;

      if (currentSlide === 3) {
        this.autoPopupImage.classList.add('animated');
        setTimeout(() => {
          this.autoPopupImage.style.opacity = `1`;
          this.autoPopupImage.classList.add('slideInUp');
        }, 3000);
      } else {
        this.autoPopupImage.classList.remove('slideInUp');
      }
    } catch (e) {}

    this.slides.forEach(slide => {
      slide.style.display = `none`;
    });

    this.slides[this.slideIndex - 1].style.display = `block`;
    this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
  }

  plusSlides(growth: number) {
    this.showSlides((this.slideIndex += growth));
  }

  bindTriggers() {
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

    document.querySelectorAll('.prevmodule').forEach(button => {
      button.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });

    document.querySelectorAll('.nextmodule').forEach(button => {
      button.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }

  init() {
    if (this.container) {
      try {
        this.autoPopupImage = document.querySelector('.hanson');
      } catch (e) {}

      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}
