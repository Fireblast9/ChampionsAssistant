import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="self-start m-4 px-4 py-2 border-2 border-current rounded-sm transition-colors duration-200 hover:bg-white hover:text-black"
    >
      ← Back
    </Link>
  );
}
