"use client";
import { useEffect } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";

gsap.registerPlugin(Draggable);

export default function New() {
  useEffect(() => {
    const floatItems = document.querySelectorAll(".floating-img");

    floatItems.forEach((item) => {
      gsap.to(item, {
        y: "+=20",
        duration: 2.25 + Math.random() * 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2,
      });

      Draggable.create(item, {
        type: "x,y",
        inertia: true,
      });
    });
  }, []);
  return (
    <main className="bg-[#f5f5f5] text-[#2c2c2c]">
      {/* Hero */}
      <section className="hero-2025 h-screen flex flex-col items-center justify-center relative">
        <h1 className="text-[5.75rem] md:text-[10rem] lg:text-[18rem] font-archivo font-[800] tracking-[0.5em] pl-16 text-right leading-none">
          2025
        </h1>
        <p className="w-full mt-8 text-center text-2xl uppercase tracking-widest font-ppneue">
          [Core Collection]
        </p>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => {
            const top = Math.random() * 80 + "%";
            const left = Math.random() * 80 + "%";
            const srcs = [
              "/images/zipper-2.png",
              "/images/model-pose.png",
              "/images/pin-3.png",
              "/images/pin-4.png",
              "/images/pin-5.png",
              "/images/metal-detail.png",
            ];
            const src = srcs[i % srcs.length];

            return (
              <div
                key={i}
                className="floating-img absolute pointer-events-auto cursor-grab"
                style={{
                  top,
                  left,
                  width: "clamp(4rem, 8vw, 12rem)",
                  height: "clamp(4rem, 8vw, 12rem)",
                }}
              >
                <div className="w-[10rem] md:w-[15rem] lg:w-[20rem] opacity-90">
                  <Image
                    src={src}
                    alt={`Floating ${i}`}
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────── Jackets Blocks ───────── */}
      <section className="jacket-section mt-[12rem]">
        {[
          {
            id: "riot",
            name: "Bowery Feedback",
            city: "New York",
            statement:
              "Born on the Bowery. Cut for the boardroom.Concrete black cowhide meets subway-line chaos — this blazer holds the energy of a city that never flinched.",
            bg: "/images/riot-nyc.png",
            productLink: "/jacket/bowery-feedback",
          },
          {
            id: "anarchy",
            name: "Thames Rip",
            city: "London",
            statement:
              "Savile Row met Camden in a dark alley. Only one walked out.Aristocratic form, punk aggression — ripped denim and red tartan beneath a trench that speaks fluent rebellion.",
            bg: "/images/anarchy-london.png",
            productLink: "/jacket/thames-rip",
          },
          {
            id: "furnace",
            name: "Autoworker’s Howl",
            city: "Detroit",
            statement:
              "Built like the factories that built the sound.Worn waxed canvas, industrial tape, and recycled seatbelts — a bomber that roars back at the system.",
            bg: "/images/furnace-detroit.png",
            productLink: "/jacket/autoworkers-howl",
          },
          {
            id: "mirage",
            name: "Black Flag Sunburn",
            city: "Los Angeles",
            statement:
              "Built like the factories that built the sound.Worn waxed canvas, industrial tape, and recycled seatbelts — a bomber that roars back at the system.",
            bg: "/images/mirage-la.png",
            productLink: "/jacket/black-flag-sunburn",
          },
        ].map((jacket, i) => (
          <div
            key={i}
            className="jacket-block h-screen flex flex-col md:flex-row items-center justify-center"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <div className="w-auto h-full relative overflow-hidden">
              <Image
                src={jacket.bg}
                alt={jacket.name}
                className="jacket-image w-full h-full object-cover will-change-transform"
                width={1000}
                height={1000}
                priority
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4 p-8">
              <h3 className="font-ppneue text-4xl">{jacket.name}</h3>
              <p className="font-ppneue text-xl opacity-60">
                {jacket.statement}
              </p>
              <Link href={jacket.productLink}>
                <button className="mt-4 cursor-pointer text-left text-lg font-ppneue uppercase tracking-widest underline">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Philosophy Footer */}
      <section className="w-screen h-screen flex flex-col items-center justify-center text-center bg-[#f5f5f5] text-[#2c2c2c]">
        <h2 className="font-ppneue font-[800] text-5xl mb-6">
          Four Cities. Four Jackets. One Statement.
        </h2>
      </section>
      <Footer />
    </main>
  );
}
