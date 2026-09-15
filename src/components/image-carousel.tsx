'use client';


const galleryImages = [
  {
    src: "/matrimonial.webp",
    alt: "Habitación matrimonial",
    tag: "Matrimonial",
    title: "Confort Para Parejas",
  },
  {
    src: "/familiar.webp",
    alt: "Habitación familiar",
    tag: "Habitación Familiar",
    title: "Espacios Amplios Para Todos",
  },
  {
    src: "/doble.webp",
    alt: "Habitación doble",
    tag: "Habitación Doble",
    title: "Habitaciones Dobles Equipadas",
  },
];

import { useEffect, useState } from "react";

export const ImageCarrusel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
      <div className="relative overflow-hidden rounded-2xl border border-white-03 bg-white shadow-md">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {galleryImages.map((image) => (
            <article className="w-full flex-none" key={image.src}>
              <img
                alt={image.alt}
                className="h-85 w-full object-cover md:h-115"
                src={image.src}
              />
              <div className="p-4 md:p-5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {image.tag}
                </span>
                <p className="mt-2 text-lg font-semibold text-black-02">
                  {image.title}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black-02/35 px-3 py-2 backdrop-blur-sm">
          {galleryImages.map((image, index) => (
            <button
              aria-label={`Ver slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                activeSlide === index ? "bg-white" : "bg-white/50"
              }`}
              key={`${image.src}-dot`}
              onClick={() => setActiveSlide(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
