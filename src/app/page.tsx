"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function HomePage() {
  useEffect(() => {
    // Pic Overlay Animation
    gsap.registerPlugin(ScrollTrigger);

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

    // NoirLine animation
    gsap.fromTo(
      ".noirline-heading",
      { opacity: 0, scale: 2, skewY: 5 },
      {
        opacity: 1,
        scale: 1,
        skewY: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-2",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
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
      scrollTrigger: {
        trigger: ".noirline-heading",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
    // NoirLine Parallax Etkisi
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

  return (
    <div>
      <div className="section-1 relative w-screen h-[calc(100vh-64px)] px-32 py-8">
        {/* Main Image */}
        <div className=" relative w-full h-full">
          <Image
            src="/images/Punk_Leather_Texture.png"
            alt="Leather Texture"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay */}
        <Image
          src="/images/main-overlay-1.png"
          alt="Overlay 1"
          width={1000}
          height={1000}
          className="overlay-1 object-contain absolute top-[1%] left-[12%] md:left-[17%] lg:left-[10%] w-[290px] md:w-[330px] lg:w-[440px]"
        />

        <Image
          src="/images/main-overlay-3.png"
          alt="Overlay 2"
          width={1000}
          height={1000}
          className="overlay-2 object-contain absolute top-[10%] right-[20%] md:right-[17%] lg:right-[15%] w-[185px] md:w-[280px] lg:w-[390px]"
        />

        <Image
          src="/images/main-overlay-2.png"
          alt="Overlay 3"
          width={1000}
          height={1000}
          className="overlay-3 object-contain absolute bottom-[1%] left-[10%] md:left-[18%] lg:left-[15%] w-[360px] md:w-[450px] lg:w-[600px]"
        />

        <Image
          src="/images/main-overlay-4.png"
          alt="Overlay 4"
          width={1000}
          height={1000}
          className="overlay-4 object-contain absolute bottom-[20%] right-[10%] md:right-[5%] lg:bottom-[10%] lg:right-[5%] w-[320px] md:w-[360px] lg:w-[480px]"
        />
      </div>
      <div className="section-2 w-screen h-screen my-72 flex flex-col items-center justify-center bg-primary text-secondary ">
        <h1 className="noirline-heading text-[18rem] font-archivo font-black">
          NOIRline
        </h1>
        <h3 className="subheading tracking-widest text-[3rem] w-full text-thirdary text-right mr-16 font-archivo font-medium">
          An elegant rebellion
        </h3>
      </div>
      <div className="section-3 relative w-screen overflow-hidden">
        <div className="sticky top-0 h-screen">
          <div className="image-area flex w-[500vw] h-full">
            {/* — 4 Görsel Slayt — */}
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

            {/* — 5. Slayt: Metin — */}
            <div className="w-screen h-full flex flex-row items-center justify-between px-8">
              <div className="text-area">
                <h2 className="font-ppneue mb-6 text-5xl font-bold text-left">
                  Four Cities. Four Jackets.
                  <br />
                  One Statement.
                </h2>
                <p className="font-ppneue text-2xl text-left">
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
              <div className="w-150 h-auto">
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
      <div className="section-4 min-h-screen py-20">
        <div className="newyork-main-page mx-4 my-72 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="main-jacket-image flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-100 h-auto">
              <Image
                src="/images/main-newyork-front.png"
                alt="Jacket"
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <h4 className="mt-4 text-base font-ppneue font-regular">
              [Bowery Feedback]
            </h4>
          </div>

          <div className="main-jacket-text-area flex flex-row items-center gap-8">
            <p className="text-[14rem] font-[200]">[</p>
            <div className="main-jacket-inner max-w-xl flex flex-col gap-4 mt-10 text-left">
              <h4 className="text-3xl font-archivo font-bold">New York</h4>
              <p className="text-base font-ppneue font-semibold leading-relaxed">
                Raw-black cowhide, zipper track in safety-cone orange, interior
                liner print of subway map overlayed with CBGB setlists.
              </p>
              <p className="text-base font-ppneue leading-relaxed">
                Honors the first Ramones set at CBGB (Aug 16 1974).
              </p>
            </div>
            <p className="text-[14rem] font-[200]">]</p>
          </div>
        </div>
        <div className="london-main-page mx-4 my-72 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="main-jacket-image flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-100 h-auto">
              <Image
                src="/images/main-london-front.png"
                alt="Jacket"
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <h4 className="mt-4 text-base font-ppneue font-regular">
              [Thames Rip]
            </h4>
          </div>

          <div className="main-jacket-text-area flex flex-row items-center gap-8">
            <p className="text-[14rem] font-[200]">[</p>
            <div className="main-jacket-inner max-w-xl flex flex-col gap-4 mt-10 text-left">
              <h4 className="text-3xl font-archivo font-bold">London</h4>
              <p className="text-base font-ppneue font-semibold leading-relaxed">
                Distressed white denim, hand-slash red tartan inserts, sleeve
                studs in the shape of pound-sign glyphs.
              </p>
              <p className="text-base font-ppneue leading-relaxed">
                Nods to the The Clash’ 1977 Jubilee boat gig on the Thames.
              </p>
            </div>
            <p className="text-[14rem] font-[200]">]</p>
          </div>
        </div>
        <div className="detroit-main-page mx-4 my-72 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="main-jacket-image flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-100 h-auto">
              <Image
                src="/images/main-detroit-front.png"
                alt="Jacket"
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <h4 className="mt-4 text-base font-ppneue font-regular">
              [Autoworker’s Howl]
            </h4>
          </div>

          <div className="main-jacket-text-area flex flex-row items-center gap-8">
            <p className="text-[14rem] font-[200]">[</p>
            <div className="main-jacket-inner max-w-xl flex flex-col gap-4 mt-10 text-left">
              <h4 className="text-3xl font-archivo font-bold">Detroit</h4>
              <p className="text-base font-ppneue font-semibold leading-relaxed">
                Oil-stain gray waxed canvas, reflective tape stripes, recycled
                seat-belt belt.
              </p>
              <p className="text-base font-ppneue leading-relaxed">
                Pays tribute to Iggy Pop climbing off the Cobo Hall stage in
                ’69.
              </p>
            </div>
            <p className="text-[14rem] font-[200]">]</p>
          </div>
        </div>
        <div className="loasangeles-main-page mx-4 my-72 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="main-jacket-image flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-100 h-auto">
              <Image
                src="/images/main-losangeles-front.png"
                alt="Jacket"
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <h4 className="mt-4 text-base font-ppneue font-regular">
              [Black Flag Sunburn]
            </h4>
          </div>

          <div className="main-jacket-text-area flex flex-row items-center gap-8">
            <p className="text-[14rem] font-[200]">[</p>
            <div className="main-jacket-inner max-w-xl flex flex-col gap-4 mt-10 text-left">
              <h4 className="text-3xl font-archivo font-bold">Los Angeles</h4>
              <p className="text-base font-ppneue font-semibold leading-relaxed">
                Sun-bleached black leather, heat-reactive panel that turns deep
                crimson, graffiti font “Nervous Breakdown” on lining.
              </p>
              <p className="text-base font-ppneue leading-relaxed">
                Celebrates the birth of Hardcore at Hermosa Beach, 1978.
              </p>
            </div>
            <p className="text-[14rem] font-[200]">]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
