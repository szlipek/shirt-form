class Form {

    constructor(form) {
        this.form = form;
        this.random = Math.floor(Math.random() * 30);
        this.btn = this.form.querySelector('.step__btn');
        this.current = 1;
        this.front = this.form.querySelector('.step__front');
        this.back = this.form.querySelector('.step__back');
        this.front.addEventListener('click', this.chooseSide.bind(this));
        this.back.addEventListener('click', this.chooseSide.bind(this));
        this.btn.addEventListener('click', this.nextStep.bind(this));
        this.stepsChoose = this.form.querySelector('.steps__choose');
        this.prevBtn = this.form.querySelector('.step__buttons-prev');
        this.nextBtn = this.form.querySelector('.step__buttons-next');
        this.randomBtn = this.form.querySelector('.step__buttons-random');
        this.prevBtn.addEventListener('click', this.prevImg.bind(this));
        this.nextBtn.addEventListener('click', this.nextImg.bind(this));
        this.randomBtn.addEventListener('click', this.randomImg.bind(this));
        this.frontImg = this.form.querySelector('.step__img-front');
        this.backImg = this.form.querySelector('.step__img-back');
        this.imgList = {};
        this.error = this.form.querySelector('.errors');
        this.btnPrev = this.form.querySelector('.prev__step');
        this.btnPrev.addEventListener('click', this.goToPrevStep.bind(this));
        this.btnNormal = this.form.querySelector('.btn--normal');
        this.btnGreyscale = this.form.querySelector('.btn--greyscale');
        this.btnBlur = this.form.querySelector('.btn--blur');
        this.btnGreyscale.addEventListener('click', this.setImage.bind(this));
        this.btnNormal.addEventListener('click', this.setNormal.bind(this));
        this.btnBlur.addEventListener('click', this.setBlur.bind(this));
        this.blur = this.form.querySelector('.blur');
        this.blur.addEventListener('change', this.setImage.bind(this));
        this.step = this.form.querySelector('.header__status-active');
    }

    setNormal(e) {
        e.preventDefault();
        const priceInput = this.form.querySelector('#price'),
            priceEl = this.form.querySelector('.price span');
        let price = parseFloat(priceInput.value);
        this.btnNormal.classList.add('active');
        let url = this.frontImg.getAttribute('src');
        if (url.match(/\?./)) {
            url = url.split("?")[0];
        }
        if(this.btnGreyscale.classList.contains('active')) {
            price = price - 2;
            this.btnGreyscale.classList.remove('active');
        }
        if(this.btnBlur.classList.contains('active')) {
            this.btnBlur.classList.remove('active');
            this.blur.classList.remove('active');
            this.blur.value= 1;
            price = price - 3;
        }
        this.frontImg.setAttribute('src', url);
        this.backImg.setAttribute('src', url);
        priceInput.value = price;
        priceEl.innerText = price;
    }

    setBlur(e) {
        e.preventDefault();
        if(this.btnNormal.classList.contains('active')) {
            this.btnNormal.classList.remove('active');
        }
        this.btnBlur.classList.add('active');
        this.blur.classList.add('active');
    }


    setImage(e) {
        e.preventDefault();
        const priceInput = this.form.querySelector('#price'),
            priceEl = this.form.querySelector('.price span');
        let price = 0;
        const shirtPrice = this.form.querySelectorAll('.steps__choose-side');
        shirtPrice.forEach(function(e) {
            if(e.classList.contains('active') ) {
                price = price + 10;
            }
        })
        e.target.classList.add('active');
        let url = this.frontImg.getAttribute('src');
        url = url.split("?")[0];
        if(this.btnNormal.classList.contains('active')) {
            this.btnNormal.classList.remove('active');
        }
        const greyscale = this.btnGreyscale.classList.contains('active');
        const blur = this.btnBlur.classList.contains('active');
        const blurVal = this.blur.value;
        if(greyscale && blur) {
            url = url+'?grayscale&blur='+blurVal;
            price = price + 5;
        } else if (greyscale && !blur) {
            url = url+'?grayscale';
            price = price + 2;
        } else {
            url = url+'?blur='+blurVal;
            price = price + 3;
        }
        this.frontImg.setAttribute('src', url);
        this.backImg.setAttribute('src', url);
        priceInput.value = price;
        priceEl.innerText = price;
    }

    prevImg(e) {
        e.preventDefault();
        if (this.random >= 0) {
            this.random--;
            this.changeImg(this.random);
        } else {
            this.random = 29;
        }
    }

    nextImg(e) {
        e.preventDefault();
        if (this.random <= 29) {
            this.random++;
            this.changeImg(this.random++);
        } else {
            this.random = 0;
        }
    }

    randomImg(e) {
        e.preventDefault();
        this.random = Math.floor(Math.random() * 29);
        this.changeImg(this.random);
    }


    changeImg(i) {
        const imgId = this.imgList[i]['id'];
        const imgUrl = 'https://picsum.photos/id/' + imgId + '/80';
        this.frontImg.setAttribute('src', imgUrl);
        this.backImg.setAttribute('src', imgUrl);
        this.btnNormal.click();
    }

    chooseSide(event) {
        const active = event.target,
            id = active.getAttribute('data-id'),
            input = this.form.querySelector('input[name="' + id + '"]'),
            priceEl = this.form.querySelector('.price span'),
            elPrice = parseFloat(active.getAttribute('data-price')),
            priceInput = this.form.querySelector('#price');
        let price = parseFloat(priceInput.value);
        if (input.value == 0) {
            price = price + elPrice;
            input.value = 1;
        } else {
            price = price - elPrice;
            input.value = 0;
        }

        active.classList.toggle('active');
        priceInput.value = price;
        priceEl.innerText = price;
    }

    hideStep() {
        if (this.form.querySelector('.step.active')) {
            this.form.querySelector('.step.active').classList.remove('active');
        }
    }

    nextStep(e) {
        if (e) {
            e.preventDefault();
        }
        if (this.current === 2) {
            const valid = this.validateFirstStep();

            if (valid) {
                this.error.innerText = '';
                this.goToNextStep();
                this.stepsChoose.classList.add('disabled');
                this.btnPrev.removeAttribute('disabled')
            }
        } else if (this.current === 3) {
            this.goToNextStep();
            this.btn.innerText = 'Kup';


        } else if (this.current === 4) {
            const valid = this.validateThirdStep();

            if (valid) {
                this.error.innerText = '';
                this.goToNextStep();
                this.showInfo();
            }
        } else if (this.current === 5) {
            this.goToNextStep();
            this.sendForm();

        }

    }

    goToNextStep() {
        this.hideStep();
        this.btn.setAttribute('data-step', this.current);
        this.form.querySelector('.step[data-step="' + this.current + '"]').classList.add('active');
        this.step.setAttribute('class', 'header__status-active step'+this.current);
        this.form.setAttribute('class', 'steps__form step'+this.current);
        this.current++;
    }

    goToPrevStep(e) {
        e.preventDefault();
        let currentStep = this.form.querySelector('.step.active').getAttribute('data-step');
        this.hideStep();
        currentStep--;
        this.step.setAttribute('class', 'header__status-active step'+currentStep);
        this.form.setAttribute('class', 'steps__form step'+currentStep);
        if(currentStep === 1) {
            this.btnPrev.setAttribute('disabled', 'true');
            this.btn.setAttribute('data-step', currentStep);
            this.form.querySelector('.step[data-step="' + currentStep + '"]').classList.add('active');
            this.stepsChoose.classList.remove('disabled');
        } else {
            this.btn.setAttribute('data-step', currentStep);
            this.form.querySelector('.step[data-step="' + currentStep + '"]').classList.add('active');
        }
        this.current--
    }

    showInfo() {
        const form = this.form
        const inputs = form.querySelectorAll('.step input[type="text"]'),
            back = form.querySelector('input[name="back"]').value,
            front = form.querySelector('input[name="front"]').value;
        if(back == 1 && front == 0) {
            form.querySelector('.end').innerHTML += 'z tyłu'
        } else if(back == 1 && front == 1) {
            form.querySelector('.end').innerHTML += 'z przodu i z tyłu'
        } else {
            form.querySelector('.end').innerHTML += 'z przodu'
        }

        inputs.forEach(function(i){
            const val = i.value,
                name = '.'+i.getAttribute('name');
            form.querySelector(name).innerText = val;
        })
        this.btn.innerText = 'Złóż zamówienie';
    }


    validateFirstStep() {
        let valid = true;
        if (!this.form.querySelector('.steps__choose-side.active')) {
            valid = false;
            this.error.innerText = 'Nie wybrałeś gdzie chcesz umieścić grafikę!'
        }
        return valid;
    }

    validateThirdStep() {
        let required = this.form.querySelectorAll('.required'),
            valid = true;
        required.forEach(function(i){
            if(i.value == '') {
                i.classList.add('error');
                valid = false;
            }
            return valid;
        })
        return valid;
    }

    sendForm() {
        let formData = {};

        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(function(i) {
            const name = i.getAttribute('name'),
                val = i.value;
            formData[name] = val;
        })
        this.form.querySelector('.steps__footer').classList.add('hidden');
        this.stepsChoose.classList.add('hidden');
        this.form.querySelector('.header').classList.add('hidden');
        console.log(formData);
    }

    initForm() {
        const url = 'https://picsum.photos/v2/list'
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.imgList = data;
                this.changeImg(this.random);
            })

        this.goToNextStep();
    }

}

const form = new Form(document.querySelector('.steps__form'));

form.initForm();



