(function(){
	
	function createSlider(sliderEl, images){
		if(!sliderEl) return;
		const imagesWrap = sliderEl.querySelector('.slider-images');
		const btnPrev = sliderEl.querySelector('.slider-prev');
		const btnNext = sliderEl.querySelector('.slider-next');

		let idx = 0;
		const imgEls = [];

		
		images.forEach((src, i) => {
			const img = document.createElement('img');
			img.className = 'slider-image';
			
			if(sliderEl.id === 'me-slider') img.classList.add('me-photo');
			img.src = src;
			img.alt = '';
			img.loading = 'lazy';
			if(i === 0) img.classList.add('active');
			imagesWrap.appendChild(img);
			imgEls.push(img);
		});

		function show(newIndex){
			if(newIndex < 0) newIndex = imgEls.length - 1;
			if(newIndex >= imgEls.length) newIndex = 0;
			if(newIndex === idx) return;
			imgEls[idx].classList.remove('active');
			imgEls[newIndex].classList.add('active');
			idx = newIndex;
		}

		if(btnPrev){ btnPrev.addEventListener('click', () => show(idx - 1)); }
		if(btnNext){ btnNext.addEventListener('click', () => show(idx + 1)); }

		
		return { show, imgEls };
	}

	
	const cityImages = [
		'assets/kazakhstan/kz1.jpg',
		'assets/kazakhstan/kz2.jpg',
		'assets/kazakhstan/kz3.jpg',
		'assets/kazakhstan/kz4.jpg',
		'assets/kazakhstan/kz5.jpg',
		'assets/kazakhstan/kz6.jpg',
		'assets/kazakhstan/kz7.jpg',
		'assets/kazakhstan/kz8.jpg',
		'assets/kazakhstan/kz9.jpg',
		'assets/kazakhstan/kz10.jpg'
	];

	
	const meImages = [
		'assets/img/photome/ME%20_meme1.jpg',
		'assets/img/photome/ME%20_meme2.jpg',
		'assets/img/photome/ME%20_meme3.jpg',
		'assets/img/photome/ME%20_meme4.jpg',
		'assets/img/photome/ME%20_meme5.jpg',
		'assets/img/photome/ME%20_meme6.jpg',
		'assets/img/photome/ME%20_meme7.jpg',
		'assets/img/photome/ME%20_meme8.jpg',
		'assets/img/photome/ME%20_meme9.jpg',
		'assets/img/photome/ME%20_meme10.jpg',
		'assets/img/photome/ME%20_meme11.jpg',
		'assets/img/photome/ME%20_meme12.jpg',
		'assets/img/photome/ME%20_meme13.jpg',
		'assets/img/photome/ME%20_meme14.jpg',
		'assets/img/photome/ME%20_meme15.jpg',
		'assets/img/photome/ME%20_meme16.jpg'
	];

	
	document.addEventListener('DOMContentLoaded', function(){
		const citySliderEl = document.getElementById('city-slider');
		const meSliderEl = document.getElementById('me-slider');
		createSlider(citySliderEl, cityImages);
		createSlider(meSliderEl, meImages);
	});

})();

