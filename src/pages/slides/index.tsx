import { useState } from 'react';
import { Slide } from '@/components/Slide';
import slide1 from '@/assets/Slide1.png';
import slide2 from '@/assets/Slide2.png';
import slide3 from '@/assets/Slide3.png';
import slide4 from '@/assets/Slide4.png';
import slide5 from '@/assets/Slide5.png';
import slide6 from '@/assets/Slide6.png';
import slide7 from '@/assets/Slide7.png';
import slide8 from '@/assets/Slide8.png';
import slide9 from '@/assets/Slide9.png';
import slide10 from '@/assets/Slide10.png';
import slide11 from '@/assets/Slide11.png';
import slide12 from '@/assets/Slide12.png';
import slide13 from '@/assets/Slide13.png';
import slide14 from '@/assets/Slide14.png';
import slide15 from '@/assets/Slide15.png';
import slide16 from '@/assets/Slide16.png';
import slide17 from '@/assets/Slide17.png';
import slide18 from '@/assets/Slide18.png';
import slide19 from '@/assets/Slide19.png';
import slide20 from '@/assets/Slide20.png';

const slides = [
  <Slide src={slide1} />,
  <Slide src={slide2} />,
  <Slide src={slide3} />,
  <Slide src={slide4} />,
  <Slide src={slide5} />,
  <Slide src={slide6} />,
  <Slide src={slide7} />,
  <Slide src={slide8} />,
  <Slide src={slide9} />,
  <Slide src={slide10} />,
  <Slide src={slide11} />,
  <Slide src={slide12} />,
  <Slide src={slide13} />,
  <Slide src={slide14} />,
  <Slide src={slide15} />,
  <Slide src={slide16} />,
  <Slide src={slide17} />,
  <Slide src={slide18} />,
  <Slide src={slide19} />,
  <Slide src={slide20} />,
];

export default function BungeobbangSlides() {
  const [index, setIndex] = useState(0);

  return (
    <button
      style={{
        cursor: 'pointer',
        padding: 0,
        border: 'none',
        outline: 'none',
        background: 'white',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={() => {
        setIndex((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
      }}
    >
      {slides[index]}
    </button>
  );
}
