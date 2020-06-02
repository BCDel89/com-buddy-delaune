const clearMenuFocus = () => {
	$('.menu-btn-focused').removeClass('menu-btn-focused');
};

const handleObserverEvent = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			console.log('entry', entry);

			const id = entry.target.id;
			const element = $('#nav-btn-' + id);

			if (element) {
				console.log('element: ', element);
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

const createObserver = () => {
	let options = {
		root: null,
		rootMargin: '0px',
		threshold: 0.85
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
	observer.observe(document.querySelector('#references'));

};

// Set things up
window.addEventListener("load", (event) => {
	initialize();
}, false);

const initialize = () => {
	createObserver();
	ScrollOut({
		once: true
	});
};
