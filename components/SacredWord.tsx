
import React from 'react';

interface SacredWordProps {
  children: React.ReactNode;
  className?: string;
}

const SacredWord: React.FC<SacredWordProps> = ({ children, className = "" }) => {
  return (
    <span className={`sacred-shimmer ${className}`}>
      {children}
    </span>
  );
};

export default SacredWord;
