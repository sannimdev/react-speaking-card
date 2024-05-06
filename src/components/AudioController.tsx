import { useEffect, useRef, useState } from 'react';
import { css } from '../../styled-system/css';
import { useAtom } from 'jotai';
import { audioEasterEggAtom } from '../atoms';

const soundControllerStyle = {
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',

  '& form': {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },

  '& ul': {
    display: 'flex',
    alignContent: 'center',
    '& > li': {
      display: 'flex',
      alignContent: 'center',
      marginRight: '8px',
      _last: { marginRight: '0' },
    },
  },
};

const optionsStyle = {
  marginTop: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& label': {
    marginLeft: '8px',
  },

  '& ul': {
    display: 'flex',
    flexDirection: 'column',
  },
};

interface Props {
  src?: string;
  autoPlay?: boolean;
  onAutoPlayChecked?: (checked: boolean) => void;
}

function AudioController({ src, autoPlay = false, onAutoPlayChecked }: Props) {
  const [isRepeat, setIsRepeat] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const speedButtonLabel = speed === 1 ? '빠르게' : '평속';

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!src) return;

    if (audioRef.current) {
      audioRef.current.src = src;
      console.log(speed, '배속');
      audioRef.current.load();
      audioRef.current.playbackRate = speed;
      if (autoPlay) {
        audioRef.current.play();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, autoPlay]);

  const play = () => {
    if (audioRef.current) {
      stop();
      audioRef.current.play();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const toggleSpeed = () => {
    const newSpeed = speed === 1 ? 1.4 : 1;
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleAutoPlayChecked = () => {
    onAutoPlayChecked?.(true);
  };

  // TODO: 이스터에그
  const [audioEasterEgg] = useAtom(audioEasterEggAtom);
  if (audioEasterEgg < 15) return null;

  return (
    <div className={css(soundControllerStyle)}>
      <form>
        <ul>
          <li>
            <button type="button" onClick={play}>
              재생
            </button>
          </li>
          <li>
            <button type="button" onClick={stop}>
              정지
            </button>
          </li>
          <li>
            <button type="button" onClick={toggleSpeed}>
              {speedButtonLabel}
            </button>
          </li>
        </ul>
      </form>
      <div className={css(optionsStyle)}>
        <audio controls autoPlay={autoPlay} loop={isRepeat} ref={audioRef}>
          <source src={src} type="audio/mp4" />
          <p>이 브라우저는 오디오 요소를 지원하지 않습니다.</p>
        </audio>
        <ul>
          <li>
            <label>
              <input type="checkbox" checked={isRepeat} onChange={toggleRepeat} /> 반복 재생
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" checked={autoPlay} onChange={handleAutoPlayChecked} /> 자동 재생
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AudioController;
