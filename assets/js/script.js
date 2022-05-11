class Form {

    constructor(form) {
        this.form = form;
        this.random = Math.floor(Math.random() * 30);
        this.btn = this.form.querySelector('.step__btn');
        this.sides = this.form.querySelectorAll('.step__choose-side');
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
    }

    chooseSide(event) {
        const active = event.target,
            id = active.getAttribute('data-id'),
            input = this.form.querySelector('input[name="' + id + '"]'),
            priceEl = this.form.querySelector('.price span'),
            elPrice = parseFloat(active.getAttribute('data-price')),
            priceInput = this.form.querySelector('#price')
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

            if(valid) {
                this.error.innerText = '';
                this.goToNextStep();
            }
        }

    }

    goToNextStep() {
        this.hideStep();
        this.btn.setAttribute('data-step', this.current);
        this.form.querySelector('.step[data-step="' + this.current + '"]').classList.add('active');
        this.current++;
    }

    goToPrevStep(e) {
        e.preventDefault();
        let currentStep = this.form.querySelector('.step.active').getAttribute('data-step');
        this.hideStep();
        currentStep--;
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
        console.log(valid);

        return valid;
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



