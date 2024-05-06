import { useAtom } from 'jotai';
import { audioEasterEggAtom } from '../atoms';

const useAudioEasterEgg = () => {
  const [audioEasterEgg, setAudioEasterEgg] = useAtom(audioEasterEggAtom);

  const triggerAudioEasterEgg = () => {
    setAudioEasterEgg(audioEasterEgg + 1);
  };

  return {
    audioEasterEgg,
    triggerAudioEasterEgg,
  };
};

export default useAudioEasterEgg;
