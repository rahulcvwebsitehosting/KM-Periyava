
import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, imgClassName, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
          };
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { rootMargin: '200px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder with blur */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
        />
      )}
      
      {/* Actual Image */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName || ''}`}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
