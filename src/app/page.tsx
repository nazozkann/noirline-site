"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GraffitiWall from "./components/GrafittiWall";
import GraffitiHeader from "./components/GraffitiHeader";
import Footer from "./components/Footer";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface City {
  linkDetail: string;
  feedback: string;
  city: string;
  description: string;
  description2: string;
  image: string;
  backImage: string;
}

const cityData: City[] = [
  {
    linkDetail: "bowery-feedback",
    feedback: "[Bowery Feedback]",
    city: "New York",
    description:
      "Raw-black cowhide, zipper track in safety-cone orange, interior liner print of subway map overlayed with CBGB setlists.",
    description2: "Honors the first Ramones set at CBGB (Aug 16 1974).",
    image: "/images/main-newyork-front.png",
    backImage: "/images/main-newyork-back.png",
  },
  {
    linkDetail: "thames-rip",
    feedback: "[Thames Rip]",
    city: "London",
    description:
      "Distressed white denim, hand-slash red tartan inserts, sleeve studs in the shape of pound-sign glyphs.",
    description2: "Nods to The Clash’ 1977 Jubilee boat gig on the Thames.",
    image: "/images/main-london-front.png",
    backImage: "/images/main-london-back.png",
  },
  {
    linkDetail: "autoworkers-howl",
    feedback: "[Autoworker’s Howl]",
    city: "Detroit",
    description:
      "Oil-stain gray waxed canvas, reflective tape stripes, recycled seat-belt belt.",
    description2:
      "Pays tribute to Iggy Pop climbing off the Cobo Hall stage in ’69.",
    image: "/images/main-detroit-front.png",
    backImage: "/images/main-detroit-back.png",
  },
  {
    linkDetail: "black-flag-sunburn",
    feedback: "[Black Flag Sunburn]",
    city: "Los Angeles",
    description:
      "Sun-bleached black leather, heat-reactive panel that turns deep crimson, graffiti font “Nervous Breakdown” on lining.",
    description2: "Celebrates the birth of Hardcore at Hermosa Beach, 1978.",
    image: "/images/main-losangeles-front.png",
    backImage: "/images/main-losangeles-back.png",
  },
];

