"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Footer from "../components/Footer";

const DynamicMap = dynamic(() => import("./../components/CityMap"), {
  ssr: false,
});

const cityData = {
  newyork: {
    name: "New York",
    utcOffset: -4,
    quote: "Where concrete meets rebellion.",
    description:
      "From subway chaos to punk grit — the city that shaped the sharpest silhouettes.",
    jacket: {
      name: "Bowery Feedback",
      tagline: "Concrete elegance with a snarling edge.",
      image: "/images/archive-1.1.webp",
    },
    materials: ["Black Cowhide", "Subway Map Liner", "Chrome Zipper"],
    coords: [-74.006, 40.7128],
  },
  detroit: {
    name: "Detroit",
    utcOffset: -4,
    quote: "Where steel turns to sound.",
    description:
      "From the ruins of Motor City came a jacket that doesn’t forget its roots. Industrial grit, punk memory, refined into fabric.",
    jacket: {
      name: "Autoworker’s Howl",
      tagline: "Rust, grit, and rock ’n roll resilience.",
      image: "/images/archive-1.3.webp",
    },
    materials: ["Waxed Canvas", "Reflective Tape", "Seatbelt Strap"],
    coords: [-83.0458, 42.3314],
  },
  london: {
    name: "London",
    utcOffset: 1,
    quote: "Where chaos gets tailored.",
    description:
      "The clash of royalty and riots. Anarchy meets aristocracy in fine stitches.",
    jacket: {
      name: "Thames Rip",
      tagline: "Tailored chaos with aristocratic bones.",
      image: "/images/archive-1.2.webp",
    },
    materials: ["White Denim", "Red Tartan", "Pound Studs"],
    coords: [-0.1276, 51.5072],
  },
  losangeles: {
    name: "Los Angeles",
    utcOffset: -7,
    quote: "Where sunburn bleeds style.",
    description:
      "Rebellion in daylight. From Hermosa Beach to sunset shadows — riot beneath tan skin.",
    jacket: {
      name: "Black Flag Sunburn",
      tagline: "Sun-drenched rebellion. Effortlessly bold.",
      image: "/images/archive-1.4.webp",
    },
    materials: ["Heat-Reactive Leather", "Graffiti Lining", "Bleached Finish"],
    coords: [-118.2437, 34.0522],
  },
} as const;

type CityKey = keyof typeof cityData;

export default function CitiesPage() {
  const [activeCity, setActiveCity] = useState<CityKey>("newyork");
  const [localTime, setLocalTime] = useState("");

  const city = cityData[activeCity];

  useEffect(() => {
    const updateTime = () => {
      const nowUTC = new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * 60000
      );
      const cityTime = new Date(nowUTC.getTime() + city.utcOffset * 3600000);

      const formatted = cityTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [city.utcOffset]);

  return (
    <main className="bg-[#f5f5f5] text-[#2c2c2c]">
      {/* Tabs */}
      <nav
        className="sticky top-16 z-[40] flex justify-center space-x-8 my-28
             font-ppneue text-base md:text-xl uppercase tracking-wide"
      >
        {Object.keys(cityData).map((id) => (
          <button
            key={id}
            onClick={() => setActiveCity(id as CityKey)}
            className={clsx(
              "transition-all duration-300 hover:text-accent",
              activeCity === id && "border-b-2 border-black"
            )}
          >
            {cityData[id as CityKey].name}
          </button>
        ))}
      </nav>

      {/* Hero + Description */}
      <div key={activeCity}>
        {/* Hero Section */}
        <section className="text-center  px-4 transition-opacity duration-500">
          <h1 className="text-[6rem] md:text-[10rem] font-ppneue font-black">
            {localTime} — {city.name.toUpperCase()}
          </h1>
          <p className="mt-20 italic text-lg font-serif">{city.quote}</p>
        </section>

        {/* Manifesto */}
        <section className="max-w-4xl mx-auto text-center px-4 py-28">
          <p className="font-ppneue text-xl opacity-90">{city.description}</p>
        </section>

        {/* Map Section */}
        <section className="h-[60vh] w-full flex flex-col items-center relative z-0 mt-10 mb-20">
          <div className="h-full w-[80vw] md:w-[75vw] lg:w-[50vw]">
            <DynamicMap
              key={activeCity}
              coords={city.coords as [number, number]}
            />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
