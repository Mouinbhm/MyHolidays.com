import { useState, useEffect } from "react";

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageSrc, setImageSrc] = useState("placeholder.jpg");

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className="transition-opacity duration-300"
    />
  );
};

export default LazyImage;
