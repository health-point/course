import { $, $$ } from './lib/dom';
import { MockSkillService } from './services/mock-skill-service';

document.addEventListener('DOMContentLoaded', () => {
        console.log("script work");

        const navLinks = $$<HTMLAnchorElement>('.header-nav a');
        const allSections = $$<HTMLElement>('main section');

        const clickSound = $<HTMLAudioElement>('#click-sound');
        clickSound.volume = 0.02;

        const contactLink = $<HTMLAnchorElement>('a[href="#contact"]');
        const burger = $<HTMLElement>('.burger');
        const menu = $<HTMLElement>('.menu');

        burger.addEventListener('click', () => {
                burger.classList.toggle('active');
                menu.classList.toggle('active');
        });

        $$<HTMLAnchorElement>('.menu a').forEach(link => {
                link.addEventListener('click', () => {
                        burger.classList.remove('active');
                        menu.classList.remove('active');
                });
        });

        contactLink.addEventListener('click', (e) => {
                e.preventDefault();
                clickSound.currentTime = 0;
                clickSound.play();
        });

        console.log(allSections);

        const observerOptions: IntersectionObserverInit = {
                threshold: 0.5,
        };

        const handleIntersection: IntersectionObserverCallback = (entries) => {
                entries.forEach(entry => {
                        if (entry.isIntersecting) {
                                navLinks.forEach(link => {
                                        link.classList.remove('ative');
                                });

                                const sectionId = entry.target.id;
                                const targetLink = $<HTMLAnchorElement>(`a[href="#${sectionId}"]`);
                                targetLink.classList.add('ative');
                        }
                });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href');
                        if (!targetId) return;

                        const targetSection = $<HTMLElement>(targetId);
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                });
        });

        allSections.forEach(section => {
                observer.observe(section);
        });

        // валидация

        const contactForm = $<HTMLFormElement>('form.contact-form');
        const ctaButton = $<HTMLButtonElement>('.contact-form .cta-button');
        const inputWrappers = $$<HTMLElement>('.contact-form .input-wrapper');

        function showError(wrapper: HTMLElement, message: string) {
                wrapper.classList.add('invalid');
                wrapper.classList.remove('valid');
                const errorSpan = $<HTMLElement>('.error-message', wrapper);
                errorSpan.textContent = message;
                errorSpan.classList.add('show');
        }

        function showSuccess(wrapper: HTMLElement) {
                wrapper.classList.add('valid');
                wrapper.classList.remove('invalid');
                const errorSpan = $<HTMLElement>('.error-message', wrapper);
                errorSpan.textContent = '';
                errorSpan.classList.remove('show');
        }

        function validateField(wrapper: HTMLElement) {
                const input = wrapper.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement;
                const id = input.id;
                const value = input.value.trim();

                if (id === 'name') {
                        if (value.length < 2) {
                                showError(wrapper, 'минимум 2 символа');
                        } else if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(value)) {
                                showError(wrapper, 'только буквы и пробелы');
                        } else {
                                showSuccess(wrapper);
                        }
                } else if (id === 'email') {
                        if (!input.checkValidity()) {
                                showError(wrapper, 'некорректный email');
                        } else {
                                showSuccess(wrapper);
                        }
                } else if (id === 'message') {
                        if (value.length < 10) {
                                showError(wrapper, 'минимум 10 символов');
                        } else {
                                showSuccess(wrapper);
                        }
                }
        }

        function checkAllFields() {
                let allValid = true;
                inputWrappers.forEach(wrapper => {
                        validateField(wrapper);
                        if (!wrapper.classList.contains('valid')) {
                                allValid = false;
                        }
                });
                ctaButton.disabled = !allValid;
        }

        inputWrappers.forEach(wrapper => {
                const input = wrapper.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement;
                input.addEventListener('input', checkAllFields);
        });

        contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                checkAllFields();

                if (!ctaButton.disabled) {
                        alert('сообщение отправлено');
                        contactForm.reset();
                        inputWrappers.forEach(w => {
                                w.classList.remove('valid', 'invalid');
                                const errorSpan = $<HTMLElement>('.error-message', w);
                                errorSpan.classList.remove('show');
                        });
                        ctaButton.disabled = true;
                }
        });

        //счётчик до нг

        const countdownElement = $<HTMLElement>('#countdown');
        const newYear = new Date('2026-01-01T00:00:00');

        function updateCountdown() {
                const now = new Date();
                const diff = newYear.getTime() - now.getTime();

                if (diff <= 0) {
                        countdownElement.innerHTML = 'С Новым годом! 🎉';
                        return;
                }

                const totalSeconds = Math.floor(diff / 1000);
                const formatted = totalSeconds.toLocaleString('ru-RU');

                countdownElement.innerHTML = `До нового года осталось моргнуть примерно: <strong>${formatted}</strong> раз`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);


        //работа с мок сервисом

        const skillService = new MockSkillService();
        async function renderSkills() {
                const skills = await skillService.getSkills();

                const skillsList = $<HTMLUListElement>('.skills-list');
                skillsList.innerHTML = '';

                skills.forEach(skill => {
                        const li = document.createElement('li');
                        const img = document.createElement('img');
                        img.src = skill.icon;
                        img.alt = skill.title;
                        img.width = 20;
                        img.height = 20;

                        const span = document.createElement('span');
                        span.textContent = skill.title;

                        li.appendChild(img);
                        li.appendChild(span);
                        skillsList.appendChild(li);
                });
        }



        //работа с local storage 

        type Theme = 'dark' | 'light' | 'auto';

        class ThemeStorage<T> {
                private readonly key: string;
                private readonly defaultValue: T;
                constructor(key: string, defaultValue: T) {
                        this.key = key;
                        this.defaultValue = defaultValue;
                }
                get(): T {
                        try {
                                const item = localStorage.getItem(this.key);
                                if (item === null) { return this.defaultValue }
                                return JSON.parse(item) as T;

                        }
                        catch (error) {
                                console.log(`ошибка чтения ${this.key} из localStorage`, error);
                                return this.defaultValue;
                        }
                }


                set(value: T): void {
                        try {
                                localStorage.setItem(this.key, JSON.stringify(value));
                        }
                        catch (error) {
                                console.log(`ошибка записи ${this.key} из localStorage`, error);

                        }
                }

                remove(): void {
                        localStorage.removeItem(this.key)
                }
        }


        const themeStorage = new ThemeStorage<Theme>('theme', 'auto');


        class ThemeManager {
                private storage: ThemeStorage<Theme>
                constructor() {
                        this.storage = new ThemeStorage<Theme>('theme', 'auto')
                        this.applyTheme(this.storage.get())
                }
                private applyTheme(theme: Theme) {
                        const root = document.documentElement;
                        if (theme === 'auto') {
                                root.removeAttribute('data-theme');
                        }
                        else {
                                root.dataset.theme = theme;
                        }
                        this.updateButton();

                }
                public getCurrentTheme(): Theme {
                        return this.storage.get();
                }

                public setTheme(theme: Theme): void {
                        this.storage.set(theme);
                        this.applyTheme(theme);
                }

                public toggle(): void {
                        const current = this.getCurrentTheme();
                        if (current === 'auto') {
                                this.setTheme('light');

                        } else if (current === 'light') {
                                this.setTheme('dark');
                        } else {
                                this.setTheme('light');
                        }
                        this.updateButton();
                }

                private updateButton(): void {
                        const button = document.getElementById('theme-toggle')
                        if (!button) return;
                        const current = this.getCurrentTheme()
                        button.innerHTML = current === 'dark' ? '☀️' : '🌙';
                }

        }

        const themeManager = new ThemeManager();
        const toggleButton = document.getElementById('theme-toggle')
        if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                        themeManager.toggle()
                })
        }

        renderSkills();

});

