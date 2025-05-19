"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Material = {
  label: string;
  value: string;
};

export interface Jacket {
  name: string;
  city: string;
  heroImage1: string;
  heroImage2: string;
  heroImage3: string;
  tagline: string;
  description: string;
  materials: Material[];
  featureImage: string;
  quote: string;
  serial: string;
  videoUrl: string;
}

interface JacketDetailPageProps {
  jacket: Jacket;
}

export default function JacketDetailPage({ jacket }: JacketDetailPageProps) {
  const manifestRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const scrambleFill = (
    el: HTMLElement,
    newText: string,
    speed = 50,
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
    const section = manifestRef.current;
    if (!section || !taglineRef.current || !descRef.current) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        scrambleFill(taglineRef.current!, jacket.tagline, 24);
        scrambleFill(descRef.current!, jacket.description, 16, "both");
      },
    });

    return () => st.kill();
  }, [jacket]);

  return (
    <main className="text-[#2c2c2c] bg-[#f5f5f5] flex flex-col items-center text-center">
      {/* Hero Section */}
      <section className="h-screen px-4 w-full max-w-screen-xl flex flex-col items-center justify-center">
        <div className="detail-hero-header mt-80">
          <h1 className="text-[5rem] md:text-[8rem] font-archivo font-bold">
            {jacket.name}
          </h1>
          <p className="tracking-widest uppercase font-ppneue">{jacket.city}</p>
        </div>
        <div className="hero-triple grid grid-cols-1 md:grid-cols-3 gap-4 mt-40 mb-20 w-full">
          {[jacket.heroImage1, jacket.heroImage2, jacket.heroImage3].map(
            (img, i) => (
              <div key={i} className="w-full">
                <Image
                  src={img}
                  alt={`${jacket.name} ${i + 1}`}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-auto"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* Manifest Section */}
      <section
        ref={manifestRef}
        className="mt-140 mb-60 px-4 w-full max-w-screen-md fade-in"
      >
        <h2
          ref={taglineRef}
          className="font-ppneue text-3xl md:text-5xl font-bold mb-4"
        >
          {jacket.tagline}
        </h2>
        <p ref={descRef} className="font-ppneue text-lg mb-6">
          {jacket.description}
        </p>
      </section>

      {/* Materials + Feature Images */}
      <section className="py-48 px-4 w-full max-w-screen-lg grid md:grid-cols-2 gap-12 items-center justify-center text-left md:text-center">
        <div className="feature-image w-full">
          <Image
            src={jacket.featureImage}
            alt={`${jacket.name} feature`}
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4 fade-in">
          {jacket.materials.map((mat) => (
            <div key={mat.label}>
              <p className="font-ppneue text-lg">
                <span className="font-bold">{mat.label}:</span> {mat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 ">
        <video
          className="w-[62rem] h-auto mx-auto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={`/videos/${jacket.videoUrl}.mp4`} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-4 max-w-screen-md fade-in">
        <p className="font-ppneue text-xl italic">“{jacket.quote}”</p>
      </section>

      {/* Limited Production Info */}
      <section className="py-4 px-8 md:px-32 fade-in">
        <div className="inline-block border border-black px-8 py-6">
          <p className="font-mono text-sm uppercase tracking-widest mb-2">
            {jacket.serial}
          </p>
          <p className="font-mono text-sm">
            Each piece hand-tagged with serial number.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 md:px-32 fade-in">
        <button className="font-ppneue uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition">
          Own the Rebellion
        </button>
        <div className="mt-4">
          <a href="/collection" className="underline font-ppneue text-sm">
            View other Core 2025 Jackets
          </a>
        </div>
      </section>
    </main>
  );
}
