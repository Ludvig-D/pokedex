import { useEffect, useState } from 'react';

import '../css/SlideShow.css';

export default function SlideShow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(8);

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div id="slide-div">
      {images[currentIndex] != undefined && (
        <>
          <p>
            {currentIndex} of {images.length}
          </p>
          <img
            id="slide-image"
            src={images[currentIndex].value}
            alt={`pokemon slide ${currentIndex}`}
          />
        </>
      )}
      <div className="button-div">
        <button id="left" onClick={goToPrevSlide}>
          {' '}
          {'<'}{' '}
        </button>
        <button id="right" onClick={goToNextSlide}>
          {' '}
          {'>'}{' '}
        </button>
      </div>
    </div>
  );
}
