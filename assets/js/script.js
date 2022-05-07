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
            input = this.form.querySelector('input[name="' + id + '"]');
        if (input.value == 0) {
            input.value = 1;
        } else {
            input.value = 0;
        }
        active.classList.toggle('active');
    }

    hideStep() {
        if (this.form.querySelector('.step.active')) {
            this.form.querySelector('.step.active').classList.remove('active');
        }
    }

    nextStep(e) {
        this.hideStep();
        if (e) {
            e.preventDefault();
        }

        this.btn.setAttribute('data-step', this.current);
        this.form.querySelector('.step[data-step="' + this.current + '"]').classList.add('active');
        if (this.current == 2) {
           this.btn.innerText = 'Kup';
        } else if (this.current == 3) {
            console.log('123')
            this.stepsChoose.classList.add('steps__choose-small');
        }

        this.current++;
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

        this.nextStep();
    }
}

const form = new Form(document.querySelector('.steps__form'));

form.initForm();