export default function HomePage() {
  const section4Ref = useRef<HTMLElement | null>(null);
  const [cities] = useState<City[]>(cityData);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentCity, setCurrentCity] = useState<City | null>(cityData[0]);

  useEffect(() => {
    const movePic = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-1",
        start: "top top+=64",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });
    movePic.to(".overlay-1", { x: "-25vw", ease: "none" }, 0);
    movePic.to(".overlay-3", { x: "-35vw", ease: "none" }, 0);
    movePic.to(".overlay-2", { x: "25vw", ease: "none" }, 0);
    movePic.to(".overlay-4", { x: "35vw", ease: "none" }, 0);

    gsap.fromTo(
      ".noirline-heading",
      { opacity: 0, scale: 2, skewY: 5 },
      {
        opacity: 1,
        scale: 1,
        skewY: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ".section-2", start: "top 80%" },
      }
    );

    gsap.to(".noirline-heading", {
      keyframes: [
        { skewX: 4, x: 4, duration: 0.05 },
        { skewX: -4, x: -4, duration: 0.05 },
        { skewX: 0, x: 0, duration: 0.05 },
      ],
      repeat: 4,
      repeatDelay: 0.5,
      ease: "none",
      scrollTrigger: { trigger: ".noirline-heading", start: "top 80%" },
    });

    gsap.fromTo(
      ".subheading",
      { y: 50 },
      {
        y: -1000,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".section-2",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    const slides = 5;
    const scrollDistance = window.innerWidth * (slides - 1);
    const horizontalTween = gsap.to(".image-area", {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-3",
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      horizontalTween.kill();
      horizontalTween.scrollTrigger?.kill();
    };
  }, []);

  useEffect(() => {
    if (!section4Ref.current) return;

    ScrollTrigger.create({
      trigger: section4Ref.current,
      start: "top top",
      end: `+=${window.innerHeight * cities.length - 5}`,
      scrub: true,
      pin: true,
      snap: {
        snapTo: 1 / (cities.length - 1),
        duration: { min: 0.2, max: 0.4 },
      },
      onUpdate(self) {
        const idx = Math.min(
          Math.floor(self.progress * cities.length),
          cities.length - 1
        );
        const city = cities[idx];
        setCurrentIdx(idx);
        setCurrentCity(city);
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [cities]);

  const scrambleFill = (
    el: HTMLElement,
    newText: string,
    speed = 10,
    fillmode: "forwards" | "backwards" | "both" = "forwards"
  ) => {
    if (el.dataset.animating === "true") return;
    el.dataset.animating = "true";

    const len = newText.length;
    const randomArr = Array.from({ length: len }, (_, i) =>
      newText[i] === " "
        ? " "
        : "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]
    );
    const finish = () => (el.dataset.animating = "false");

    if (fillmode === "backwards") {
      for (let i = len - 1; i >= 0; i--) {
        setTimeout(() => {
          randomArr[i] = newText[i];
          el.textContent = randomArr.join("");
          if (i === 0) finish();
        }, (len - i) * speed);
      }
    } else {
      const isEven = len % 2 === 0;
      for (let i = 0; i < len; i++) {
        setTimeout(() => {
          if (fillmode === "forwards" || (fillmode === "both" && i % 2 === 0)) {
            randomArr[i] = newText[i];
          } else {
            const pos = isEven ? len - i : len - i - 1;
            randomArr[pos] = newText[pos];
          }
          el.textContent = randomArr.join("");
          if (i === len - 1) finish();
        }, (i + 1) * speed);
      }
    }
  };

  useEffect(() => {
    if (!currentCity || !section4Ref.current) return;
    const fbEl =
      section4Ref.current.querySelector<HTMLElement>(".city-feedback");
    const nameEl = section4Ref.current.querySelector<HTMLElement>(".city-name");
    const descEl = section4Ref.current.querySelector<HTMLElement>(".city-desc");
    const desc2El =
      section4Ref.current.querySelector<HTMLElement>(".city-desc2");

    if (!fbEl || !nameEl || !descEl || !desc2El) return;

    scrambleFill(fbEl, currentCity.feedback);
    scrambleFill(nameEl, currentCity.city);
    scrambleFill(descEl, currentCity.description);
    scrambleFill(desc2El, currentCity.description2);
  }, [currentCity]);

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 – HERO */}
      {/* ------------------------------------------------------------------ */}
      <div className="section-1 relative w-screen h-[calc(100vh-64px)] px-4 md:px-24 lg:px-32 py-8">
        {/* Main Image */}
        <div className=" relative w-full h-full">
          <Image
            src="/images/Punk_Leather_Texture.webp"
            alt="Leather Texture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlays */}
        <Image
          src="/images/main-overlay-1.png"
          alt="Overlay 1"
          width={1000}
          height={1000}
          className="overlay-1 object-contain absolute top-[1%] left-[12%] md:left-[17%] lg:left-[10%] w-[200px] md:w-[300px] lg:w-[440px]"
        />
        <Image
          src="/images/main-overlay-3.png"
          alt="Overlay 2"
          width={1000}
          height={1000}
          className="overlay-2 object-contain absolute top-[10%] right-[20%] md:right-[17%] lg:right-[15%] w-[180px] md:w-[240px] lg:w-[390px]"
        />
        <Image
          src="/images/main-overlay-2.png"
          alt="Overlay 3"
          width={1000}
          height={1000}
          className="overlay-3 object-contain absolute bottom-[1%] left-[10%] md:left-[18%] lg:left-[15%] w-[280px] md:w-[430px] lg:w-[600px]"
        />
        <Image
          src="/images/main-overlay-4.png"
          alt="Overlay 4"
          width={1000}
          height={1000}
          className="overlay-4 object-contain absolute bottom-[20%] right-[10%] md:right-[5%] lg:bottom-[10%] lg:right-[5%] w-[220px] md:w-[340px] lg:w-[480px]"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 – NOIRLINE TITLE */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="section-2 w-screen h-screen flex flex-col items-center justify-center bg-primary text-secondary"
        style={{ marginBlock: "clamp(2rem, 15vh, 18rem)" }}
      >
        <h1
          className="noirline-heading font-archivo font-black"
          style={{ fontSize: "clamp(4rem, 15vw, 18rem)" }}
        >
          NOIRline
        </h1>

        <h3
          className="subheading w-full text-right mr-16 font-archivo font-medium tracking-widest text-thirdary"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
        >
          An elegant rebellion
        </h3>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 – HORIZONTAL CITY STRIP */}
      {/* ------------------------------------------------------------------ */}
      <div className="section-3 relative w-screen overflow-hidden">
        <div className="sticky top-0 h-screen">
          <div className="image-area flex w-[500vw] h-screen">
            {["city-1", "city-2", "city-3", "city-4"].map((img, i) => (
              <Image
                key={i}
                src={`/images/${img}.png`}
                alt={`City ${i + 1}`}
                width={1000}
                height={1000}
                className="w-screen h-full object-cover"
              />
            ))}

            {/* Slide 5 – Text */}
            <div className="w-screen h-full flex flex-row items-center justify-between px-4">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="text-area w-[100%] md:w-[50%]">
                  <h2
                    className="font-ppneue mb-6 text-5xl font-bold text-left"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                  >
                    Four Cities. Four Jackets.
                    <br />
                    One Statement.
                  </h2>
                  <p
                    className="font-ppneue text-2xl text-left"
                    style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                  >
                    Noirline is not fast fashion.
                    <br />
                    We design for those who stand still in a moving crowd.
                    <br />
                    <span className="font-bold">
                      Every year, we craft four timeless jackets
                    </span>{" "}
                    — each born from
                    <br />
                    the spirit of a city where rebellion never died.
                  </p>
                </div>
                <div className="w-[100%] md:w-[50%] h-auto">
                  <Image
                    src="/images/jacket-folded.png"
                    alt="Jacket"
                    width={1000}
                    height={1000}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 – CITY PANEL (INTERACTIVE) */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={section4Ref}
        className="section-4 relative w-screen h-screen overflow-hidden p-8"
      >
        <div className="city-panel flex flex-col md:flex-row items-between justify-between h-full">
          {/* Image + feedback */}
          <Link
            href={`/jacket/${cities[currentIdx]?.linkDetail || ""}`}
            className="city-link flex-1 flex flex-col lg:flex-row gap-4 lg:gap-12 px-4 py-16 "
          >
            <div className="w-full h-[50%] lg:h-full flex flex-col items-center lg:items-start justify-center mt-6 md:mt-24 lg:mt-0">
              <div className="group relative">
                {currentCity && (
                  <Image
                    src={currentCity.image}
                    alt="Jacket"
                    width={1000}
                    height={1000}
                    className="section-img object-contain w-[400px] relative z-10"
                  />
                )}

                {currentCity && (
                  <Image
                    src={currentCity.backImage}
                    alt="Jacket Back"
                    width={1000}
                    height={1000}
                    className="hover-img object-contain absolute top-0 left-0 w-[400px] z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </div>
              <h4 className="city-feedback mt-4 text-base md:text-lg font-ppneue"></h4>
            </div>

            {/* Text block */}
            <div className="w-full flex flex-row items-center mt-24 lg:mt-0 justify-between gap-4">
              <p className="md:block hidden md:text-[11rem] lg:text-[14rem] font-ppneue font-[200]">
                [
              </p>
              <div className="city-text-area flex flex-col sm:gap-1 md:gap-4 items-start text-left">
                <h3 className="city-name sm:text-lg md:text-2xl lg:text-3xl font-archivo font-bold"></h3>
                <p className="city-desc sm:text-xs md:text-base lg:text-lg font-[600] font-ppneue leading-relaxed"></p>
                <p className="city-desc2 sm:text-xs md:text-sm lg:text-base font-ppneue leading-relaxed"></p>
              </div>
              <p className="md:block hidden md:text-[11rem] lg:text-[14rem] font-ppneue font-[200]">
                ]
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 – GRAFFITI CANVAS */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-5 mt-40 w-screen h-screen bg-black1 text-white">
        <GraffitiHeader />
        <div className="mt-8 h-[80vh] px-4">
          <GraffitiWall />
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ------------------------------ TYPES ------------------------------ */
interface City {
  feedback: string;
  city: string;
  description: string;
  description2: string;
  image: string;
  backImage: string;
}
