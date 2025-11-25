import { useEffect, useState } from 'react';

import styles from './SlideShow.module.css';

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
    <div id={styles.slideDiv}>
      {images[currentIndex] != undefined ? (
        <>
          <p id={styles.index}>
            {currentIndex + 1} of {images.length + 1}
          </p>
          <img
            id={styles.slideImage}
            src={images[currentIndex].value}
            alt={`pokemon slide ${currentIndex}`}
          />
          <div className={styles.buttonDiv}>
            <button
              className={styles.slideBtn}
              id={styles.left}
              onClick={goToPrevSlide}
            >
              {' '}
              {'<'}{' '}
            </button>
            <button
              className={styles.slideBtn}
              id={styles.right}
              onClick={goToNextSlide}
            >
              {' '}
              {'>'}{' '}
            </button>
          </div>
        </>
      ) : (
        <p id={styles.noImg}>No images</p>
      )}
    </div>
  );
}
