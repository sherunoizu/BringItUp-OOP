export interface IDifferenceSelectors {
  officerSelector: string;
  cardItemsSelector: string;
}

export class Difference {
  officer: HTMLDivElement;
  cardItems: NodeListOf<HTMLDivElement>;
  counter: number;

  constructor({officerSelector, cardItemsSelector}: IDifferenceSelectors) {
    try {
      this.officer = document.querySelector(officerSelector);
      this.cardItems = this.officer.querySelectorAll(cardItemsSelector);
      this.counter = 0;
    } catch (e) {}
  }

  bindTriggers() {
    this.officer.querySelector('.plus').addEventListener('click', () => {
      if (this.counter !== this.cardItems.length - 2) {
        this.cardItems[this.counter].style.display = `flex`;
        this.counter++;
      } else {
        this.cardItems[this.counter].style.display = `flex`;
        this.cardItems[this.cardItems.length - 1].remove();
      }
    });
  }

  hideItems() {
    this.cardItems.forEach((card, i, arr) => {
      if (i !== arr.length - 1) {
        card.style.display = 'none';
      }
    });
  }

  init() {
    try {
      this.hideItems();
      this.bindTriggers();
    } catch (e) {}
  }
}
