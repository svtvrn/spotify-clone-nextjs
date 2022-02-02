import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Sliders.module.scss';
export default function VolumeSlider() {
  const [volume, setVolume] = useState(50);
  const volumeRef = useRef();

  useEffect(() => {
    const input = volumeRef.current as HTMLElement;
    if (input) {
      const value = ((volume - 0) / 100) * 100;
      input.style.background =
        'linear-gradient(to right, rgb(29 78 216), rgb(29 78 216) ' +
        value +
        '%, rgb(212 212 212) ' +
        value +
        '%, rgb(212 212 212) 100%)';
    }
  }, [volume]);

  return (
    <div className={styles['volume__slider']}>
      <input
        ref={volumeRef}
        className="rounded-lg appearance-none bg-neutral-300 h-1 w-28 focus:outline-none flex items-center"
        type="range"
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  );
}
