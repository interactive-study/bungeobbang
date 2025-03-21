import { Slide } from './Slide';
import imageSrc from '../assets/real.png';

export function RealBungeobbang() {
  return (
    <Slide>
      <img src={imageSrc} style={{ width: '50%' }} />
    </Slide>
  );
}
