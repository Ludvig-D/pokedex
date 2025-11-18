import { useEffect, useState } from 'react';

export default function SlideShow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev === images.lentgh - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.lentgh - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [images.lentgh]);

  return (
    <div>
      <img src={images[currentIndex]} alt={`pokemon slide ${currentIndex}`} />
      <div>
        <button onClick={goToPrevSlide}> {'<'} </button>
        <button onClick={goToNextSlide}> {'>'} </button>
      </div>
    </div>
  );
}
