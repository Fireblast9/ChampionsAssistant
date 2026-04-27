import Link from "next/link";

interface HomeButtonProps {
  href: string;
  extraClasses: string;
  children: React.ReactNode;
}

export default function HomeButton({ href, extraClasses, children }: HomeButtonProps) {
  return (
    <Link
      href={{ pathname: href }}
      className={`flex flex-col w-1/2 items-center justify-center gap-16 text-6xl home-button m-3 overflow-hidden ${extraClasses}`}
    >
      <div className="home-button-content">{children}</div>
    </Link>
  );
}
