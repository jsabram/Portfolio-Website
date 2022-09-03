const BtnBars = document.querySelectorAll('.bar');
const allSections = document.querySelectorAll('.section');

const navBtn = document.querySelector('.burger-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

const accordion = document.querySelector('.about__accordion');
const accordtionBtns = document.querySelectorAll('.about__accordion-btn');

const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const formMsg = document.querySelector('#msg');
const formBtn = document.querySelector('.contact__form-btn');
const inputs = [formName, formEmail, formMsg];

const year = document.querySelector('.current-year');

const navBtnObserver = () => {
	const currentSection = window.scrollY;

	allSections.forEach((section) => {
		if (
			section.classList.contains('white-section') &&
			section.offsetTop <= currentSection + 220
		) {
			BtnBars.forEach((bar) => {
				bar.classList.add('dark-bar');
			});
		} else if (
			!section.classList.contains('white-section') &&
			section.offsetTop <= currentSection + 220
		) {
			BtnBars.forEach((bar) => {
				bar.classList.remove('dark-bar');
			});
		}
	});
};

const handleNav = () => {
	nav.classList.toggle('nav-active');

	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			nav.classList.remove('nav-active');

			navLinks.forEach((navLink) =>
				navLink.classList.remove('nav-items-active')
			);
		});
	});

	animateNavItems();
};

const animateNavItems = () => {
	let delay = 0;

	navLinks.forEach((link) => {
		link.classList.toggle('nav-items-active');
		link.style.animationDelay = '.' + delay + 's';
		delay++;
	});
};

function openAccordion() {
	if (this.nextElementSibling.classList.contains('info-active')) {
		this.nextElementSibling.classList.remove('info-active');
	} else {
		closeAccordion();
		this.nextElementSibling.classList.toggle('info-active');
	}
}

const closeAccordion = () => {
	const allActiveItems = document.querySelectorAll('.about__accordion-info');
	allActiveItems.forEach((item) => item.classList.remove('info-active'));
};

const checkForm = (input, msg) => {
	if (input.value === '') {
		input.classList.add('contact__form-input--error');
		input.setAttribute('placeholder', msg);
	}
};

const checkEmail = (input, msg) => {
	const regEx =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (regEx.test(email.value)) {
		input.classList.remove('contact__form-input--error');
		input.setAttribute('placeholder', '');
	} else {
		input.classList.add('contact__form-input--error');
		input.value = '';
		input.setAttribute('placeholder', msg);
	}
};

const calculateDate = () => {
	const currentYear = new Date().getFullYear();
	year.textContent = currentYear;
};

window.addEventListener('scroll', navBtnObserver);
navBtn.addEventListener('click', handleNav);
accordtionBtns.forEach((btn) => btn.addEventListener('click', openAccordion));
formBtn.addEventListener('click', () => {
	checkForm(formName, 'Name field cannot be empty');
	checkEmail(formEmail, 'Incorrect email address');
	checkForm(formMsg, 'Message field cannot be empty');
});
inputs.forEach((input) =>
	input.addEventListener('keyup', () => {
		if (input.value !== '') {
			input.classList.remove('contact__form-input--error');
			input.setAttribute('placeholder', '');
		}
	})
);
calculateDate();
