$(document).ready(function() {
	$('.mask').each(function() {
		IMask(this, {
			mask: '+7 000 00-00-00',
			lazy: true
		})
	})

	$(function() {
		const $button = $('.down-up')
		const bottomOffset = 20

		$button.on('click', function() {
			$('html, body').animate({ scrollTop: 0 }, 600)
		})

		$(window).on('scroll resize', function() {
			const scrollTop = $(window).scrollTop()
			const windowHeight = $(window).height()
			const windowWidth = $(window).width()
			let footerTop

			if (windowWidth < 991) {
				footerTop = $('footer').offset().top - 210
			} else {
				footerTop = $('footer').offset().top - 220
			}

			const stopPoint = footerTop - windowHeight + bottomOffset + 300

			if (scrollTop > 200) {
				$button.addClass('show')
			} else {
				$button.removeClass('show')
			}

			if (scrollTop > stopPoint) {
				$button.addClass('active').css({
					top: footerTop + 230 + 'px',
					bottom: 'auto'
				})
			} else {
				$button.removeClass('active').css({
					top: 'auto',
					bottom: '55px'
				})
			}
		})
	})

	$.fancybox.defaults.touch = false
	$.fancybox.defaults.closeExisting = true

	$('.header__burger').on('click', function() {
		$(this).toggleClass('active')
		$('.header-mob').toggleClass('active')
	})

	const swipers = [
		{
			init: false,
			instance: null,
			selector: '.showcase-list__container',

			options: {
				slidesPerView: 1,

				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true
				}
			},
			breakpoint: 992
		},

		{
			init: false,
			instance: null,
			selector: '.object__container',

			options: {
				slidesPerView: 1,

				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true
				}
			},
			breakpoint: 992
		},

		{
			init: false,
			instance: null,
			selector: '.company__container',

			options: {
				slidesPerView: 1,

				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true
				}
			},
			breakpoint: 992
		},
		{
			init: false,
			instance: null,
			selector: '.partner__container',

			options: {
				slidesPerView: 1,

				spaceBetween: 16,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true
				},

				breakpoints: {
					767: {
						slidesPerView: 2
					}
				}
			},
			breakpoint: 992
		}
	]

	function handleSwipers() {
		swipers.forEach(item => {
			const shouldInit = window.innerWidth < item.breakpoint

			if (shouldInit) {
				if (!item.instance) {
					item.instance = new Swiper(item.selector, item.options)
				}
			} else {
				if (item.instance) {
					if (typeof item.instance.destroy === 'function') {
						item.instance.destroy()
					}

					item.instance = null
				}
			}
		})
	}

	let resizeTimer

	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer)

		resizeTimer = setTimeout(() => {
			handleSwipers()
		}, 150)
	})

	handleSwipers()

	$(document).on('click', 'a[href^="#"]', function(e) {
		e.preventDefault()

		let target = $(this).attr('href')

		if ($(target).length) {
			$('html, body').animate(
				{
					scrollTop: $(target).offset().top - 50
				},
				700
			)
		}
	})

	$(window).on('scroll', function() {
		$('.steps').each(function() {
			const section = $(this)
			const rect = this.getBoundingClientRect()
			const items = section.find('.steps__item')
			const line = section.find('.steps__line')
			const progress = section.find('.steps__line-progress')
			const total = items.length

			if (total < 2) return

			const mobile = window.innerWidth <= 992
			const lineRect = line[0].getBoundingClientRect()

			const maxProgress = mobile ? lineRect.height : lineRect.width

			const start = window.innerHeight * 0.6
			const end = -window.innerHeight * 0.015

			const progressValue = Math.max(
				0,
				Math.min(1, (start - rect.top) / (start - end))
			)

			const currentLength = maxProgress * progressValue

			progress.css(
				mobile
					? {
							width: '100%',
							height: `${currentLength}px`
						}
					: {
							height: '100%',
							width: `${currentLength}px`
						}
			)

			items.each(function(index) {
				const number = $(this).find('.steps__number')[0]
				const numberRect = number.getBoundingClientRect()

				const center = mobile
					? numberRect.top + numberRect.height / 2 - lineRect.top
					: numberRect.left + numberRect.width / 2 - lineRect.left

				$(this).toggleClass(
					'active',
					index < total - 1 ? currentLength >= center : progressValue >= 1
				)
			})
		})
	})

	$(window).trigger('scroll')
})
