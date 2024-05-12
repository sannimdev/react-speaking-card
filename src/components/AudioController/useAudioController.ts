import { useEffect, useRef, useState } from 'react';
import { IAudioControllerProps } from './types';

const MAX_REPEAT_COUNT = 50;
const useAudioController = ({ src, autoPlay }: IAudioControllerProps) => {
  const [isRepeat, setIsRepeat] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const speedButtonLabel = speed === 1 ? '빠르게' : '평속';

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!src) return;

    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
      audioRef.current.playbackRate = speed;
      if (autoPlay) {
        audioRef.current.play();
      }
    }

    // 리셋 플레이 카운트
    setPlayCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, autoPlay]);

  useEffect(() => {
    const audioEl = audioRef.current;
    const replayUntilRepeatCount = () => {
      if (isRepeat && playCount < MAX_REPEAT_COUNT) {
        audioEl?.play();
        setPlayCount(playCount + 1);
      }
    };

    audioEl?.addEventListener('ended', replayUntilRepeatCount);

    return () => {
      audioEl?.removeEventListener('ended', replayUntilRepeatCount);
    };
  }, [isRepeat, playCount]);

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
    setPlayCount(0);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (!isRepeat) setPlayCount(0);
  };

  const toggleSpeed = () => {
    const newSpeed = speed === 1 ? 1.4 : 1;
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  return {
    audioRef,

    getter: {
      speedButtonLabel,
      playCount,
      isRepeat,
      maxRepeatCount: MAX_REPEAT_COUNT,
    },

    setter: {
      setPlayCount,
    },

    methods: {
      play,
      stop,
      toggleRepeat,
      toggleSpeed,
    },
  };
};

export default useAudioController;
