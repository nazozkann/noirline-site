
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GraffitiHeader() {
  useEffect(() => {

    gsap.set(".bracket-left", {
      x: 100,
      display: "inline-block",
    });
    gsap.set(".bracket-right", {
      x: -100,
      display: "inline-block",
    });
    gsap.set(".graffiti-title", {
      scaleX: 0,
      transformOrigin: "center center",
    });


    const tl = gsap.timeline({ paused: true });
    tl.to(".bracket-left", { x: 0, duration: 4, ease: "power3.in" }, 0)
      .to(".bracket-right", { x: 0, duration: 4, ease: "power3.in" }, 0)
      .to(
        ".graffiti-title",
        { scaleX: 1, duration: 1, ease: "power3.out" },
        "-=0.2"
      );

    ScrollTrigger.create({
      trigger: ".graffiti-header",
      start: "center center",
      onEnter: () => tl.play(),

    });
  }, []);

  return (
    <div className="graffiti-header flex items-center justify-center pt-8">
      <p className="bracket-left font-archivo text-4xl text-[#2c2c2c] select-none">
        [
      </p>
      <h2 className="graffiti-title mx-4 font-archivo text-4xl text-[#2c2c2c] overflow-hidden">
        TAG THE WALL
      </h2>
      <p className="bracket-right font-archivo text-4xl text-[#2c2c2c] select-none">
        ]
      </p>
    </div>
  );
}
