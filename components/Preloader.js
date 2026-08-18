"use client";

import { useEffect } from "react";

export default function Preloader() {
  useEffect(() => {
    function onLoad() {
      document.body.classList.add("loaded");
    }
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <div id="preloader">
      <img src="/images/logo/verenzabath.png" alt="Verenza" className="pre-logo" />
      <div className="loader-bar" />
    </div>
  );
}
