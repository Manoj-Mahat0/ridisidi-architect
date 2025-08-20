// Swiper utility functions to fix loop warnings and provide better configuration

// Check if loop mode should be enabled based on slide count
export const shouldEnableLoop = (slideCount, slidesPerView = 1) => {
  return slideCount > slidesPerView;
};

// Get optimal Swiper configuration based on slide count
export const getSwiperConfig = (slideCount, options = {}) => {
  const {
    slidesPerView = 1,
    slidesPerGroup = 1,
    spaceBetween = 30,
    navigation = true,
    autoplay = true,
    autoplayDelay = 3000,
    loop = true
  } = options;

  // Only enable loop if we have enough slides
  const enableLoop = loop && shouldEnableLoop(slideCount, slidesPerView);

  return {
    loop: enableLoop,
    slidesPerView,
    slidesPerGroup,
    spaceBetween,
    navigation,
    autoplay: autoplay ? {
      delay: autoplayDelay,
      disableOnInteraction: false,
    } : false,
    // Responsive breakpoints
    breakpoints: {
      640: {
        slidesPerView: Math.min(2, slideCount),
        slidesPerGroup: Math.min(2, slideCount),
      },
      768: {
        slidesPerView: Math.min(3, slideCount),
        slidesPerGroup: Math.min(3, slideCount),
      },
      1024: {
        slidesPerView: Math.min(4, slideCount),
        slidesPerGroup: Math.min(4, slideCount),
      },
    }
  };
};

// Duplicate slides for loop mode if needed
export const prepareSlidesForLoop = (slides, minSlides = 4) => {
  if (slides.length >= minSlides) {
    return slides;
  }
  
  // Duplicate slides to meet minimum requirement for loop
  const duplicatedSlides = [];
  for (let i = 0; i < Math.ceil(minSlides / slides.length); i++) {
    duplicatedSlides.push(...slides);
  }
  return duplicatedSlides.slice(0, minSlides);
};
