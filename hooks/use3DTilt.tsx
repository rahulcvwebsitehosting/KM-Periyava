import React, { useRef, useCallback } from 'react';

interface TiltOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
}

export const use3DTilt = (options: TiltOptions = {}) => {
  const {
    maxTilt = 8,
    scale = 1.02,
    speed = 400
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    
    card.style.transform = 
      `perspective(1000px) rotateX(${rotateX}deg) 
       rotateY(${rotateY}deg) scale(${scale})`;
    card.style.transition = `transform ${speed}ms cubic-bezier(0.03,0.98,0.52,0.99)`;
  }, [maxTilt, scale, speed]);

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = `transform ${speed * 2}ms ease`;
  }, [speed]);

  const handleMouseEnter = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transition = 
      `transform ${speed}ms cubic-bezier(0.03,0.98,0.52,0.99)`;
  }, [speed]);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter
  };
};

export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  maxTilt?: number;
}> = ({ children, className, style, onClick, maxTilt = 8 }) => {
  const tilt = use3DTilt({ maxTilt });
  
  const isTouchDevice = typeof window !== 'undefined' && 
    window.matchMedia('(hover: none)').matches;

  if (isTouchDevice) {
    return (
      <div className={className} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={tilt.ref}
      className={className}
      style={{ ...style, willChange: 'transform', transformStyle: 'preserve-3d' }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onMouseEnter={tilt.onMouseEnter}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
