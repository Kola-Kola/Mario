class loader {

    constructor() {

        this._createBounds();
        this._grabDom();
        this._event();
        this._width = 0;
        this._coinValue = 0;
        this._soundJump = new Howl({
            src: ['assets/sounds/saut.wav'],
            volume: 0.3
        })
        this._soundCoin = new Howl({
            src: ['assets/sounds/piece.wav'],
            volume: 0.3
        })
    }

    /* GRAB DOM */

    _grabDom() {
        this._dom = {};
        this._dom.loader = document.querySelector('.loader');
        this._dom.sprite = document.querySelector('.loader-sprite');
        this._dom.token = document.querySelector('.loader-token-image');
        this._dom.coinHidden = document.querySelector('.loader-hidden');
        this._dom.coinValue = document.querySelector('.loader-coinValue');
        this._dom.hello = document.querySelector('.loader-hello');
        this._dom.image = document.querySelector('.loader-img');
    }

    /* END GRAB DOM */

    /* PRIVATE METHODS */

    _downJump(pEvt) {
        this._window = Math.round(this._width / document.body.clientWidth * 100);
        if (pEvt.keyCode == 32 && pEvt.target === document.body) {
            pEvt.preventDefault();
            if (!pEvt.repeat) {
                this._soundJump.play();
            }
            this._dom.sprite.style.top = '-25px';
            if (this._width == 41) {
                this._soundCoin.play();
                this._dom.token.classList.add('is-active');
                this._dom.coinValue.innerHTML = this._coinValue = this._coinValue + 1;
                this._dom.coinHidden.classList.add('is-hidden');
                setTimeout(() => {
                    this._dom.token.classList.remove('is-active')
                }, 1000)
            }
        }
    }

    _upJump(pEvt) {
        if (pEvt.keyCode == 32 && pEvt.target === document.body) {
            pEvt.preventDefault();
            this._dom.sprite.style.top = '0';
        }
    }

    _loaderAnimation() {
        setTimeout(() => {
            this._dom.hello.classList.add('is-active');
            this._width += 1;
            if (this._width <= 100) {
                this._dom.sprite.style.left = 'calc(' + this._width + '%' + ' - 80px)';
            }

        }, 2000)


        /*if (document.readyState !== 'complete') {
         this._dom.sprite.style.left = this._width + '%';
         } else {
         this._dom.loader.classList.add('loader-finish')
         clearInterval(this._loaderAnimation)
         }*/
    }

    _intervalBorder() {
        if (document.readyState === 'interactive') {
            setInterval(this._loaderAnimation, 200);
        }
    }

    /* END PRIVATE METHODS */

    /* EVENT METHODS */

    _event() {
        document.addEventListener('readystatechange', this._intervalBorder);
        document.addEventListener('keydown', this._downJump);
        document.addEventListener('keyup', this._upJump);
    }

    /* END EVENT METHODS */


    /* BIND THIS */

    _createBounds() {
        ['_grabDom', '_event', '_intervalBorder', '_loaderAnimation', '_downJump', '_upJump']
            .forEach((fn) => this[fn] = this[fn].bind(this));
    }

    /* END BIND THIS */

}
new loader();