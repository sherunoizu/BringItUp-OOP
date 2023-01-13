interface IMessage {
  loading: string;
  success: string;
  failure: string;
}

export class Form {
  forms: NodeListOf<HTMLFormElement>;
  inputs: NodeListOf<HTMLInputElement>;
  message: IMessage;
  path: string;

  constructor(formSelector: string) {
    this.forms = document.querySelectorAll(formSelector);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading...',
      success: 'THX! We will contact you soon',
      failure: 'Smth go wrong'
    };
    this.path = `assets/question.php`;
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = ``;
    });
  }

  checkMailInputs() {
    const emailInputs = document.querySelectorAll(
      '[type="email"]'
    ) as NodeListOf<HTMLInputElement>;

    emailInputs.forEach(input => {
      input.addEventListener('keypress', e => {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }

  async postData(url: string, data: FormData) {
    const res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text();
  }

  initMask() {
    const setCursorPosition = (
      position: number,
      element: HTMLInputElement
    ): void => {
      element.focus();

      if (element.setSelectionRange) {
        element.setSelectionRange(position, position);
      } else if ((element as any).createTextRange) {
        const range = (element as any).createTextRange();

        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
      }
    };

    function createMask(event: Event) {
      const matrix: string = '+1 (___) ___-____';
      const def: string = matrix.replace(/\D/g, '');
      let i: number = 0;
      let value: string = this.value.replace(/\D/g, '');

      if (def.length >= value.length) {
        value = def;
      }

      this.value = matrix.replace(/./g, (symbol: string): string => {
        const test = /[_\d]/.test(symbol) && i < value.length;

        return test ? value.charAt(i++) : i >= value.length ? '' : symbol;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = ``;
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    const inputs = document.querySelectorAll(
      `[name="phone"]`
    ) as NodeListOf<HTMLInputElement>;

    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();

        const statusMessage: HTMLDivElement = document.createElement('div');
        statusMessage.style.cssText = `
          margin-top: 15px;
          fint-size: 18px;
          color: grey;
        `;
        form.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData: FormData = new FormData(form);

        this.postData(this.path, formData)
          .then(res => {
            console.log({res});
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
          });
      });
    });
  }
}
