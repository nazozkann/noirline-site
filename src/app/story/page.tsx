"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function StoryPage() {
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const [selectedCity, setSelectedCity] = useState<
    "newyork" | "london" | "detroit" | "losangeles"
  >("newyork");

  const cities = [
    { id: "newyork", label: "New York" },
    { id: "london", label: "London" },
    { id: "detroit", label: "Detroit" },
    { id: "losangeles", label: "Los Angeles" },
  ];

  useEffect(() => {
    if (heroTitle.current) {
      gsap.fromTo(
        heroTitle.current,
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroTitle.current,
            start: "top center",
          },
        }
      );
    }
    if (heroSub.current) {
      gsap.fromTo(
        heroSub.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: heroSub.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const marqueeTrack = document.querySelector(".marquee-track");
    const trackWidth = marqueeTrack.scrollWidth / 2;

    gsap.to(marqueeTrack, {
      x: -trackWidth,
      duration: 20,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % -trackWidth),
      },
    });
  }, []);

  return (
    <div className="bg-[#f5f5f5] text-[#2c2c2c]">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <h1
          ref={heroTitle}
          className="font-archivo text-[4rem] md:text-[6rem] uppercase leading-tight"
        >
          An Elegant Rebellion.
        </h1>
        <p
          ref={heroSub}
          className="font-ppneue mt-4 text-xl opacity-60 max-w-xl"
        >
          Not born from trends. Born from cities where style fights back.
        </p>
        <Image
          src="/images/wallet.png"
          alt="grain"
          fill
          className="object-cover opacity-25 absolute inset-0"
        />
      </section>
      {/* 2. Core Philosophy */}
      <section className="min-h-screen flex flex-col md:flex-row items-center gap-20 px-4 py-20">
        <div className="md:w-1/2 pr-8">
          <h2 className="font-ppneue text-3xl md:text-5xl font-bold">
            We design only 4 jackets per year. Why? Because style isn’t
            disposable.
          </h2>
        </div>
        <div className="md:w-1/2 overflow-hidden">
          <Image
            src="/images/handbag-closeup.png"
            alt="Jacket detail"
            width={800}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>
      {/* 3. Cities Grid */}
      <section className="py-20 px-4">
        <div className="tabs font-archivo font-[500] flex flex-row justify-between items-center mb-20">
          {cities.map((city) => (
            <h4
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`cursor-pointer ${
                selectedCity === city.id ? "font-bold" : ""
              }`}
            >
              [{city.label}]
            </h4>
          ))}
        </div>
        <div className="city-info-area">
          {selectedCity === "newyork" && (
            <div className="newyork-info flex flex-col items-center justify-center">
              <div className="newyork-city city-info-image w-[40rem]">
                <Image
                  src="/images/newyork-city-image.png"
                  alt="City 1"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="city-info-text flex flex-col items-center justify-center text-center mt-4 gap-4">
                <h3 className="font-ppneue font-[900] text-xl">
                  The city where attitude was born.
                </h3>
                <p className="font-ppneue font-[500] text-lg">
                  Oversized lapels, subway map print, CBGB neon reflections
                  define this urban legend.
                </p>
                <p className="font-ppneue font-[500] text-lg opacity-60">
                  <span className="font-[900]">Design Reflection:</span>{" "}
                  Oversized lapels, subway map print, CBGB neon puddle.
                </p>
              </div>
            </div>
          )}
          {selectedCity === "london" && (
            <div className="london-info flex flex-col items-center justify-center">
              <div className="london-city city-info-image w-[40rem]">
                <Image
                  src="/images/london-city-image.png"
                  alt="City 1"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="city-info-text flex flex-col items-center justify-center text-center mt-4 gap-4">
                <h3 className="font-ppneue font-[900] text-xl">
                  Tailored chaos.
                </h3>
                <p className="font-ppneue font-[500] text-lg">
                  Sharp trench cuts meet riot symbols on buttons in perfect
                  discord.
                </p>
                <p className="font-ppneue font-[500] text-lg opacity-60">
                  <span className="font-[900]">Design Reflection:</span> Sharp
                  trench cuts, riot-symbol buttons.
                </p>
              </div>
            </div>
          )}
          {selectedCity === "detroit" && (
            <div className="detroit-info flex flex-col items-center justify-center">
              <div className="detroit-city city-info-image w-[40rem]">
                <Image
                  src="/images/detroit-city-image.png"
                  alt="City 1"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="city-info-text flex flex-col items-center justify-center text-center mt-4 gap-4">
                <h3 className="font-ppneue font-[900] text-xl">
                  The heart of resilience.
                </h3>
                <p className="font-ppneue font-[500] text-lg">
                  Waxed canvas, seatbelt-inspired belts tell the tale of factory
                  grit.
                </p>
                <p className="font-ppneue font-[500] text-lg opacity-60">
                  <span className="font-[900]">Design Reflection:</span> Waxed
                  canvas, seatbelt-inspired belts.
                </p>
              </div>
            </div>
          )}
          {selectedCity === "losangeles" && (
            <div className="losangeles-info flex flex-col items-center justify-center">
              <div className="losangeles-city city-info-image w-[40rem]">
                <Image
                  src="/images/losangeles-city-image.png"
                  alt="City 1"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="city-info-text flex flex-col items-center justify-center text-center mt-4 gap-4">
                <h3 className="font-ppneue font-[900] text-xl">
                  Rebellion under the sun.
                </h3>
                <p className="font-ppneue font-[500] text-lg">
                  Heat-reactive panels, hidden graffiti prints break the golden
                  calm.
                </p>
                <p className="font-ppneue font-[500] text-lg opacity-60">
                  <span className="font-[900]">Design Reflection:</span>{" "}
                  Heat-reactive panels, graffiti hidden prints.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* 4. Story Visual */}
      <section className="relative py-20">
        <Image
          src="/images/madein-noirline.png"
          alt="Story visual"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center max-w-2xl">
          <p className="font-ppneue text-xl">
            From Bowery walls to Savile Row cuts. We merge rebellion with
            refinement.
          </p>
        </div>
      </section>

      {/* 5. Limited Manifest */}
      <section className="fact-section overflow-hidden py-20 px-4">
        <div className="manifests-area bg-[#2c2c2c]">
          <div className="marquee-track font-archivo text-4xl uppercase font-black flex flex-row gap-24 whitespace-nowrap items-center my-20 text-[#f5f5f5] py-8 px-2">
            <h4 className="fact-item">4 Jackets / Year</h4>
            <h4 className="fact-item">4 Cities</h4>
            <h4 className="fact-item">Limited Production</h4>
            <h4 className="fact-item">Crafted for Decades</h4>
            <h4 className="fact-item">4 Jackets / Year</h4>
            <h4 className="fact-item">4 Cities</h4>
            <h4 className="fact-item">Limited Production</h4>
            <h4 className="fact-item">Crafted for Decades</h4>
          </div>
        </div>
      </section>
      {/* 6. Closing CTA */}
      <section className="text-center py-20 px-4">
        <h2 className="font-archivo text-4xl md:text-6xl mb-6">
          We don’t follow fashion. We follow rebellion.
        </h2>
        <button className="relative font-ppneue uppercase tracking-wide inline-block group">
          Explore Core Collection
        </button>
        <div className="w-full flex justify-center my-40">
          <Image
            src="/images/polaroid-2.png"
            alt="Noirline watermark"
            width={1000}
            height={1000}
            className="object-contain"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
