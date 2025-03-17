import { useEffect, useState } from 'react';

export const Transition = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        <img 
          src="/icon-512x512.png" 
          alt="Logo" 
          className="w-48 h-48 mx-auto mb-4 animate-pulse"
        />
        <h1 className="text-4xl font-bold text-[#D04848] animate-pulse">
          ¡LUCAS BINGO!
        </h1>
      </div>
    </div>
  );
}; 