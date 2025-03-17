"use client"
import { ConfirmReset } from "@/components/ConfirmReset";
import { DonateModal } from "@/components/DonateModal";
import { Settings } from "@/components/Settings";
import { Transition } from "@/components/Transition";
import { Wrapper } from "@/components/Wrapper";
import { useBingoStore } from "@/store/useBingoStore";
import { useState, useRef, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Home() {
  const handle = useFullScreenHandle();
  const {
    nums,
    history,
    intervalSpeed,
    bingoStatus,
    sound,
    setIntervalSpeed,
    setSound,
    handleStart,
    handleStop,
    handleReset,
  } = useBingoStore();

  const [open, setOpen] = useState<boolean>(false);
  const [modalResetOpen, setModalResetOpen] = useState(false);
  const [modalDonate, setModalDonate] = useState(false);
  const intervalRef = useRef<any>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearInterval(intervalRef.current);
    const speed = parseInt(e.target.value);
    setIntervalSpeed(speed);
    intervalRef.current = setInterval(() => handleStart(audioRef.current), speed);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const active = parseInt(value) > 0;
    setSound({ volume: parseInt(value), active });
  };

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (bingoStatus === "START") {
      intervalRef.current = setInterval(() => handleStart(audioRef.current), intervalSpeed);
    }
    return () => clearInterval(intervalRef.current);
  }, [handleStart, bingoStatus, intervalSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = sound.volume / 100;
    }
  }, [sound]);

  return (
    <FullScreen handle={handle}>
      <Transition />
      <DonateModal open={modalDonate} setOpen={setModalDonate} />
      <ConfirmReset
        modalResetOpen={modalResetOpen}
        setModalResetOpen={setModalResetOpen}
        handleReset={()=> {
          handleReset();
          setModalResetOpen(false);
        }}
      />
      <Settings
        open={open}
        setOpen={setOpen}
        handleSpeedChange={handleSpeedChange}
        speed={intervalSpeed}
        handle={handle}
        isPlaying={bingoStatus !== "STOP"}
        handleVolumeChange={handleVolumeChange}
        setModalDonate={setModalDonate}
      />
      <audio ref={audioRef} />
      <div className="h-screen w-screen flex justify-center items-center bg-white -z-30">
        <Wrapper className="sm:max-w-4xl w-full bg-[#D04848] scale-95">
          <div className="flex flex-col space-y-1 sm:space-y-3 w-full">
            <Wrapper className="md:flex-1 flex flex-col md:flex-row justify-between items-center md:space-x-16 bg-[#FDE767]">
              <div className="flex gap-4 my-6">
                <button
                  disabled={bingoStatus === "START"}
                  onClick={() => handleStart(audioRef.current)}
                  className={`bg-[#D04848] p-2 sm:p-8 border-2 sm:border-4 border-black rounded-lg ${
                    bingoStatus === "START" ? "hidden" : "block"
                  }`}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  disabled={bingoStatus === "STOP"}
                  onClick={handleStop}
                  className={`bg-[#D04848] bg-yellow-[#fffffe] p-2 sm:p-8 border-2 sm:border-4 border-black rounded-lg ${
                    bingoStatus === "STOP" ? "hidden" : "block"
                  }`}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  disabled={bingoStatus === "START"}
                  onClick={() => setModalResetOpen(true)}
                  className={`${
                    bingoStatus === "START" || history.length <= 0
                      ? "hidden"
                      : "block"
                  } bg-[#D04848] p-2 sm:p-8 border-2 sm:border-4 border-black rounded-lg`}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.35355 1.85355C3.54882 1.65829 3.54882 1.34171 3.35355 1.14645C3.15829 0.951184 2.84171 0.951184 2.64645 1.14645L0.646447 3.14645C0.451184 3.34171 0.451184 3.65829 0.646447 3.85355L2.64645 5.85355C2.84171 6.04882 3.15829 6.04882 3.35355 5.85355C3.54882 5.65829 3.54882 5.34171 3.35355 5.14645L2.20711 4H9.5C11.433 4 13 5.567 13 7.5C13 7.77614 13.2239 8 13.5 8C13.7761 8 14 7.77614 14 7.5C14 5.01472 11.9853 3 9.5 3H2.20711L3.35355 1.85355ZM2 7.5C2 7.22386 1.77614 7 1.5 7C1.22386 7 1 7.22386 1 7.5C1 9.98528 3.01472 12 5.5 12H12.7929L11.6464 13.1464C11.4512 13.3417 11.4512 13.6583 11.6464 13.8536C11.8417 14.0488 12.1583 14.0488 12.3536 13.8536L14.3536 11.8536C14.5488 11.6583 14.5488 11.3417 14.3536 11.1464L12.3536 9.14645C12.1583 8.95118 11.8417 8.95118 11.6464 9.14645C11.4512 9.34171 11.4512 9.65829 11.6464 9.85355L12.7929 11H5.5C3.567 11 2 9.433 2 7.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <>
                {history.length > 0 ? (
                  <Wrapper className="w-full overflow-hidden scroll bg-[#D04848]">
                    <div className="flex space-x-1 w-full overflow-x-auto">
                      {history.map((n) => (
                        <Wrapper
                          key={n}
                          className={`h-10 md:h-16 aspect-square grid place-content-center transition-all bg-white`}
                        >
                          <p className={`font-bold sm:text-3xl`}>{n}</p>
                        </Wrapper>
                      ))}
                    </div>
                  </Wrapper>
                ) : (
                    <p className="text-3xl md:text-5xl font-bold text-[#D04848] flex-1 text-center animate-pulse">
                      PRESIONE PLAY!
                    </p>
                )}
              </>
            </Wrapper>
            <Wrapper className="grid gap-px md:gap-1 bg-[#FDE767]">
              {nums.map((num, i) => (
                <div key={i} className="grid grid-cols-10 gap-px md:gap-1">
                  {num.map((n) => (
                    <Wrapper
                      key={n}
                      className={`${
                        history.includes(n)
                          ? "bg-[#D04848] text-white"
                          : "bg-white"
                      } flex-1 place-self-stretch h-10 md:h-16 aspect-square grid place-content-center transition-all`}
                    >
                      <p className={`font-bold sm:text-3xl`}>{n}</p>
                    </Wrapper>
                  ))}
                </div>
              ))}
            </Wrapper>
          </div>
        </Wrapper>
      </div>
    </FullScreen>
  );
}
