"use client";

import { useEffect, useRef, useState } from "react";

const INTERVAL = 6000;

export default function HeroSlider({ slides }) {
  const total = slides.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const textTimeoutRef = useRef(null);

  function restart() {
    if (reducedMotionRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo(indexRef.current + 1);
    }, INTERVAL);
  }

  function goTo(next) {
    const i = ((next % total) + total) % total;
    indexRef.current = i;
    setActiveIndex(i);
    setAnimating(true);
    if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
    textTimeoutRef.current = setTimeout(() => {
      setTextIndex(i);
      setAnimating(false);
    }, 350);
    restart();
  }

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.setProperty("--hero-interval", INTERVAL + "ms");
    restart();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slide = slides[textIndex];

  return (
    <section className="hero-slider">
      <div className="hero-slides">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.img}
            alt={s.alt}
            className={`hero-slide-img${i === activeIndex ? " is-active" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <div className="hero-shade" />

      <div className="container hero-content-wrap">
        <div className={`hero-text${animating ? " is-animating" : ""}`}>
          <span className="tag">{slide.tag}</span>
          <h1 className="display-1">{slide.title}</h1>
        </div>
        <div className="hero-bottom-row">
          <div className="hero-index">
            <span className="cur">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="hero-index-bar">
              <i style={{ width: `${((activeIndex + 1) / total) * 100}%` }} />
            </span>
            <span className="tot">/ {String(total).padStart(2, "0")}</span>
          </div>
          <div className="hero-arrows">
            <button className="harrow prev" aria-label="Previous slide" onClick={() => goTo(indexRef.current - 1)}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="harrow next" aria-label="Next slide" onClick={() => goTo(indexRef.current + 1)}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="hero-filmstrip">
        {slides.map((s, i) => (
          <button
            key={i}
            className={`film-item${i === activeIndex ? " is-active" : ""}`}
            style={{ backgroundImage: `url('${s.img}')` }}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
          >
            <span className="film-progress" />
          </button>
        ))}
      </div>
    </section>
  );
}
