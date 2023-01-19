import YouTubePlayer from 'youtube-player';

import type {YouTubePlayer as IYouTubePlayer} from 'youtube-player/dist/types';

export interface IVideoPlayer {
  triggersSelector: string;
  overlaySelector: string;
}

export class VideoPlayer {
  buttons: NodeListOf<HTMLButtonElement>;
  activeButton: HTMLButtonElement;
  overlay: HTMLDivElement;
  closeButton: HTMLButtonElement;
  player: IYouTubePlayer;
  path: string;

  constructor({triggersSelector, overlaySelector}: IVideoPlayer) {
    this.buttons = document.querySelectorAll(triggersSelector);
    this.overlay = document.querySelector(overlaySelector);
    this.closeButton = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  createPlayer(url: string) {
    this.player = YouTubePlayer('frame', {
      height: '100%',
      width: '100%',
      videoId: url
    });
  }

  onPlayerStateChange() {
    this.player.on('stateChange', event => {
      try {
        const blockedElement = this.activeButton.closest('.module__video-item')
          .nextElementSibling as HTMLDivElement;
        const playButton = this.activeButton
          .querySelector('svg')
          .cloneNode(true);
        const isElementClosed: boolean =
          blockedElement.querySelector('.play__circle') &&
          blockedElement
            .querySelector('.play__circle')
            .classList.contains('closed');

        if (event.data === 0 && isElementClosed) {
          blockedElement
            .querySelector('.play__circle')
            .classList.remove('closed');
          blockedElement.querySelector('svg').remove();
          blockedElement.querySelector('.play__circle').appendChild(playButton);
          blockedElement.querySelector('.play__text').textContent =
            'play video';
          blockedElement
            .querySelector('.play__text')
            .classList.remove('attention');
          blockedElement.style.opacity = `1`;
          blockedElement.style.filter = 'none';

          blockedElement.setAttribute('data-disabled', 'false');
        }
      } catch (error) {}
    });
  }

  bindTriggers() {
    this.buttons.forEach((button, i) => {
      try {
        const blockedElement = button.closest('.module__video-item')
          .nextElementSibling as HTMLDivElement;

        if (i % 2 == 0) {
          blockedElement.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}

      button.addEventListener('click', () => {
        const isButtonNotDisabled =
          !button.closest('.module__video-item') ||
          button
            .closest('.module__video-item')
            .getAttribute('data-disabled') !== 'true';

        if (isButtonNotDisabled) {
          this.activeButton = button;
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = `flex`;

            if (this.path !== button.getAttribute('data-url')) {
              this.path = button.getAttribute('data-url');
              this.player.loadVideoById({videoId: this.path});
            }
          } else {
            this.path = button.getAttribute('data-url');

            this.createPlayer(this.path);
          }
        }

        this.onPlayerStateChange();
      });
    });
  }

  bindCloseTriggers() {
    this.closeButton.addEventListener('click', () => {
      this.overlay.style.display = `none`;
      this.player.stopVideo();
    });
  }

  init() {
    if (this.buttons.length > 0) {
      this.bindTriggers();
      this.bindCloseTriggers();
    }
  }
}
