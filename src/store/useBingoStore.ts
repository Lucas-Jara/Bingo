import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const NUMS = Array.from({ length: 9 }, (_, index) => {
  const startNumber = index * 10 + 1;
  return Array.from({ length: 10 }, (_, i) => startNumber + i);
});

interface BingoState {
  nums: number[][];
  history: number[];
  intervalSpeed: number;
  bingoStatus: 'START' | 'STOP';
  sound: {
    active: boolean;
    volume: number;
  };
  typeSound: string;
  setNums: (nums: number[][]) => void;
  setHistory: (history: number[]) => void;
  setIntervalSpeed: (speed: number) => void;
  setBingoStatus: (status: 'START' | 'STOP') => void;
  setSound: (sound: { active: boolean; volume: number }) => void;
  setTypeSound: (type: string) => void;
  getRandomNum: () => number;
  handleStart: (audioRef: HTMLAudioElement | null) => void;
  handleStop: () => void;
  handleReset: () => void;
  toggleMuted: () => void;
}

export const useBingoStore = create<BingoState>()(
  persist(
    (set, get) => ({
      nums: NUMS,
      history: [],
      intervalSpeed: 7000,
      bingoStatus: 'STOP',
      sound: {
        active: true,
        volume: 70,
      },
      typeSound: 'Número',

      setNums: (nums) => set({ nums }),
      setHistory: (history) => set({ history }),
      setIntervalSpeed: (speed) => set({ intervalSpeed: speed }),
      setBingoStatus: (status) => set({ bingoStatus: status }),
      setSound: (sound) => set({ sound }),
      setTypeSound: (type) => set({ typeSound: type }),

      getRandomNum: () => {
        const { nums, history } = get();
        const arrNum = nums.flat().filter((n) => !history.includes(n));
        if (arrNum.length === 0) return 0;
        const randomIndex = Math.floor(Math.random() * arrNum.length);
        return arrNum[randomIndex];
      },

      handleStart: (audioRef) => {
        const { getRandomNum, sound, typeSound } = get();
        const num = getRandomNum();
        if (num === 0) {
          get().handleStop();
          return;
        }

        // Reproducir audio si está activo
        if (sound.active && audioRef) {
          let src = "/uploads";
          if (typeSound === "Número") {
            src += `/${num}.wav`;
          } else if (typeSound === "Significado") {
            src += `/${num}-meaning.wav`;
          } else {
            src +=
              `/${num}` +
              (Math.floor(Math.random() * 9) < 3 ? "-meaning.wav" : ".wav");
          }

          audioRef.src = src;
          audioRef.volume = sound.volume / 100;
          audioRef.play();
        }

        set((state) => ({
          bingoStatus: 'START',
          history: [num, ...state.history],
        }));
      },

      handleStop: () => set({ bingoStatus: 'STOP' }),

      handleReset: () => set({
        nums: NUMS,
        history: [],
        bingoStatus: 'STOP',
      }),

      toggleMuted: () => set((state) => ({
        sound: {
          ...state.sound,
          active: !state.sound.active,
          volume: 0,
        },
      })),
    }),
    { name: "bingo-store" }
  )
); 