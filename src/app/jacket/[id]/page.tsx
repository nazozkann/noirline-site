// app/jackets/[id]/page.tsx

import { notFound } from "next/navigation";
// import the Jacket interface you defined in JacketDetailPage.tsx
import JacketDetailPage, { Jacket } from "@/app/components/JacketDetailPage";

const jackets: Record<string, Jacket> = {
  "bowery-feedback": {
    name: "Bowery Feedback",
    city: "New York",
    heroImage1: "/images/archive-1.1.png",
    heroImage2: "/images/back-1.png",
    heroImage3: "/images/riot-nyc.png",
    tagline: "Concrete elegance with a snarling edge.",
    description:
      "Raw-black cowhide, subway map liner, and CBGB neon puddles. Boardroom sharp, back alley loud.",
    materials: [
      { label: "Outer", value: "Black Cowhide" },
      { label: "Lining", value: "Subway Map Print" },
      { label: "Details", value: "Chrome Zipper, Snap Buttons" },
    ],
    featureImage: "/images/newyork-detail.png",
    quote: "The blazer that roars under boardroom silence.",
    serial: "1 of 250. No restocks.",
    videoUrl: "newyork-video",
  },
  "thames-rip": {
    name: "Thames Rip",
    city: "London",
    heroImage1: "/images/archive-1.2.png",
    heroImage2: "/images/back-2.png",
    heroImage3: "/images/anarchy-london.png",
    tagline: "Tailored chaos with aristocratic bones.",
    description:
      "White distressed denim, tartan slashes, pound-sign studs. Royal blood meets punk riot.",
    materials: [
      { label: "Outer", value: "White Denim" },
      { label: "Lining", value: "Red Tartan" },
      { label: "Details", value: "Pound Symbol Studs" },
    ],
    featureImage: "/images/london-detail.png",
    quote: "Savile Row met Camden. Only one walked out.",
    serial: "1 of 250. No restocks.",
    videoUrl: "london-video",
  },
  "autoworkers-howl": {
    name: "Autoworker’s Howl",
    city: "Detroit",
    heroImage1: "/images/archive-1.3.png",
    heroImage2: "/images/back-3.png",
    heroImage3: "/images/furnace-detroit.png",
    tagline: "Rust, grit, and rock 'n roll resilience.",
    description:
      "Oil-stain waxed canvas, reflective tape stripes, recycled seatbelt closure. Built like the factories that built the sound.",
    materials: [
      { label: "Outer", value: "Gray Waxed Canvas" },
      { label: "Lining", value: "Charcoal Cotton Blend" },
      { label: "Details", value: "Reflective Tape, Recycled Seatbelt Belt" },
    ],
    featureImage: "/images/detroit-detail.png",
    quote: "The bomber that remembers the machinery.",
    serial: "1 of 250. No restocks.",
    videoUrl: "detroit-video",
  },

  "black-flag-sunburn": {
    name: "Black Flag Sunburn",
    city: "Los Angeles",
    heroImage1: "/images/archive-1.4.png",
    heroImage2: "/images/back-4.png",
    heroImage3: "/images/mirage-la.png",
    tagline: "Sun-drenched rebellion. Effortlessly bold.",
    description:
      "Sun-bleached black leather, heat-reactive panel that turns crimson, graffiti-printed lining reading 'Nervous Breakdown.' Daylight on the surface. Riot underneath.",
    materials: [
      { label: "Outer", value: "Sun-Faded Black Leather" },
      { label: "Lining", value: "Graffiti Font Print" },
      { label: "Details", value: "Heat-Reactive Back Panel" },
    ],
    featureImage: "/images/losangeles-detail.png",
    quote: "On the surface — sunshine. Beneath — riot.",
    serial: "1 of 250. No restocks.",
    videoUrl: "losangeles-video",
  },
};

export default function Page({ params }: { params: { id: string } }) {
  const jacket = jackets[params.id];
  if (!jacket) return notFound();

  return <JacketDetailPage jacket={jacket} />;
}
