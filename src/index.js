import './main.scss';
import './pdf.scss';
import './mobile.scss';

const clearMenuFocus = () => {
	$('.menu-btn-focused').removeClass('menu-btn-focused');
};

const handleObserverEvent = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// console.log('entry', entry);

			const id = entry.target.id;
			const element = $('#nav-btn-' + id);

			if (element) {
				// console.log('element: ', element);
				clearMenuFocus();
				element.addClass('menu-btn-focused');
				// element.focus();
			}

			if (id.includes('experience')) {
				$('#nav-btn-experience').addClass('menu-btn-focused');
				$('.sub-menu').addClass('sub-menu-full');
			} else {
				$('#nav-btn-experience').removeClass('menu-btn-focused');
				$('.sub-menu').removeClass('sub-menu-full');
			}
		}
	})
};

const onScroll = () => {
	const screenHeight = window.innerHeight;
	const yAxis = window.scrollY;

	if (yAxis > (screenHeight - 50)) {
		const navRightPrint = document.getElementById('nav-right-print');
		const hasClass = navRightPrint.classList.contains('sticky');
		if (!hasClass) navRightPrint.classList.add('sticky');
	} else {
		const navRightPrint = document.getElementById('nav-right-print');
		const hasClass = navRightPrint.classList.contains('sticky');
		if (hasClass) navRightPrint.classList.remove('sticky');
	}
};

const createObservers = () => {
	let options = {
		root: null,
		rootMargin: '0px',
		threshold: 0.80
		// threshold: 0.385
	};

	let observer = new IntersectionObserver((entries, observer) => handleObserverEvent(entries), options);

	observer.observe(document.querySelector('#info'));
	observer.observe(document.querySelector('#education'));
	observer.observe(document.querySelector('#experience'));
	observer.observe(document.querySelector('#experience-leviton'));
	observer.observe(document.querySelector('#experience-urs'));
	observer.observe(document.querySelector('#experience-ba'));
	observer.observe(document.querySelector('#experience-xennex'));
	observer.observe(document.querySelector('#experience-ab'));
	observer.observe(document.querySelector('#skills'));
	observer.observe(document.querySelector('#languages'));
	observer.observe(document.querySelector('#technology'));
	observer.observe(document.querySelector('#certifications'));
	observer.observe(document.querySelector('#references'));

	window.onscroll = onScroll;
};

// Set things up
window.addEventListener("load", (event) => {
	initialize();
}, false);


const initialize = () => {
	createObservers();
	ScrollOut({
		offset: 0
	});

	$('#covercontainer').addClass('loaded');
	$('#glasspanelcontent').addClass('loaded');
	$('.nav').addClass('loaded');
};



