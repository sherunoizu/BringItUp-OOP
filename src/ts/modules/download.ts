export class Download {
  buttons: NodeListOf<HTMLButtonElement>;
  path: string;
  constructor(triggersSelector: string) {
    this.buttons = document.querySelectorAll(triggersSelector);
  }

  downloadItem(path: string) {
    event.preventDefault();
    const downloadLink = document.createElement('a');

    downloadLink.setAttribute('href', path);
    downloadLink.setAttribute('download', 'picture');
    downloadLink.style.display = `none`;

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const uniqButtonPath: string = button.getAttribute('content-link');
        this.path =
          uniqButtonPath === null ? 'assets/img/mainbg.jpg' : uniqButtonPath;
        this.downloadItem(this.path);
      });
    });
  }
}
