import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Collection() {
  const items = [
    {
      productName: "Bowery Feedback",
      linkName: "bowery-feedback",
      city: "New York",
      image: "/images/archive-1.1.png",
    },
    {
      productName: "Thames Rip",
      linkName: "thames-rip",
      city: "London",
      image: "/images/archive-1.2.png",
    },
    {
      productName: "Autoworker’s Howl",
      linkName: "autoworkers-howl",
      city: "Detroit",
      image: "/images/archive-1.3.png",
    },
    {
      productName: "Black Flag Sunburn",
      linkName: "black-flag-sunburn",
      city: "Los Angeles",
      image: "/images/archive-1.4.png",
    },
  ];

  const sideItems = [
    {
      productName: "Static Whisperer",
      image: "/images/archive-2.png",
    },
    {
      productName: "White Riot Line",
      image: "/images/archive-3.png",
    },
    {
      productName: "Burn Mark",
      image: "/images/archive-4.png",
    },
    {
      productName: "Chain Proof",
      image: "/images/archive-5.png",
    },
    {
      productName: "Feedback Loop",
      image: "/images/archive-6.png",
    },
    {
      productName: "Chrome Silence",
      image: "/images/archive-7.png",
    },
    {
      productName: "Riot Pulse",
      image: "/images/archive-8.png",
    },
    {
      productName: "Static Kiss",
      image: "/images/archive-9.png",
    },
    {
      productName: "Broken Signal",
      image: "/images/archive-10.png",
    },
    {
      productName: "No Frequency",
      image: "/images/archive-11.png",
    },
    {
      productName: "Alloy Skin",
      image: "/images/archive-12.png",
    },
    {
      productName: "Dead Channel",
      image: "/images/archive-13.png",
    },
    {
      productName: "Shatter Script",
      image: "/images/archive-14.png",
    },
    {
      productName: "Cold Echo",
      image: "/images/archive-15.png",
    },
    {
      productName: "Static Pulse",
      image: "/images/archive-16.png",
    },
  ];

  return (
    <main className="bg-[#f5f5f5] text-[#2c2c2c]">
      <h2 className="mt-40 ml-8 font-ppneue text-2xl">[Core Collection]</h2>
      <div className="core-collection grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {items.map((item) => (
          <Link href={`/jacket/${item.linkName}`} key={item.linkName}>
            <div key={item.productName} className="flex flex-col items-center">
              <Image
                src={item.image}
                alt={item.productName}
                width={1000}
                height={1000}
                className="object-cover"
              />
              <div className="lower-part mt-4 flex flex-row items-center justify-between w-full">
                <h3 className="font-ppneue text-lg">{item.productName}</h3>
                <p className="text-lg font-ppneue text-gray-600">{item.city}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="mt-40 ml-8 font-ppneue text-2xl">[Side Collection]</h2>
      <div className="side-collection  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 p-8">
        {sideItems.map((item) => (
          <div
            key={item.productName}
            className="flex flex-col items-left mb-12"
          >
            <Image
              src={item.image}
              alt={item.productName}
              width={1000}
              height={1000}
              className="object-cover"
            />
            <h3 className="font-ppneue text-lg mt-4">{item.productName}</h3>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
