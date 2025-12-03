console.log("script work")

const navLinks = document.querySelectorAll('.header-nav a')
const allSections = document.querySelectorAll('main section');

const clickSound = document.getElementById('click-sound');
clickSound.volume = 0.02;
const contactLink = document.querySelector('a[href="#contact"]');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

burger.addEventListener('click', () => {
        burger.classList.toggle('active')
        menu.classList.toggle('active')
})

document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
                burger.classList.remove('active')
                menu.classList.remove('active')
        })
})



contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        clickSound.currentTime = 0;
        clickSound.play();
})


console.log(allSections);

const observerOptions = {
        threshold: 0.5,
};

const handleIntersection = (entries, observer) => {
        entries.forEach((entry => {
                if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                                link.classList.remove('ative')
                        })
                        const sectionId = entry.target.id;
                        const targetLink = document.querySelector(`a[href="#${sectionId}"]`);
                        targetLink.classList.add('ative');

                }
        }))
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);


navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // // clickSound.currentTime = 0;
                // // clickSound.play()
                //         .catch(error => { console.warn("ошибка", error); });
                console.log("ffsfsd")
        })
})


allSections.forEach(section => {
        observer.observe(section);
})




//валидация

const contactForm = document.querySelector('form.contact-form')
const ctaButton = document.querySelector('.contact-form .cta-button')
const inputWrappers = document.querySelectorAll('.contact-form .input-wrapper')


function showError(wrapper, message) {
        wrapper.classList.add('invalid')
        wrapper.classList.remove('valid')
        const errorSpan = wrapper.querySelector('.error-message')
        errorSpan.textContent = message
        errorSpan.classList.add('show')
}


function showSuccess(wrapper) {
        wrapper.classList.add('valid')
        wrapper.classList.remove('invalid')

        const errorSpan = wrapper.querySelector('.error-message')
        errorSpan.textContent = ''
        errorSpan.classList.remove('show')
}

function validateField(wrapper) {
        const input = wrapper.querySelector('input, textarea')
        const id = input.id
        const value = input.value.trim()
        const errorSpan = wrapper.querySelector('.error-message')

        if (id === 'name') {
                if (value.length < 2) {
                        showError(wrapper, 'минимум 2 символа')
                } else if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(value)) {
                        showError(wrapper, 'только буквы и пробелы')
                } else {
                        showSuccess(wrapper)
                }
        }

        else if (id === 'email') {
                if (!input.checkValidity()) {
                        showError(wrapper, 'некорректный email')
                } else {
                        showSuccess(wrapper)
                }
        }

        else if (id === 'message') {
                if (value.length < 10) {
                        showError(wrapper, 'минимум 10 символов')
                } else {
                        showSuccess(wrapper)
                }
        }
}

function checkAllFields() {
        let allValid = true
        inputWrappers.forEach(wrapper => {
                validateField(wrapper)
                if (!wrapper.classList.contains('valid')) {
                        allValid = false
                }
        })
        ctaButton.disabled = !allValid
}

inputWrappers.forEach(wrapper => {
        const input = wrapper.querySelector('input, textarea')
        input.addEventListener('input', checkAllFields)
})

contactForm.addEventListener('submit', e => {
        e.preventDefault()
        checkAllFields()
        if (!ctaButton.disabled) {
                alert('сообщение отправлено')
                contactForm.reset()
                inputWrappers.forEach(w => {
                        w.classList.remove('valid', 'invalid')
                        w.querySelector('.error-message').classList.remove('show')
                })
                ctaButton.disabled = true
        }
})


//динамический счетчик до нг

const countdownElement = document.getElementById('countdown')
const newYear = new Date('2026-01-01T00:00:00')
function update() {
  const now = new Date()
  const diff = newYear - now 

  const totalSeconds = Math.floor(diff / 1000)
  const formatted = totalSeconds.toLocaleString('ru-RU')

  countdownElement.innerHTML = `До нового года осталось моргнуть: <strong>${formatted}</strong> раз`
}
update()
setInterval(update, 1000)

            