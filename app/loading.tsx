import pokeball from "@/images/pokeball.png";
import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="flex items-center p-12">
      <h1 className="text-4xl">Loading...</h1>
      <Image
        src={pokeball}
        className="animate-spin ml-4"
        alt="Spinning pokéball"
        width={69}
      />
    </div>
  );
}
