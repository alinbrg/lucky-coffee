function mainPageSlider() {
	if (document.querySelector(".main-page-swiper")) {
		const progressBar = document.querySelector(".autoplay-progress");

		bulletNames.forEach((bullet) => {
			const span = document.createElement("span");
			progressBar.append(span);
		});
		const progressCircle = document.querySelectorAll(".autoplay-progress span");
		if (progressCircle[0]) progressCircle[0].classList.add("active");
		let activeSlideProgress = document.querySelector(
			".autoplay-progress span.active"
		);
		const swiper = new Swiper(".main-page-swiper", {
			spaceBetween: 30,

			centeredSlides: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return (
						'<span class="' + className + '">' + bulletNames[index] + "</span>"
					);
				},
			},

			on: {
				activeIndexChange() {
					progressCircle.forEach((span) => span.classList.remove("active"));
					progressCircle[swiper.activeIndex].classList.add("active");
				},
				autoplayTimeLeft(s, time, progress) {
					if (activeSlideProgress) {
						activeSlideProgress = document.querySelector(
							".autoplay-progress span.active"
						);
						progressCircle.forEach((span) =>
							span.style.setProperty("--progress", 0)
						);

						activeSlideProgress.style.setProperty(
							"--progress",
							`${100 * (1 - progress)}%`
						);
					}
				},
			},
		});
	}
}

mainPageSlider();
