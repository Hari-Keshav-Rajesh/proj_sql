import Link from 'next/link';

export default function Title() {
  return (
    <div className="mt-c25 flex h-c60 flex-col gap-6 items-center justify-between overflow-x-hidden md:mt-c15 md:h-c30 lg:h-c30 xl:mt-c5 xl:h-c45">
      <div className="px-3 text-center text-5xl font-bold duration-1000 animate-in fade-in-0 md:text-6xl xl:text-7xl">
        Limitless Knowledge at Your Fingertips
      </div>

      <div className="px-c10 text-center sm:text-xs md:text-base lg:text-xl">
        Dive into a world of boundless wisdom at our library, where limitless knowledge awaits.<br/> Explore, learn, and expand your horizons with us.
      </div>
    </div>
  );
}