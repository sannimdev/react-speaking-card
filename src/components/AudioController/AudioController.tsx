import { css } from '../../../styled-system/css';
import useAudioController from './useAudioController';
import { IAudioControllerProps } from './types';
import useAudioEasterEgg from '../../hooks/useAudioEasterEgg';

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
};

const buttonControllerStyle = {
  display: 'flex',
  alignContent: 'center',
  '& > li': {
    display: 'flex',
    alignContent: 'center',
    marginRight: '8px',
    _last: { marginRight: '0' },
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

function AudioController({ src, autoPlay = false, onAutoPlayChecked }: IAudioControllerProps) {
  const {
    audioRef,
    getter: { speedButtonLabel, playCount, isRepeat, maxRepeatCount },
    methods: { play, stop, toggleRepeat, toggleSpeed },
  } = useAudioController({
    src,
    autoPlay,
    onAutoPlayChecked,
  });

  // TODO: 이스터에그
  const { audioEasterEgg } = useAudioEasterEgg();
  if (audioEasterEgg < 15) return null;

  return (
    <div className={css(soundControllerStyle)}>
      <form>
        <ul className={css(buttonControllerStyle)}>
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
        <div>
          <audio controls autoPlay={autoPlay} ref={audioRef}>
            <source src={src} type="audio/mp4" />
            <p>이 브라우저는 오디오 요소를 지원하지 않습니다.</p>
          </audio>
          <p className={css({ fontSize: '0.8rem', textAlign: 'center' })}>
            ({playCount + 1}/{maxRepeatCount})
          </p>
        </div>
        <ul>
          <li>
            <label>
              <input type="checkbox" checked={isRepeat} onChange={toggleRepeat} /> 반복 재생
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" checked={autoPlay} onChange={() => onAutoPlayChecked?.()} /> 자동 재생
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AudioController;
