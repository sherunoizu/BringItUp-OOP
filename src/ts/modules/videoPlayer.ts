import YouTubePlayer from 'youtube-player';

import type {YouTubePlayer as IYouTubePlayer} from 'youtube-player/dist/types';

export interface IVideoPlayer {
  triggersSelector: string;
  overlaySelector: string;
}

export class VideoPlayer {
  buttons: NodeListOf<HTMLButtonElement>;
  overlay: HTMLDivElement;
  closeButton: HTMLButtonElement;
  player: IYouTubePlayer;

  constructor({triggersSelector, overlaySelector}: IVideoPlayer) {
    this.buttons = document.querySelectorAll(triggersSelector);
    this.overlay = document.querySelector(overlaySelector);
    this.closeButton = this.overlay.querySelector('.close');
  }

  createPlayer(url: string) {
    this.player = YouTubePlayer('frame', {
      height: '100%',
      width: '100%',
      videoId: url
    });
  }

  bindTriggers() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = `flex`;
        } else {
          const path: string = button.getAttribute('data-url');

          this.createPlayer(path);
        }
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
    this.bindTriggers();
    this.bindCloseTriggers();
  }
}
