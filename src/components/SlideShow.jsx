import { useEffect, useState } from 'react';

import '../css/SlideShow.css';

export default function SlideShow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [images.length, goToNextSlide]);

  return (
    <div id="slide-div">
      {images[currentIndex] != undefined ? (
        <>
          <p id="index">
            {currentIndex + 1} of {images.length + 1}
          </p>
          <img
            id="slide-image"
            src={images[currentIndex].value}
            alt={`pokemon slide ${currentIndex}`}
          />
          <div className="button-div">
            <button className="slideBtn" id="left" onClick={goToPrevSlide}>
              {' '}
              {'<'}{' '}
            </button>
            <button className="slideBtn" id="right" onClick={goToNextSlide}>
              {' '}
              {'>'}{' '}
            </button>
          </div>
        </>
      ) : (
        <p id="no-img">No images</p>
      )}
    </div>
  );
}
