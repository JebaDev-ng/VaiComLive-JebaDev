interface ResponsiveSvgProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const ResponsiveSvg = ({ 
  src, 
  alt, 
  className = "", 
  priority = false 
}: ResponsiveSvgProps) => (
  <img
    src={src}
    alt={alt}
    className={`max-w-full h-auto ${className}`}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
  />
);
