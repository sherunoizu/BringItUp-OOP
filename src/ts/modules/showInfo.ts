export class ShowInfo {
  buttons: NodeListOf<HTMLButtonElement>;
  constructor(triggersSelector: string) {
    this.buttons = document.querySelectorAll(triggersSelector);
  }

  init() {
    this.buttons.forEach(button => {
      const messageBlock = button.closest('.module__info-show')
        .nextElementSibling as HTMLDivElement;
      button.addEventListener('click', () => {
        messageBlock.classList.toggle('msg');
        messageBlock.style.marginTop = '20px';
      });
    });
  }
}
