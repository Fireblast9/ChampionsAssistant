import Image from "next/image";
import HomeButton from "./components/HomeButton";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-row">
      <HomeButton
        href="/teams"
        extraClasses="pb-[20%] text-blue-500 border-blue-500"
      >
        Teams
        <Image
          src="/images/pokeball.png"
          alt="Pokeball"
          width={64}
          height={64}
        />
      </HomeButton>
      <HomeButton
        href="/calc"
        extraClasses="pt-[20%] text-green-500 border-green-500"
      >
        Calc
        <Image
          src="/images/pokeball.png"
          alt="Pokeball"
          width={64}
          height={64}
        />
      </HomeButton>
    </main>
  );
}
